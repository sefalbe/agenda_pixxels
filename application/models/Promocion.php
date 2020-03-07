<?php
class Promocion extends MY_Model{
    public $table = 'promociones';
    public $table_d = 'promocion_detalle';
    function detalle($id,$tipo=""){
        if($tipo == 0){
            $this->db->select($this->table_d.'.*,cantidad as cantidad_minima,productos_cargos.producto,(promocion_detalle.precio * promocion_detalle.cantidad) AS subtotal');
            $this->db->where('promocion_id',$id);
            $this->db->where('promocion_detalle.status',1);
            $this->db->join('productos_cargos','clave = promocion_detalle.producto_id AND cargo = productos_cargos.tipo_c');        
            $data = $this->db->get($this->table_d)->result();

        }else{          
           /* $this->db->select('productos_cargos.*,,promocion,cantidad,(cantidad * evento_detalle.precio) AS subtotal,evento_detalle.precio,if(promocion>0,cantidad,1) as cantidad_minima',false);
            $this->db->join('productos_cargos','evento_detalle.producto_id = productos_cargos.clave AND evento_detalle.cargo = productos_cargos.tipo_c');
            $this->db->where('evento_id',$tipo);       
            $this->db->where('promocion',1); */
             $this->db->select('productos_cargos.*,,promocion,cantidad,(cantidad * evento_detalle.precio) AS subtotal,evento_detalle.precio,if(promocion>0,cantidad,1) as cantidad_minima',false);
            $this->db->join('productos_cargos','evento_detalle.producto_id = productos_cargos.clave ');
            $this->db->where('evento_id',$tipo);    
            $this->db->where('promocion',1);        
            $data = $this->db->get('evento_detalle')->result();
            #echo $this->db->last_query();
        }
        return $data;
    }
    function save($data){        
        $detalle = json_decode($data['detalle']);
        unset($data['detalle']);
        $result = true;
        $response = parent::save($data); 

        if($response['success']){
            $this->db->where('promocion_id',$response['id'])->update($this->table_d,['status'=>0]);
            foreach($detalle as $producto){
                /*Se cambio la variable $data por $response*/
                $exists = $this->db->where('promocion_id',$response['id'])->
                                    where('producto_id',$producto->producto_id)->
                                    where('cargo',$producto->cargo)->
                                    get($this->table_d)->row();
                $data_p = [                    
                    'promocion_id' => $response['id'],
                    'producto_id' => $producto->producto_id,
                    'cantidad' => $producto->cantidad,
                    'precio' => $producto->precio,
                    'cargo' => $producto->cargo,                    
                    'status' => 1,
                ];                            
                if(!$exists)
                    $this->db->insert($this->table_d,$data_p);
                else
                    $this->db->where('id',$exists->id)->update($this->table_d,$data_p);                    
            }
        }
        $response['success'] = $result;
        return $response;
    }
}