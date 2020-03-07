<?php
class Eventos extends MY_Controller{
    function save(){
        if(!isset($_POST['id']))
            $_POST['usuario_id'] = $this->user_id();
        parent::save();
    }
    function records($json=1){
        if(!$this->is_admin())
            $_GET['filter']['usuario_id'] = $this->user_id();
        if(isset($_GET['filter']['estado'])){
            $estado = $_GET['filter']['estado'];
            unset($_GET['filter']['estado']);        
            if($estado == 1){
                $this->evento->db->having('evento_status <',3);
                $this->evento->db->where('date(eventos.fecha_hora) >= CURRENT_DATE','',false);
            }
        }else{            
            $this->evento->db->where('date(eventos.fecha_hora) >= CURRENT_DATE','',false);
            $this->evento->db->having('evento_status < ',3);
        }
        #$this->evento->debug = 1;
        parent::records($json);
    }
    function cliente($id){     
        $this->db->select('eventos.*, clientes.nombre as cliente,fecha_cadena(fecha_hora) as fecha_cadena,evento_estado.nombre as estado,evento_estado.color',false);        
        $this->db->join('clientes','cliente_id = clientes.id');
        $this->db->join('evento_estado','eventos.status = evento_estado.id');
        $this->db->where('cliente_id',$id);
        $this->db->where('eventos.status > ',1);
        $this->db->order_by('saldo');
        $data = $this->db->get('eventos')->result();
        $this->json($data);            
    }
    function mes(){
        $this->load->model('cita');
        $year = $_POST['year'];
        $month = $_POST['month'];
        $data['eventos'] = $this->evento->mes($year,$month,"2");
        $data['eventosp'] = $this->evento->mes($year,$month);
        $data['citas'] = $this->cita->mes($year,$month);
        
        $this->json($data);
    }
    function detalle($id,$tipo=""){
        $data = $this->evento->detalle($id,$tipo);
        
        $this->json($data);
    }
    function set_status(){
        $id = $_POST['evento_id'];        
        $comentario = $_POST['comentario'];                
        $data['id'] = $id;        
        $this->load->model('comentario');
        $comment['comentario'] = $comentario;
        $comment['tipo'] = 2;
        $comment['fecha_hora'] = $this->current_timestamp();
        $comment['evento_id'] = $id;
        $comment['usuario_id'] = $this->user_id();
        $this->comentario->save($comment);
        $data = $this->evento->set_status($data);
        $this->json($data);
    }
    function confirmar(){
        $id = $_POST['id'];
        $forma_pago = $_POST['forma_pago_id'];
        $cantidad = $_POST['anticipo'];
        $comentario = $_POST['comentario'];
        $this->load->model('pago');
        $data['status'] = $this->evento->confirmar($id,$cantidad);
        $this->load->model('comentario');
        $comment['comentario'] = '<b>Evento apartado</b>';
        $comment['tipo'] = 2;
        $comment['fecha_hora'] = $this->current_timestamp();
        $comment['evento_id'] = $id;
        $comment['usuario_id'] = $this->user_id();
        $this->comentario->save($comment);
        if(is_numeric($cantidad))
            $data['abonado'] = $this->pago->abonar($id,$forma_pago,$cantidad,$comentario);                    
        $this->json($data);
    }
    function cerrar(){
        $id = $_POST['id'];            
        $data['status'] = $this->evento->cerrar($id);
        
        $this->load->model('comentario');
        $comment['comentario'] = '<b>Evento cerrado</b>';
        $comment['tipo'] = 2;
        $comment['fecha_hora'] = $this->current_timestamp();
        $comment['evento_id'] = $id;
        $comment['usuario_id'] = $this->user_id();
        $this->comentario->save($comment);        
        $this->json($data);
    }
    function abonar(){
        $id = $_POST['id'];
        $forma_pago = $_POST['forma_pago_id'];
        $cantidad = $_POST['anticipo'];
        $comentario = $_POST['comentario'];     
        $this->load->model('pago');
        $data['abonado'] = $this->pago->abonar($id,$forma_pago,$cantidad,$comentario);                    
        $this->json($data);
    }
    function pagos($id){
        $data = $this->evento->pagos($id);
        $this->json($data);
    }
    function disponible(){
        $id = $_POST['id'];
        $salon_id = $_POST['salon_id'];
        $fecha_hora = $_POST['fecha_hora'];
        $data['disponible'] = $this->evento->disponible($id,$salon_id,$fecha_hora);
        $this->json($data);
    }
    function imprimir($id,$tipo="1"){
        $this->load->model('cliente');
        $this->load->model('usuario');
        $data['evento'] = $this->evento->record_i($id);        
        if($data['evento']->status == 2 || 1){
            $data['cliente'] = $this->cliente->record($data['evento']->cliente_id); 
            $data['vendedor'] = $this->usuario->record($data['evento']->usuario_id); 
            $data['detalle'] = $this->evento->detalle($id,$data['evento']->promocion_id); 
            $data['extras'] = $this->evento->detalle($id,""); 
            $this->load->helper('pdf_helper');
            $html = $this->load->view('contrato',$data,true);                        
            if($tipo=="2"){
                if(file_put_contents("./contrato_$id.pdf", pdf($html,'contrato',false))){
                    $this->load->library('email');
                    $this->load->helper('email');
                    if(valid_email($data['cliente']->correo)){
                        $this->email->from('reservaciones@erniestomatos.mx', 'Ernies tomatos');
                        $this->email->to($data['cliente']->correo);                
                        $this->email->cc('reservaciones@erniestomatos.mx');
                        $this->email->bcc('mlizarraga1990@gmail.com');
                        $this->email->attach("./contrato_$id.pdf");
                        $this->email->subject('Contrato de evento');
                        $this->email->message('Estimado cliente, por medio del presente le enviamos un cordial saludo y a la vez adjunto enviamos el contrato de su evento.');                
                        $done = $this->email->send();             
                    }
                }
            }else
                pdf($html,"contrato_$id",true);   
            echo "<script>window.close();</script>";
        }        
            
    }
}