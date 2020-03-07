<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class MY_Model extends CI_Model {
    public $id = 'id';
    public $table = '';        
    public $permitidos = array();
    public $bloqueados = array();
    public $debug = 0;
    public $select = '*';
    public $timestamps = true;
    public $select_combo = 'id,nombre as value';
    public $count = 50;
    function __construct(){
        parent::__construct();   
        if($this->table=='')
            $this->table = strtolower(get_class($this).'s');		
    }
    function save($datos){
        foreach($datos as $i => $dato){
            if(count($this->permitidos)){
                if(!in_array($i,$this->permitidos))
                    unset($datos[$i]);
            }
            if(in_array($i,$this->bloqueados)){
                unset($datos[$i]);				
            }
        }        
        $id = (isset($datos[$this->id]))?$datos[$this->id]:0;
        if($this->timestamps){
            if($id){
                $datos['updated_at'] = date("Y-m-d H:i:s");
            }else{
                $datos['created_at'] = date("Y-m-d H:i:s");
            }
        }
        $save = ($id == 0)?'insert':'update';
        if($id != 0 )
            $this->db->where($this->id,$id);
        $reponse['success'] = $this->db->$save($this->table,$datos);
        if($this->debug || $this->debug != 0)
            echo $this->db->last_query();
        $reponse['id'] = ($id == 0 )?$this->db->insert_id():$datos[$this->id];
        $reponse['message'] = ($reponse['success'])?"Sus cambios hán sido guardados":"Hubo un error al guardar";
        $reponse['data'] = $this->record($reponse['id']);
        return $reponse;
    }
    function record($id){
        $this->db->select($this->select,false);
        $this->db->where($this->id,$id);        
        $record = $this->db->get($this->table)->row();
        if($this->debug || $this->debug != 0)
            echo $this->db->last_query();
        return $record;
    }
    function combo($config){
        $config->select = $this->select_combo;
        return $this->records($config);
    }
    function records($config){
        if(is_object($config)){
            if(isset($config->join) and is_array($config->join)){#Array(Array($table,$relation,$type))				
                foreach($config->join as $join){					
                    if(is_array($join) and count($join) > 1){						
                        $join[2] = (isset($join[2]))?$join[2]:"INNER";
                        $this->db->join($join[0],$join[1],$join[2]);
                    }
                }
            }						
            if(isset($config->select) and is_string($config->select))#String
                $this->db->select($config->select,FALSE);	

            if(isset($config->where) and is_array($config->where))#Asociative array
                $this->db->where($config->where);

            if(isset($config->where_subquery) and is_string($config->where_subquery))#String
                $this->db->where($config->where_subquery);

            if(isset($config->where_str) and is_string($config->where_str))#Asociative string
                $this->db->where($config->where_str);

            if(isset($config->having) and is_array($config->having))#Asociative array
                $this->db->having($config->having);

            if(!isset($config->having['status']) && isset($this->record_status))
                $this->db->having($this->table.'.status',1); 

            if(isset($config->having_str) and is_string($config->having_str))#Asociative array
                $this->db->having($config->having_str,NULL,TRUE);

            if(isset($config->order_by) and is_string($config->order_by))#String
                    $this->db->order_by($config->order_by);

            if(isset($config->group_by) and is_string($config->group_by))#String
                    $this->db->group_by($config->group_by);

            $records['total_count'] = $this->db->get($this->table)->num_rows();
            $query = $this->db->last_query();
            if(isset($config->limit) and is_numeric($config->limit)){#String
                $offset = (isset($config->offset) and is_numeric($config->offset))?$config->offset:0;
                $records['pos'] = $offset;
                $query.=" LIMIT ".$config->limit." OFFSET $offset";
            }else{
                $records['pos'] = 0;
                if($this->count > 0)
                    $query.=" LIMIT ".$this->count;
            }

            $records['data'] = $this->db->query($query);			
            if(isset($config->debug) || $this->debug != 0)
                    echo $this->db->last_query();			
        }else
            $records['data'] = $this->db->get($this->table);
        $records['data'] = $records['data']->result();		
        return $records;
    }    
    function unique($id,$field,$value){        
        $this->db->where($field,$value);
        $p_id = $this->id;
        $exist = $this->db->get($this->table)->row();        
        $data['status'] = true;
        if($exist)
            $data['status'] = ($exist->$p_id == $id);
        return $data;
    }   
    function fecha_operacion(){
        $fecha = $this->db->query("SELECT max(fecha) as fecha FROM fecha_operacion")->row()->fecha;
        return $fecha;
    }
    protected function user_id(){
        return $this->session->userdata('id');
    }
    protected function is_admin(){
        return $this->session->userdata('admin');
    }
    protected function current_timestamp(){
        return date("Y-m-d H:i:s");
    }   
}
