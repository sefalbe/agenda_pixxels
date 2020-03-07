<?php
class Promociones extends MY_Controller{
    public $model = 'promocion';
    function detalle($id,$tipo=""){
        $data = $this->promocion->detalle($id,$tipo);
        
        $this->json($data);
    }
    function save(){
        if(!isset($_POST['id']))
            $_POST['usuario_id'] = $this->user_id();
        parent::save();
    }
}