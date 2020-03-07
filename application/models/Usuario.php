<?php
class Usuario extends MY_Model{
    function auth($user,$pass){
        $this->db->where('status',1);
        $this->db->where('usuario',$this->db->escape_str($user));
        $this->db->where('contrasena',$this->db->escape_str($pass));
        return $this->db->get($this->table)->row();
    }
}