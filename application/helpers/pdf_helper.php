<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

function pdf($html, $filename, $stream) 
{
    require_once("dompdf/dompdf_config.inc.php");
    $dompdf = new DOMPDF();
    $dompdf->load_html($html);
    $dompdf->render();
    
    if ($stream) {
        $dompdf->stream($filename.".pdf");
    } else {
    
        return $dompdf->output();
    }   
}

function custom_pdf(){
	require_once("dompdf/dompdf_config.inc.php");
}
