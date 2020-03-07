<?php
class Citas extends MY_Controller{
    function save(){
        if(!isset($_POST['id']))
            $_POST['usuario_id'] = $this->user_id();
        unset($_POST['cliente'],$_POST['time']);
        if($this->cita->verif($_POST['cliente_id'],$_POST['fecha_hora'])==0)
            parent::save();
        else{
            $data['id'] = 0;
            $data['message'] = "Ya se tiene asignada una cita con el cliente seleccionado";
            $this->json($data);
        }
            
    }
    function records($json=1){
        if(!$this->is_admin())
            $_GET['filter']['usuario_id'] = $this->user_id();
        parent::records($json);
    }
    function cliente($id){
        $_GET['filter']['cliente_id'] = $id;
        parent::records(1);
    }
    function mes(){
        $year = $_POST['year'];
        $month = $_POST['month'];
        $data = $this->evento->mes($year,$month);
        $this->json($data);
    }
}