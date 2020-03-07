<?php
class Comentarios extends MY_Controller{    
    function evento($evento_id,$id=""){
        $config = $this->config_datagrid();
        $config->select = 'comentarios.*,usuarios.nombre as usuario';
        $config->join = [
            ['usuarios','usuario_id = usuarios.id']
        ];
        $config->where['tipo'] = 2;
        $config->where['evento_id'] = $evento_id;  
        if($id!="")
            $config->where['comentarios.id'] = $id;            
        $config->order_by = 'fecha_hora desc';
        $this->load->model('comentario');        
        $data = $this->comentario->records($config);
        $this->json($data);
    }
    function cliente($cliente_id,$id=""){
        $config = $this->config_datagrid();
        $config->select = 'comentarios.*,usuarios.nombre as usuario';
        $config->join = [
            ['usuarios','usuario_id = usuarios.id']
        ];
        $config->where['tipo'] = 1;
        $config->where['cliente_id'] = $cliente_id;  
        if($id!="")
            $config->where['comentarios.id'] = $id;            
        $config->order_by = 'fecha_hora desc';
        $this->load->model('comentario');        
        $data = $this->comentario->records($config);
        $this->json($data);
    }
    function save(){
        $_POST['usuario_id'] = $this->user_id();
        $_POST['fecha_hora'] = date("Y-m-d H:i:s");
        parent::save();
    }
}