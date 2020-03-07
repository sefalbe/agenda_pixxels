<?php
class Clientes extends MY_Controller{
	public $model = 'cliente';
    function records($json=1){
        $_GET['select'] = 'clientes.*,fn_saldo_cliente(id) as saldo';
        $_GET['sort']['nombre'] = "asc";
        parent::records();
    }
	function getClientes(){
        $cliente="";
        if(isset($_GET['filter']['value']))$cliente=$_GET['filter']['value'];
    	$data=array();
    	$this->db->select('id,nombre as value');
        if($cliente!="")
            $this->db->like('nombre',$cliente);
        $this->db->where('status',1);
    	$result=$this->db->get('clientes');
    	foreach($result->result() as $row):
    		$data[]=$row;
    		endforeach;
    		echo json_encode($data);
    }
    
}