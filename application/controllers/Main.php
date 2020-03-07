<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Main extends CI_Controller {	
    public function __construct(){
		parent::__construct();
              
     }

     function index(){
        if($this->session->userdata('id')==FALSE)
            redirect('main/login');
        $this->load->library('user_agent');
        $data['mobile'] = ($this->agent->is_mobile()?1:0);
        if($this->agent->is_mobile())
            $this->load->view('mobile',$data);
        else
            $this->load->view('app',$data);
            
    }
    function login(){
        
        $this->load->view('login');
    }
    function do_login(){
        $user = $this->input->post('user');
        $pass = $this->input->post('clave');
        $this->load->model('usuario');
        $data = $this->usuario->auth($user,$pass);
        if($data==FALSE)
            echo json_encode(['status'=>false,'message'=>'Error de usuario o contraseña']);
        else{
            $this->session->set_userdata((array)$data);
            echo json_encode(['status'=>true,'message'=>'Bienvenido']);
        }
    }
    function logout(){
		$this->session->sess_destroy();
		redirect('main');
	}
}
