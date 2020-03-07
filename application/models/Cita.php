<?php
class Cita extends MY_Model{
    function records($config){        
        $config->select = $this->table.'.*, clientes.nombre as cliente,fecha_cadena(fecha_hora) as fecha_cadena';
        $config->join = [
            ['clientes','cliente_id = clientes.id']    
        ];
        return parent::records($config);
    }
    function mes($year,$month){        
        $this->db->select('count(*) as total,date_format(fecha_hora,"%Y%m%d") as fecha,date(fecha_hora) as fecha_d',FALSE);
        $this->db->where("year(fecha_hora) = $year");
        $this->db->where("month(fecha_hora) = $month");       
        if(!$this->is_admin())
            $this->db->where("usuario_id",$this->user_id());        
        $this->db->group_by('fecha');                        
        $data = $this->db->get($this->table)->result();
        foreach($data as $row){
            $this->db->select($this->table.'.*,clientes.nombre as cliente,usuarios.nombre as usuario,TIME_FORMAT(fecha_hora,"%H%i") as time',FALSE);
            $this->db->join('clientes','cliente_id = clientes.id');
            $this->db->join('usuarios','usuario_id = usuarios.id');
            $this->db->where("year(fecha_hora) = $year");
            $this->db->where("month(fecha_hora) = $month");
            if(!$this->is_admin())
                $this->db->where("usuario_id",$this->user_id());
            $this->db->where("date(fecha_hora) = '$row->fecha_d'");
            $row->detalle = $this->db->get($this->table)->result();
        }
        return $data;
    }
    function verif($cliente_id,$fecha){
        $this->db->where(['cliente_id'=>$cliente_id,'fecha_hora'=>$fecha]);
        return $this->db->get($this->table)->num_rows();
    }
}