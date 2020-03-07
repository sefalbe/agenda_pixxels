<?php
class Pago extends MY_Model{
    function abonar($evento_id,$forma_pago,$cantidad,$comentario){
        $this->db->select('saldo');
        $this->db->where('id',$evento_id);
        $saldo = $this->db->get('eventos')->row()->saldo;
        $cantidad = ($saldo < $cantidad)?$saldo:$cantidad;
        $data = [
            'evento_id' => $evento_id,
            'comentario' => $comentario,
            'forma_pago_id' => $forma_pago,
            'cantidad' => $cantidad,
            'fecha'=>$this->fecha_operacion()
        ];
        $response['success'] = $this->db->insert($this->table,$data);        
        $response['cantidad'] = $cantidad; 
        return $response;
    }   
}