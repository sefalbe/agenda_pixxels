<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class MY_Controller extends CI_Controller{
    public $model;
    function __construct(){
        parent::__construct();        
        $model = substr(strtolower(get_class($this)),0,-1);
        if($this->model=="")
            $this->model = $model;
        $this->load->model($this->model);            
    }
    function save(){
        $model = $this->model;
        $data = $this->input->post();        
        $save = $this->$model->save($data);
        $this->json($save);
    }
    function record($id,$json=1){        
        $model = $this->model;        
        $record = $this->$model->record($id);
        if($json)
            $this->json($record);
        else
            return $record;
    }
    function combo($json=1){
        $model = $this->model;  
        $config = $this->config_datagrid();
        $records = $this->$model->combo($config);
        if($json)
            $this->json($records);
        else
            return $records;
    }
    function records($json=1){        
        $model = $this->model;  
        $config = $this->config_datagrid();
        $records = $this->$model->records($config);
        if($json)
            $this->json($records);
        else
            return $records;
    }
    function config_datagrid(){
        $data = $this->input->get();
        $config = new stdClass();
        if(isset($data['select']) and is_string($data['select'])){            
            $config->select = $data['select'];
        }
        if(isset($data['join']) and is_array($data['join'])){
            $config->join = $data['join'];
        }
        if(isset($data['filter']) and is_array($data['filter'])){
            $config->having = array();
            foreach($data['filter'] as $field => $value){                
                if($value!=''){
                    if($field=='status')
                        $config->having[$field] = "$value";
                    else
                        $config->having["$field like"] = "%$value%";
                }
            }
        }
        if(isset($data['sort']) and is_array($data['sort'])){
            $config->order_by = array();
            foreach($data['sort'] as $field => $type){
                if($type!='')
                    $config->order_by[] = $field.' '.$type;
            }			
            $config->order_by = implode($config->order_by,',');
        }
        if(isset($data['count']) and is_numeric($data['count'])){
            $config->limit = $data['count'];
        }
        $config->offset = (isset($data['start']) and is_numeric($data['start']))?$data["start"]:0;
        return $config;
    }
    function json($arreglo){
        header('Content-Type: application/json');
        echo json_encode($arreglo);
    }
    function unique(){
        $model = $this->model;   
        $id = $this->input->post('id',TRUE);
        $field = $this->input->post('field',TRUE);
        $value = $this->input->post('value',TRUE);
        $exists = $this->$model->unique($id,$field,$value);
        $this->json($exists);
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