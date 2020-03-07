var app_clientes = extend({
    model:'cliente',
    url:'catalogos/clientes',
    combos:{
        cliente_tipo_id:app.combos.cliente_tipos,
        forma_pago_id:app.combos.formas_pago,
        estado_id:app.combos.estados,
        pais_id:app.combos.paises,
    },
    afterSave:function(){
        app_clientes.tools.unsetOptions();
    },
    afterLoad:function(){
        $$('ac_cliente_extra').show();     
        this.loadComments();
    },
    loadComments:function(id){        
        app.ajax('catalogos/comentarios/cliente/' + app_clientes.tools.editId,{},function(data){
            $$('cliente_comentarios').clearAll();            
            $$('cliente_comentarios').parse(data);            
        });        
        app.ajax('catalogos/eventos/cliente/' + app_clientes.tools.editId,{},function(data){            
            $$('cliente_eventos').clearAll();            
            $$('cliente_eventos').parse(data);            
        });
    },
    totalEvento:0.00,
    evento_id:0,
    beforeNew:function(){
        $$('ac_cliente_extra').hide();
    },
    view:{
        id:'main_clientes',
        rows:[                        
            {
                cells:[
                    {
                        id:'win_clientes',
                        rows:[
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Clientes'},
                                    extend({
                                        label:'Nuevo',
                                        click:function(){
                                            app_clientes.new()
                                        }
                                    },'sbutton')
                                ]
                            },'toolbar'),
                            extend({ 
                                id:'dt_clientes',                                             
                                columns:[                            
                                    //{id:'id',header:['Clave',serverFilter()]},                            
                                    {id:'nombre',header:['Nombre',serverFilter()],fillspace:true},                            
                                    {id:'rfc',header:['RFC',serverFilter()],fillspace:true},                                    
                                    {id:'telefono',header:['Teléfono',serverFilter()],fillspace:true},                                    
                                    {id:'correo',header:['Correo',serverFilter()],fillspace:true},                                    
                                    extend({id:'saldo',header:['Saldo',serverFilter()],},'qty_col'),
                                ],
                                on:{
                                    onItemClick:function(id){
                                        var item = this.getItem(id);
                                        app_clientes.tools.editId = item.id;
                                    },
                                    onItemDblClick:function(id){
                                        var item = this.getItem(id);
                                        app_clientes.record(item.id);
                                        app_clientes.tools.setOption('record');
                                    }
                                }                                
                            },'datatable')                            
                        ]
                    },
                    {
                        id:'win_cliente',
                        rows:[   
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Cliente'},
                                    extend({
                                        click:function(){                                            
                                            app_clientes.cancel();
                                            app_clientes.close_e();
                                            app_clientes.tools.unsetOptions();
                                            $$('ac_cliente_extra').hide();
                                        }
                                    },'dbutton'),
                                    extend({
                                        click:function(){                                            
                                            if(!app_clientes.save() == false){
                                                if(app_clientes.tools.editId == 0)
                                                    app_clientes.tools.setOption('new');
                                                else
                                                    app_clientes.tools.setOption('record');
                                            }
                                        }
                                    },'sbutton'),
                                ]
                            },'toolbar'),
                            {
                                cols:[                                            
                                    {                                        
                                        rows:[
                                            extend({
                                                id:'frm_cliente',                                                
                                                elements:[ 
                                                    {
                                                        cols:[
                                                            extend({label:'Nombre',name:'nombre'},'rtext'),
                                                            extend({label:'Tipo cliente',name:'cliente_tipo_id',id:'cliente_cliente_tipo_id'},'rcombo'),
                                                            extend({label:'Fecha de nacimiento',name:'fecha_nacimiento',width:150},'date'),                                                            
                                                        ]
                                                    },
                                                    {
                                                        cols:[
                                                            extend({label:'RFC',name:'rfc',width:150},'text'),
                                                            extend({label:'CURP',name:'curp',width:150},'text'),
                                                            {
                                                                hiiden:(IS_ADMIN),
                                                                cols:[
                                                                    extend({label:'Crédito',name:'limite_credito',width:150},'text'),
                                                                    extend({label:'Plazo(días)',name:'plazo',width:150},'text'),
                                                                ]
                                                            },
                                                            {}
                                                        ]
                                                    },
                                                    {template:'Domicilio',type:'section'},
                                                    {
                                                        cols:[
                                                            extend({label:'Calle',name:'calle'},'text'),
                                                            extend({label:'No. Interior',name:'no_interior',width:150},'text'),
                                                            extend({label:'No. Exterior',name:'no_exterior',width:150},'text'),
                                                        ]
                                                    },
                                                    {
                                                        cols:[
                                                            extend({label:'Ciudad',name:'ciudad'},'text'),
                                                            extend({label:'País',name:'pais_id',width:150,id:'cliente_pais_id',on:{
                                                                onChange:function(val){
                                                                    $$('cliente_estado_id').show();
                                                                    $$('cliente_estado').hide();
                                                                    if(val != undefined){
                                                                        if(val != 1){
                                                                            $$('cliente_estado_id').hide();
                                                                            $$('cliente_estado').show();
                                                                        }
                                                                    }
                                                                }
                                                            }},'rcombo'),
                                                            extend({label:'Estado',name:'estado_id',id:'cliente_estado_id',width:150},'combo'),
                                                            extend({label:'Estado',name:'estado',id:'cliente_estado',hidden:true,width:150},'text'),
                                                            extend({label:'CP',name:'cp',width:150},'text'),
                                                        ]
                                                    },
                                                    {template:'Contacto',type:'section'},
                                                    {
                                                        cols:[
                                                            extend({label:'Nombre contacto',name:'nombre_contacto'},'text'),                                                                                                           
                                                            extend({label:'Puesto contacto',name:'puesto_contacto'},'text'),                                                                                                           
                                                        ]
                                                    },
                                                    {
                                                        cols:[
                                                            {
                                                                rows:[
                                                                    {view:'label',label:'Correo electrónico'},
                                                                    extend({name:'correo'},'text'),
                                                                ]
                                                            },                                                            
                                                            {
                                                                rows:[
                                                                    {view:'label',label:'Teléfono'},
                                                                    {
                                                                        cols:[
                                                                            extend({name:'lada',width:60},'text'),
                                                                            extend({name:'telefono',width:120},'text'),
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                rows:[
                                                                    {view:'label',label:'Celular'},
                                                                    {
                                                                        cols:[
                                                                            extend({name:'lada_celular',width:60},'text'),
                                                                            extend({name:'celular',width:120},'text'),
                                                                        ]
                                                                    }
                                                                ]
                                                            },                                                            
                                                        ]
                                                    },  
                                                    {
                                                        cols:[
                                                            {
                                                                rows:[
                                                                    {view:'label',label:'Correo electrónico alternativo (separados por coma)'},
                                                                    extend({name:'correo_secundario'},'text'),
                                                                ]
                                                            },                                                            
                                                            {
                                                                rows:[
                                                                    {view:'label',label:'Teléfono (secundario)'},
                                                                    {
                                                                        cols:[
                                                                            extend({name:'lada',width:60},'text'),
                                                                            extend({name:'telefono_secundario',width:120},'text'),
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                rows:[
                                                                    {view:'label',label:'Celular (secundario)'},
                                                                    {
                                                                        cols:[
                                                                            extend({name:'lada_celular',width:60},'text'),
                                                                            extend({name:'celular_secundario',width:120},'text'),
                                                                        ]
                                                                    }
                                                                ]
                                                            },                                                            
                                                        ]
                                                    },
                                                    {}
                                                ],
                                                rules:{
                                                    cliente_tipo_id:pNumber,
                                                    nombre:required,                                   
                                                    correo:notRequiredEmail,
                                                    limite_credito:notRequiredNumber,
                                                    plazo:notRequiredNumber,
                                                    telefono:notRequiredNumber,
                                                    celular:notRequiredNumber,
                                                    correo_secundario:notRequiredEmail,
                                                    telefono_secundario:notRequiredNumber,
                                                    celular_secundario:notRequiredNumber,
                                                    estado_id:pNumber,
                                                    no_interior:notRequiredNumber,
                                                    no_exterior:notRequiredNumber,
                                                    cp:notRequiredNumber,
                                                }
                                            },'form'),                                                                                        
                                        ]
                                    },
                                    {
                                        view:"accordion",
                                        id:'ac_cliente_extra',
                                        hidden:true,                                        
                                        cols:[
                                            {
                                                header:"Comentarios",                                                 
                                                body:{                                        
                                                    rows:[                                                         
                                                        extend({
                                                            id:'frm_cliente_comentario',
                                                            elements:[
                                                                {
                                                                    cols:[
                                                                        extend({placeholder:'Comentario',name:'comentario',height:100},'textarea'),
                                                                        {
                                                                            rows:[                                                                                
                                                                                extend({                                                                 
                                                                                    click:function(){  
                                                                                        var frm = $$('frm_cliente_comentario');
                                                                                        if(frm.validate()){
                                                                                            app.ajax('catalogos/comentarios/save',{tipo:1,cliente_id:app_clientes.tools.editId,comentario:frm.getValues().comentario},function(data){
                                                                                                if(data.success){
                                                                                                    frm.clear();
                                                                                                    frm.clearValidation();
                                                                                                    app_clientes.loadComments(data.data.id);                                                                                                    
                                                                                                }else
                                                                                                    webix.alert('Hubo un problema al guardar su comentario');
                                                                                            });
                                                                                       }
                                                                                    }
                                                                                },'sbutton'),
                                                                                {},
                                                                            ]
                                                                        }
                                                                    ]
                                                                },                                                               
                                                            ],
                                                            rules:{
                                                                comentario:required                   
                                                            }
                                                        },'form'),
                                                        {
                                                            view:"list", 
                                                            id:'cliente_comentarios',
                                                            pager:'pg_cliente_comentarios',
                                                            autoConfig:true, 
                                                            css:'comments',                                                            
                                                            templateStart:"<div item_id='id' class='custom_item'>",
                                                            template:'<div><b>#usuario#</b>&nbsp;(<small>#fecha_hora#</small>)</div><div>#comentario#</div>',
                                                            templateEnd:"</div>",
                                                            data:[
                                                                {id:1,vendedor:'admin',comentario:"prueba",fecha_hora:'2016-10-30 12:30:04'}
                                                            ]
                                                        },
                                                        {
                                                            view:'pager',
                                                            id:'pg_cliente_comentarios',
                                                            group:5,
                                                            size:10
                                                        }
                                                    ]
                                                },                                                  
                                            }, 
                                            {
                                                header:"Eventos", 
                                                collapsed:true,
                                                body:{                                        
                                                    rows:[                                                                                                               
                                                        {
                                                            view:"list", 
                                                            id:'cliente_eventos',
                                                            autoConfig:true, 
                                                            css:'comments events',
                                                            templateStart:"<div item_id='id' class='custom_item' style='background-color:white'>",
                                                            template:'<div style="text-align:center;font-size: 1.25em;"><b>#nombre#</b><br>(<small>#fecha_cadena#</small>)</div>'+
                                                            '<table style="width:100%;display:none;" border="1" class="bred"><tbody><tr><th>Invitados</th><th>Platillos</th><th>Bebidas</th><th>Mesas</th><th>Sillas</th>'+
                                                            '<tr><td>#invitados#</td><td>#platillos#</td><td>#bebidas#</td><td>#mesas#</td><td>#sillas#</td>'+                                                            
                                                            '</tbody></table><div class="f1_5em">Total: #importe#<br>Saldo: #saldo#</div>',
                                                            templateEnd:"</div>",
                                                            data:[
                                                                {id:1,vendedor:'admin',comentario:"prueba",fecha_hora:'2016-10-30 12:30:04'}
                                                            ],
                                                            on:{
                                                                onItemClick:function(id){
                                                                    if(IS_ADMIN){
                                                                    var item = this.getItem(id);
                                                                        app_clientes.evento_id = item.id;
                                                                        app_clientes.totalEvento = item.saldo;
                                                                        $$('lbl_pc_total').define('label',std_format(app_clientes.totalEvento));
                                                                        $$('lbl_pc_total').refresh();
                                                                        app.records('dt_pagos_evento','catalogos/eventos/pagos/'+item.id);
                                                                        $$('frm_cliente_pago').clear();
                                                                        $$('win_p_cliente').show();                                                                    
                                                                    }
                                                                }
                                                            }
                                                        }, 
                                                        {
                                                            view:'pager',
                                                            id:'pg_cliente_eventos',
                                                            group:5,
                                                            size:10
                                                        }
                                                    ]
                                                },                                                  
                                            }
                                        ]
                                    },                                       
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
},app_std);
webix.ready(function(){
    webix.ui(extend({
        id:'win_p_cliente',
        head:'Pagos del evento',
        width:1000,
        body:{
            cols:[
                {
                    rows:[
                        extend({template:'Pagos realizados'},'section'),
                        extend({
                            id:'dt_pagos_evento',                                                        
                            yCount:10,
                            columns:[                                
                                extend({id:'fecha',header:['Fecha'],fillspace:true},'date_col'),
                                extend({id:'saldo',header:['Saldo'],},'qty_col_wf'),
                                extend({id:'cantidad',header:['Abono'],},'qty_col'),
                                extend({id:'nuevo_saldo',header:['Total']},'qty_col_wf'),
                            ],
                            on:{
                                onAfterLoad:function(){
                                    var data = this.serialize();
                                    var saldo = 0.00;
                                    if(data.length){
                                        saldo = data[data.length - 1].nuevo_saldo;                                    
                                        app_clientes.totalEvento = saldo;
                                        $$('lbl_pc_total').define('label',std_format(saldo));
                                        $$('lbl_pc_total').refresh();
                                    }
                                }
                            }
                        },'datatable')
                    ]
                },
                {width:5},
                {
                    rows:[
                        extend({template:'Abonar'},'section'),
                        extend({
                            id:'frm_cliente_pago',
                            elements:[
                                {id:'cliente_evento_id',view:'text',hidden:true},
                                {
                                    cols:[
                                        {view:'label',label:'Total', css:'f2em'},
                                        {view:'label',label:'0.00',id:'lbl_pc_total', css:'t_right f2em'},
                                    ]
                                },
                                extend({name:'forma_pago_id',id:'cliente_forma_pago_id',label:'Forma de pago',labelPosition:'left',labelWidth:100,labelAlgin:'right'},'combo'),
                                extend({
                                    label:'Cantidad',
                                    name:'anticipo',
                                    labelCss:'f2em',
                                    labelPosition:'left',                                    
                                    labelWidth:100,
                                    on:{
                                        onChange:function(val,old){
                                            var anticipo = 0.00,saldo = 0.00;
                                            if(pNumber(val)){                                        
                                                anticipo = app.parseFloat(val);                                                
                                                if(app_clientes.totalEvento < anticipo){
                                                    anticipo = app_clientes.totalEvento;
                                                    this.setValue(std_format_i(anticipo));
                                                }
                                                saldo = app_clientes.totalEvento - anticipo;
                                                $$('lbl_pc_saldo').define('label',std_format(saldo));
                                                $$('lbl_pc_saldo').refresh();
                                            }
                                        },
                                        onBlur:function(){this.setValue(std_format_i(this.getValue()))}
                                    }
                                },'qty_text'),                              
                                extend({name:'comentario',label:'Comentario',labelPosition:'left',labelWidth:100},'text'),
                                {
                                    cols:[
                                        {view:'label',label:'Saldo', css:'f2em'},
                                        {view:'label',label:'0.00',id:'lbl_pc_saldo', css:'t_right f2em'},
                                    ]
                                },
                                {
                                    cols:[
                                        {},                                
                                        extend({
                                            click:function(){
                                                $$('win_p_cliente').hide();
                                            }
                                        },'dbutton'),
                                        extend({
                                            click:function(){
                                                var frm = $$('frm_cliente_pago');
                                                var data = {};
                                                if(frm.validate()){                                            
                                                    data = frm.getValues();
                                                    data.id = app_clientes.evento_id;                                            
                                                    app.ajax('catalogos/eventos/abonar',data,function(response){                                                        
                                                        if(data.abonado!=undefined){
                                                            if(!response.abonado.success)
                                                                 webix.alert('Hubo un error al registrar el anticipo');
                                                        }else{
                                                            webix.alert('Se ha realizado la operación');                                                                                                                              
                                                            app.records('dt_pagos_evento','catalogos/eventos/pagos/'+app_clientes.evento_id);
                                                            frm.clear();
                                                            $$('dt_clientes').filterByAll();
                                                            app.ajax('catalogos/eventos/cliente/' + app_clientes.tools.editId,{},function(data){            
                                                                $$('cliente_eventos').clearAll();            
                                                                $$('cliente_eventos').parse(data);            
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        },'sbutton'),
                                    ]
                                }
                            ],
                            rules:{
                                anticipo:pNumber,
                                $obj:function(obj){
                                    if(trim(obj.anticipo)!=""){
                                        return pNumber(obj.forma_pago_id);
                                    }
                                    return true;                            
                                }
                            }
                        },'form')
                    ]
                }
            ]
        }
    },'window'));
});