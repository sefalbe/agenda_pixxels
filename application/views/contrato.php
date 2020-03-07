<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        body *{font-family: sans-serif;font-size: 10pt;}
        .b{font-weight: bold;}
        .tc{text-align: center}
        .tr{text-align: right}
        table{border-spacing: 0px 2px;}
        .u{border-bottom: solid 1px black;}
        .pt{padding-top: 5em;}
        #logo{width: 120px}
        .vam{vertical-align: middle}
    </style>
</head>
<body>
<?php
$costo=$evento->saldo;
$importe=0;
$costoTotal=0;
    ($evento->comision==1)?$importe=$costo*0.10:$importe=0;
    $costoTotal=($costo+$importe)-$evento->anticipo;
?>
   <table width="100%;">
       <tbody>
           <tr>
               <td rowspan="2" width="150"><img src="<?= base_url('assets/img/logo.jpeg')?>" id="logo"></td>
               <td class="vam"><span class="b">Restaurant Cocos Beach Club</span><br>Av. Camarón sábalo S/N, Fracc. Sábalo country club</td>
           </tr>           
       </tbody>
   </table>
    <table width="100%">
        <tbody>            
            <tr class="b tc">                
                <td colspan="6">Contrato</td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td colspan="2">No.<span><?= $evento->folio?></span></td>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td class="b">Vendedor:</td>
                <td class="u"><?= $vendedor->nombre?></td>
                <td class="b">Tipo evento:</td>
                <td class="u"></td>
                <td class="b">Fecha:</td>
                <td class="u" ><?= $evento->fecha_hora?></td>
                
            </tr>
            <tr>
                <td class="b">Costo del evento:</td>
                <td class="u">$ <?= number_format($evento->importe,2)?></td>
                <td class="b">Comision:</td>
                <td class="u">$<?= number_format($importe,2)?></td>
                <td class="b">Anticipo:</td>
                <td class="u">$ <?= number_format($evento->anticipo,2)?></td>
            </tr>
            <tr>
                
                <td class="b">Adeudo:</td>
                <td class="u" >$ <?= number_format($costoTotal,2)?></td>
            </tr>
            <tr> <td colspan="6">&nbsp;</td></tr>
            <tr>
                <td colspan="1" class="b">Cliente:</td>
                <td class="u" colspan="2"><?= $cliente->nombre?></td>
                <td class="b">RFC:</td>                
                <td class="u" colspan="2" class="b"><?= $cliente->rfc?></td>                
            </tr>
            <tr>
                <td class="b">Teléfono:</td>
                <td class="u" colspan="2"><?= $cliente->telefono?></td>
                <td class="b">Correo:</td>                
                <td class="u" colspan="2"><?= $cliente->correo?></td>
            </tr>
            <tr class="b tc">
                <td colspan="6">&nbsp;</td>                
            </tr>
            <tr class="b">
                <td colspan="6">Requisitos para la realización del evento:</td>                
            </tr>
            <tr class="b tc">
                <td colspan="6">&nbsp;</td>                
            </tr>
        <? if(count($detalle)>0){?>    
            <tr class="b tc">
                <td colspan="6">Promoción</td>                
            </tr>        
            <tr class="b tc">
                <td colspan="3">Producto</td>                
                <td>Cantidad</td>                
                <td>Precio</td>                
                <td>Subtotal</td>                
            </tr>
            <?  foreach($detalle as $producto){?>
            <tr>
                <td colspan="3" class="tc"><?= $producto->producto?></td>                
                <td class="tc"><?= number_format($producto->cantidad,2)?></td>                
                <td class="tc"><?= number_format($producto->precio,2)?></td>                
                <td class="tc"><?= number_format($producto->cantidad * $producto->precio,2)?></td>                
            </tr>
            <?  }?>
        <?  }?>
        <? if(count($extras)>0){?>    
           <tr class="b tc">
                <td colspan="6" class="pt">Extras</td>                
            </tr>        
            <tr class="b tc">
                <td colspan="3">Producto</td>                
                <td>Cantidad</td>                
                <td>Precio</td>                
                <td>Subtotal</td>                
            </tr>
            <?  foreach($extras as $producto){?>
            <tr>
                <td colspan="3" class="tc"><?= $producto->producto?></td>                
                <td class="tc"><?= number_format($producto->cantidad,2)?></td>                
                <td class="tc"><?= number_format($producto->precio,2)?></td>                
                <td class="tc"><?= number_format($producto->cantidad * $producto->precio,2)?></td>                
            </tr>
            <?  }?>
        <?  }?>
           <tr class="b">
                <td colspan="6">&nbsp;</td>                
            </tr>
            <tr class="b">
                <td colspan="6">Observaciones:</td>                
            </tr>
            <tr>
                <td colspan="6">
                   <pre><?= htmlspecialchars($evento->descripcion)?></pre>
                </td>                
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2"><div class="u">&nbsp;</div></td>                
                <td colspan="2"><div class="u">&nbsp;</div></td>                
                <td colspan="2"><div class="u">&nbsp;</div></td>                
            </tr>
            <tr class="b tc">
                <td colspan="2">ADMINISTRACIÓN</td>
                <td colspan="2">GERENTE</td>
                <td colspan="2">COCINA</td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
            </tr>
            <tr>
                <td class="u" colspan="2">&nbsp;</td>
                <td colspan="2">&nbsp;</td>
                <td class="u" colspan="2">&nbsp;</td>
            </tr>
            <tr class="b tc">
                <td colspan="2">VENDEDOR</td>
                <td colspan="2"></td>
                <td colspan="2">CLIENTE</td>
            </tr>
        </tbody>
    </table>
</body>
</html>