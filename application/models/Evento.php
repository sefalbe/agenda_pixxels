<?php
class Evento extends MY_Model{
    function record($id){
        $this->select = 'eventos.*,IF(DATEDIFF(CURRENT_DATE,eventos.created_at) > IF(WEEKDAY(fecha_hora) BETWEEN 0 AND 2,3,4) AND DATEDIFF(fecha_hora,CURRENT_DATE) > IF(WEEKDAY(fecha_hora) BETWEEN 0 AND 2,3,3),eventos.status,IF(WEEKDAY(fecha_hora) BETWEEN 0 AND 2,3,3)) as status';
        return parent::record($id);
    }
    function record_i($id){
        $this->select = 'eventos.*,DATE_FORMAT(fecha_hora,"%d-%m-%Y %r") as fecha_hora';
        return parent::record($id);
    }
    function records($config){       
        $config->order_by = 'fecha_hora asc ';
        $config->select = $this->table.'.*, clientes.nombre as cliente,fecha_cadena(fecha_hora) as fecha_cadena,evento_estado.nombre as estado,evento_estado.color,usuarios.nombre as usuario, eventos.status as evento_status';
        $config->join = [
            ['clientes','cliente_id = clientes.id'],
            ['evento_estado','IF(DATEDIFF(CURRENT_DATE,eventos.created_at) > IF(WEEKDAY(fecha_hora) BETWEEN 0 AND 2,3,4) AND DATEDIFF(fecha_hora,CURRENT_DATE) > IF(WEEKDAY(fecha_hora) BETWEEN 0 AND 2,3,3),eventos.status,IF(WEEKDAY(fecha_hora) BETWEEN 0 AND 2,3,3)) = evento_estado.id'],
            ['usuarios','usuarios.id = usuario_id'],
        ];        
        #$config->where['eventos.status'] = 
        return parent::records($config);
    }
    function mes($year,$month,$tipo="1"){        
        $this->db->select('count(*) as total,date_format(fecha_hora,"%Y%m%d") as fecha',FALSE);
        $this->db->where("year(fecha_hora) = $year");
        $this->db->where("month(fecha_hora) = $month");
        $this->db->where($this->table.".status",$tipo);
        if(!$this->is_admin())
            $this->db->where("usuario_id",$this->user_id());
        $this->db->group_by('fecha');                        
        $data = $this->db->get($this->table)->result();
        foreach($data as $row){
            $this->db->select($this->table.'.*,clientes.nombre as cliente,TIME_FORMAT(fecha_hora,"%H%i") as time',FALSE);
            $this->db->join('clientes','cliente_id = clientes.id');
            $this->db->where("year(fecha_hora) = $year");
            $this->db->where("month(fecha_hora) = $month");
            $this->db->where($this->table.".status",$tipo);
            if(!$this->is_admin())
                $this->db->where("usuario_id",$this->user_id());
            $row->detalle = $this->db->get($this->table)->result();
        }
        return $data;
    }
  
    function getLastFolio(){
        $this->db->select('(folio+1) AS folio');
        $this->db->order_by('folio desc');
        $this->db->limit(1);
        $result=$this->db->get('eventos');
        return $result->result()[0]->folio;
    }
    function save($data){
        $data['folio']=$this->getLastFolio();        
        $detalle = json_decode($data['detalle']);
        unset($data['detalle']);
        $result = true;
        $response = parent::save($data);
        
        $this->db->select($this->table.'.*, clientes.nombre as cliente,fecha_cadena(fecha_hora) as fecha_cadena,evento_estado.nombre as estado,evento_estado.color',false);
        $this->db->where($this->table.'.id',$response['data']->id);
        $this->db->join('clientes','cliente_id = clientes.id');
        $this->db->join('evento_estado','clientes.status = evento_estado.id');
        $response['data'] = $this->db->get($this->table)->row();
        #print_r$($response);die();
        
        if($response['success']){
            if(is_numeric($response['id']))
                $this->db->where('evento_id',$response['id'])->delete('evento_detalle');
            foreach($detalle as $producto){
                $productc="";
                if(isset($producto->tipo_c))
                    $productc=$producto->tipo_c;
                
                $data_p = [
                    'evento_id' => $response['id'],
                    'producto_id' => $producto->clave,
                    'cantidad' => $producto->cantidad,
                    'precio' => $producto->precio,
                    'cargo' => $productc,
                    'promocion' =>(isset($producto->promocion)?1:0)
                ]; 
                                        
                if(!$this->db->insert('evento_detalle',$data_p))
                    $result = false;

            }
        }
        $response['success'] = $result;
        return $response;
    }    
    function detalle($id,$tipo=""){        
        $this->db->select('productos_cargos.*,promocion,cantidad,(cantidad * evento_detalle.precio) AS subtotal,evento_detalle.precio,if(promocion>0,cantidad,1) as cantidad_minima',false);
        $this->db->join('productos_cargos','evento_detalle.producto_id = productos_cargos.clave AND evento_detalle.cargo = productos_cargos.tipo_c');
        $this->db->where('evento_id',$id);
       /* if($tipo!="")            
            $this->db->where('promocion > 0');
        else*/
            $this->db->where('promocion',0);
        $data = $this->db->get('evento_detalle')->result();
        #echo $this->db->last_query();
        return $data;
    }
    function set_status($data){        
        return parent::save($data);
    }
    function confirmar($id,$cantidad=""){
        /*$productos = $this->db->query("            
            SELECT 
            eventos.id AS evento_id,promocion_detalle.producto_id,promocion_detalle.cantidad,promocion_detalle.precio,promocion_detalle.cargo,promocion_detalle.promocion_id as promocion
            FROM promocion_detalle
            JOIN promociones ON promociones.id = promocion_id
            JOIN eventos ON eventos.promocion_id = promociones.id
            AND eventos.id = $id
        ")->result();
        foreach($productos as $p){
            $this->db->insert('evento_detalle',$p);
        }*/
        $cantidad = (is_numeric($cantidad))?$cantidad:0.00;
        $total = $this->db->select('sum(cantidad * precio) as total')->where('evento_id',$id)->get('evento_detalle')->row()->total;
        return $this->db->where('id',$id)->update($this->table,['status'=>2,'importe'=>$total,'saldo'=>$total,'anticipo'=>$cantidad]);        
    }
    function cerrar($id){        
        return $this->db->where('id',$id)->update($this->table,['status'=>3]);        
    }
    function pagos($id){
        $importe = $this->record($id)->importe;
        $this->db->query('SET @saldo = '.$importe);
        $this->db->select('fecha,pagos.id,@saldo AS saldo,cantidad,(@saldo := @saldo - cantidad) AS nuevo_saldo',FALSE);
        $this->db->join('eventos','eventos.id = evento_id');
        $this->db->where('evento_id',$id);
        $this->db->where('pagos.status',1);
        $records = $this->db->get('pagos')->result();
        return $records;
    }
    function disponible($id,$salon_id,$fecha_hora){
        return $this->db->query("SELECT fn_disponible($id,$salon_id,'$fecha_hora') as disponible")->row()->disponible;
    }
}