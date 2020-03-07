var app_eventos = extend({
    model:'evento',
    url:'catalogos/eventos',    
    combos:{
        cliente_id:app.combos.clientes,
        salon_id:app.combos.salones,        
        promocion_id:app.combos.promociones,        
        estado_id:app.combos.eventos_estados,        
        forma_pago_id:app.combos.formas_pago,        
    },
    datatables:{
        s_p_c:'catalogos/productos/records',
    },
    afterSave:function(data){
        app_eventos.tools.unsetOptions();        
    },
    totalEvento:0.00,
    updateTotal:function(){
        var total = 0.00,i = 0;
        var promocion = $$('promocion_detalle').serialize();
        var evento = $$('evento_detalle').serialize();
        for(i = 0;i < promocion.length;i++)
            total+= app.parseFloat(promocion[i].subtotal);
        for(i = 0;i < evento.length;i++)
            total+= app.parseFloat(evento[i].subtotal);        
        $$('evento_total').define('label',std_format(total));
        $$('lbl_confirm_total').define('label',std_format(total));         
        this.totalEvento = total;
        $$('evento_total').refresh();
        $$('lbl_confirm_total').refresh();
    },
    afterLoad:function(){            
        if(app_eventos.tools.editId!=0)
            $$('btns_e').show();
        else
            $$('btns_e').hide();
        this.loadComments();
        var data = $$('frm_evento').getValues();
        app.records('evento_detalle','catalogos/eventos/detalle/'+app_eventos.tools.editId);
        $$('frm_evento').enable();
        $$('btn_evento_save').enable();
        $$('btns_a_evento').enable();  
        $$('btns_i_evento').disable();
        $$('btn_anadir').enable();
        $$('btn_c_evento').hide();
        $$('promocion_detalle').define('editable',true);                
        $$('evento_detalle').define('editable',true);                
        if(data.status != undefined){    
            $$('evento_promocion_id').disable();
            if(IS_ADMIN)
                $$('evento_promocion_id').enable();
            if(data.status != 1){
                $$('btns_a_evento').disable(); 
                if(IS_ADMIN)
                    $$('btns_i_evento').enable(); 
                app.records('promocion_detalle','catalogos/eventos/detalle/'+app_eventos.tools.editId+'/1');            
            }
            if(data.status == 2){
                $$('fecha_hora_evento').getPopup().getBody().define('minDate',data.fecha_hora);
                $$('fecha_hora_evento').refresh();
                $$('btn_c_evento').enable();  
                if(IS_ADMIN)
                    $$('btn_c_evento').show();
            }
            if(data.status == 3){                
                $$('promocion_detalle').define('editable',false);                
                $$('evento_detalle').define('editable',false);                
                $$('frm_evento').disable();                
                $$('btn_anadir').disable();
                $$('btn_evento_save').disable();  
                $$('btn_c_evento').disable();
                //if(data.status==3) $$('btn_c_evento').disable();                    
            }             
        }
        $$('promocion_detalle').refresh();
        $$('evento_detalle').refresh();      
    },
    beforeNew:function(){
        app_eventos.tools.editId = 0;
        var hoy = new Date();
        hoy.setDate(hoy.getDate()-1);
        $$('fecha_hora_evento').getPopup().getBody().define('minDate',hoy);
        $$('fecha_hora_evento').refresh();
        this.afterLoad();
    },
    loadComments:function(){        
        app.ajax('catalogos/comentarios/evento/' + app_eventos.tools.editId,{},function(data){
            $$('evento_comentarios').clearAll();            
            $$('evento_comentarios').parse(data);            
        });        
    },
    verif:function(){
        var frm = $$('frm_evento');
        var data = frm.getValues();
        if(data.id==undefined)
            data.id = 0;
        if(data.salon_id==undefined || data.salon_id=="")
            data.salon_id = 0;        
        app.ajax('catalogos/eventos/disponible',data,function(reponse){                        
            var node = document.getElementById('semaforo_c');
            if(node!=null){                
                node.className="";
                if(reponse.disponible == 0 || reponse.disponible == 1 || reponse.disponible == 2){
                    node.className='sem_' + reponse.disponible;                
                }
                if(reponse.disponible == 0)
                    $$('btn_evento_save').enable();
                else
                    $$('btn_evento_save').disable();
            }
        });
    },
    view:{
        id:'main_eventos',
        rows:[                        
            {
                cells:[
                    {
                        id:'win_eventos',
                        rows:[
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Eventos'},
                                    extend({
                                        label:'Nuevo',
                                        click:function(){
                                            app_eventos.new();
                                            $$('promocion_detalle').clearAll();
                                        }
                                    },'sbutton')
                                ]
                            },'toolbar'),
                            extend({ 
                                id:'dt_eventos',                                             
                                columns:[                            
                                    {id:'cliente',header:['Cliente',serverFilter()],fillspace:true,hidden:(IS_MOBILE)},                            
                                    {id:'nombre',header:['Evento',serverFilter()],fillspace:true},                                    
                                    extend({id:'fecha_hora',header:'Fecha y hora',width:120},'datetime_col'),
                                    {id:'estado',header:['Estado',{content:'serverSelectFilter',options:[{id:1,value:'Activos'},{id:2,value:'Todos'}]}],width:80},                                    
                                ],
                                on:{
                                    onItemClick:function(id){
                                        var item = this.getItem(id);
                                        app_eventos.tools.editId = item.id;
                                    },
                                    onItemDblClick:function(id){
                                        var item = this.getItem(id);
                                        app_eventos.record(item.id);
                                        app_eventos.tools.setOption('record');
                                    },
                                    onBeforeLoad:function(){
                                        this.scrollTo(0, 0);
                                    }
                                }                                
                            },'datatable')                            
                        ]
                    },
                    {
                        id:'win_evento',
                        rows:[   
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Evento',hidden:true},
                                    extend({
                                        click:function(){
                                            app_eventos.cancel();
                                            app_eventos.close_e();
                                            app_eventos.tools.unsetOptions();
                                        }
                                    },'dbutton'),
                                    extend({
                                        id:'btn_evento_save',
                                        click:function(){ 
                                            var data = {evento:{},detalle:[]};
                                            data = $$('frm_evento').getValues();
                                            data.detalle = $$('evento_detalle').serialize();
                                            var promo_d = $$('promocion_detalle').serialize();
                                            var i = 0;
                                            for(i = 0; i < promo_d.length;i++){
                                                promo_d[i].clave = promo_d[i].producto_id;
                                                promo_d[i].tipo_c = promo_d[i].tipo_c;
                                                promo_d[i].promocion = 1;
                                                data.detalle.push(promo_d[i]);
                                            }
                                            if($$('frm_evento').validate()){
                                                app.ajax('catalogos/eventos/save',data,function(response){
                                                    if(response.success){
                                                        if($$('dt_eventos').getItem(response.data.id)==undefined)
                                                            $$('dt_eventos').add(response.data);
                                                        else
                                                            $$('dt_eventos').updateItem(response.data.id,response.data);
                                                        app_eventos.cancel();
                                                        app_eventos.close_e();
                                                        app_eventos.tools.unsetOptions();
                                                    }else{
                                                         if(app_eventos.tools.editId == 0)
                                                            app_eventos.tools.setOption('new');
                                                        else
                                                            app_eventos.tools.setOption('record');
                                                    }
                                                });
                                            }                                            
                                        }
                                    },'sbutton'),
                                    {
                                        id:'btns_e',
                                        cols:[
                                            extend({
                                                id:'btn_comentarios',
                                                label:'Com.',
                                                click:function(){
                                                    $$('win_set_status').show();
                                                }
                                            },'button'),
                                            extend({
                                                id:'btns_a_evento',
                                                hidden:(IS_ADMIN==0),
                                                label:'Apartar',
                                                click:function(){
                                                    $$('win_c_evento').show();
                                                }
                                            },'sbutton'),
                                            extend({
                                                id:'btns_i_evento',
                                                hidden:(IS_ADMIN == 0),
                                                label:'Imprimir',
                                                click:function(){
                                                    webix.modalbox({
                                                        title:"Imprimir contrato",
                                                        buttons:["Descargar PDF", "Enviar al correo", "No"],                                                        
                                                        text:"Seleccione una de las diferentes opciones",
                                                        width:300,
                                                        callback: function(result){
                                                            switch(result){
                                                                case "0": 
                                                                    window.open(BASE_URL + 'index.php/catalogos/eventos/imprimir/' + app_eventos.tools.editId+'/1');
                                                                    break;
                                                                case "1":
                                                                    window.open(BASE_URL + 'index.php/catalogos/eventos/imprimir/' + app_eventos.tools.editId+"/2");
                                                                    break;                                                            
                                                            }
                                                        }
                                                    });
                                                }
                                            },'sbutton'),
                                            extend({                                                
                                                id:'btn_c_evento',
                                                hidden:(IS_ADMIN==0),
                                                label:'C.Evento',
                                                click:function(){
                                                    $$('win_set_status').show();
                                                }
                                            },'dbutton')
                                        ]
                                    },
                                    {}
                                ]
                            },'toolbar'),
                            {
                                view:'scrollview',
                                scroll:'y',                                
                                height:320,
                                body:{
                                    rows:[
                                        extend({
                                            id:'frm_evento',
                                            elements:[
                                                extend({label:'Cliente',name:'cliente_id',id:'evento_cliente_id'},'rcombo'),
                                                extend({label:'Nombre del evento',name:'nombre'},'rtext'),
                                                extend({label:'Salon',name:'salon_id',id:'evento_salon_id'},'rcombo'),
                                                extend({
                                                    label:'Paquete',name:'promocion_id',id:'evento_promocion_id',
                                                    on:{
                                                    onChange:function(val){ 
                                                        var id = app_eventos.tools.editId;
                                                        app.records('promocion_detalle','catalogos/promociones/detalle/'+val+'/'+id);
                                                    }
                                                }
                                                },'rcombo'),
                                                {
                                                    cols:[
                                                        extend({label:'Fecha y hora',name:'fecha_hora',id:'fecha_hora_evento',
                                                        on:{
                                                            onChange:function(){
                                                                app_eventos.verif();
                                                            }
                                                        }},'rdatetime'),
                                                        extend({label:'Duración (hrs)',name:'duracion',
                                                        on:{
                                                            onChange:function(){
                                                                app_eventos.verif();
                                                            }
                                                        }},'counter'),
                                                        {}
                                                    ]
                                                },    
                                                {id:'semaforo',height:50,template:'<div id="semaforo_c" style="height:50px">&nbsp;</div>'},
                                                extend({placeholder:'Descripción',name:'descripcion'},'textarea'),                                            
                                                {}
                                            ],
                                            rules:{
                                                cliente_id:pNumber,
                                                nombre:required,
                                                fecha_hora:required,                                           
                                            }
                                        },'form'),
                                        {
                                            rows:[                                           
                                                {
                                                    cols:[
                                                        {template:'Detalle de promocion o paquete',type:'section'},                                                    
                                                    ]
                                                },
                                                extend({
                                                    footer:true,
                                                    id:'promocion_detalle',
                                                    yCount:5,
                                                    editable:true,
                                                    columns:[
                                                        {id:'producto',header:'Producto',fillspace:true,footer:{colspan:3,text:'Total',css:'t_right'}},
                                                        {id:'cantidad',header:'Cantidad',editor:'text'},                                                                                                    
                                                        extend({id:'precio',header:'Precio'},'qty_col'),                                                    
                                                        extend({id:'subtotal',header:'Subtotal'},'qty_col')
                                                    ],
                                                    on:{    
                                                        onAfterEditStop:function(val,e){
                                                            var row = this.getItem(e.row);
                                                            var old = row.cantidad;
                                                            if(row!=undefined){
                                                                row.cantidad = pNumber(val.value)?val.value:0;
                                                                row.cantidad_minima = app.parseFloat(row.cantidad_minima);
                                                                if(row.cantidad < row.cantidad_minima && !IS_ADMIN)
                                                                    row.cantidad = row.cantidad_minima;                                                            
                                                                if(row.cantidad==0){
                                                                    this.remove(e.row);                                                                
                                                                }else{
                                                                    row.subtotal = row.cantidad * row.precio;
                                                                    if(row.cantidad != old)
                                                                        this.updateItem(e.row,row);                                                                                                                                                                                        
                                                                }
                                                                this.editStop();
                                                                app_eventos.updateTotal();
                                                            }
                                                        },
                                                        onAfterLoad:function(){
                                                            app_eventos.updateTotal();
                                                        }
                                                    }
                                                },'datatable'),   
                                                {
                                                    cols:[
                                                        extend({template:'Extras'},'section'),
                                                        extend({
                                                            id:'btn_anadir',
                                                            label:'Añadir',
                                                            click:function(){
                                                                $$('win_s_p_c').show();
                                                            }
                                                        },'button'),    
                                                        {width:30}
                                                    ]
                                                },
                                                extend({
                                                    footer:true,
                                                    id:'evento_detalle',
                                                    editable:true,
                                                    navigation:true,
                                                    yCount:5,
                                                    columns:[
                                                        {id:'producto',header:'Producto',fillspace:true,footer:{colspan:3,text:'Total',css:'t_right'}},
                                                        {id:'cantidad',header:'Cantidad',editor:'text'},                                                                                                    
                                                        extend({id:'precio',header:'Precio'},'qty_col'),                                                    
                                                        extend({id:'subtotal',header:'Subtotal'},'qty_col')
                                                    ],
                                                    on:{
                                                        onAfterEditStop:function(val,e){
                                                            var row = this.getItem(e.row);
                                                            if(row!=undefined){
                                                                row.cantidad = pNumber(val.value)?val.value:0;
                                                                if(row.cantidad==0)
                                                                    this.remove(e.row);
                                                                else
                                                                    row.subtotal = row.cantidad * row.precio;
                                                                app_eventos.updateTotal();
                                                            }
                                                        },
                                                        onAfterLoad:function(){
                                                            app_eventos.updateTotal();
                                                        },
                                                        onKeyPress:function(code){
                                                            var selectedId = this.getSelectedId();                                                        
                                                            if(code == 46 && selectedId != undefined){
                                                                this.remove(selectedId);              
                                                                app_eventos.updateTotal();
                                                            }
                                                        }
                                                    },
                                                    rules:{
                                                        cantidad:pNumber
                                                    }
                                                },'datatable'),                                                                                              
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                cols:[                                                    
                                    {view:'label',label:'Total $ ',css:'t_right f2em'},
                                    {view:'label',label:'$0.00',css:'t_right f2em',id:'evento_total'}
                                ]
                            }, 
                            {}
                        ]
                    },                    
                ]
            }            
        ]
    }
},app_std);
webix.ready(function(){
    webix.ui(extend({
        id:'win_s_p_c',
        head:'Selección de productos y cargos',
        width:320,
        body:{
            rows:[
                extend({
                    id:'evento_s_p_c',                    
                    yCount:10,                                   
                    columns:[                        
                        {id:'producto',header:['Producto',serverFilter()],fillspace:true},
                        {id:'tipo',header:['Tipo',serverSelectFilter()]},
                        {id:'precio',header:'Precio'},
                    ],
                    on:{
                        onItemDblClick:function(id){
                            var item = webix.copy(this.getItem(id));                            
                            var productos = $$('evento_detalle').serialize();
                            var i = 0,exists = false;                            
                            for(i = 0; i < productos.length;i++){
                                if(productos[i].tipo_c == item.tipo_c && productos[i].clave == item.clave)
                                    exists = true;
                            }
                            if(!exists){
                                item.cantidad = 1;
                                item.subtotal = item.cantidad * item.precio;
                                $$('evento_detalle').add(item);
                                app_eventos.updateTotal();
                                $$('win_s_p_c').hide();
                            }else
                                webix.message('El producto seleccionado ya existe en la lista actual');                            
                        }
                    }
                },'datatable'),
                {
                    cols:[
                        {template:'Doble click para seleccionar',height:25},
                        extend({
                            label:'Cerrar',
                            click:function(){
                                $$('win_s_p_c').hide();
                            }
                        },'button')
                    ]
                }
            ]
        }
    },'window'));
    webix.ui(extend({
        id:'win_set_status',
        head:'Comentarios',        
        body:{
            rows:[
                {
                    cols:[
                        {       
                            rows:[
                                extend({template:'Comentarios del evento'},'section'),
                                {
                                    view:"list", 
                                    height:500,
                                    id:'evento_comentarios',
                                    pager:'pg_cliente_comentarios',
                                    autoConfig:true, 
                                    css:'comments',                                                            
                                    templateStart:"<div item_id='id' class='custom_item'>",
                                    template:'<div><b>#usuario#</b>&nbsp;(<small>#fecha_hora#</small>)</div><div>#comentario#</div>',
                                    templateEnd:"</div>",
                                    data:[

                                    ]
                                },                                
                            ]    
                        },
                        extend({
                            id:'frm_estado',
                            elements:[
                                extend({
                                    id:'comentario',
                                    name:'comentario',
                                    label:'Comentario'
                                },'rtextarea'), 
                                {
                                    cols:[
                                        {},
                                        extend({
                                            click:function(){
                                                var frm = $$('frm_estado');
                                                var datas = {};
                                                if(frm.validate()){
                                                    datas = frm.getValues();
                                                    datas.tipo = 2;
                                                    datas.evento_id = app_eventos.tools.editId;                                            
                                                    app.ajax('catalogos/eventos/set_status',datas,function(data){
                                                        if(data.success){
                                                            frm.clear();
                                                            frm.clearValidation();
                                                            app_eventos.loadComments(data.data.id);                                                                                                    
                                                        }else
                                                            webix.alert('Hubo un problema al guardar su comentario');
                                                    });
                                                }
                                            }
                                        },'sbutton')
                                    ]
                                },
                                {},

                            ],
                            rules:{
                                comentario:required,
                            }
                        },'form'),                        
                    ]
                },
                {
                    cols:[
                        {
                            view:'pager',
                            id:'pg_evento_comentarios',
                            group:5,
                            size:10
                        },
                        {},
                        extend({
                            label:'Cerrar',
                            click:function(){
                                $$('win_set_status').hide();
                            }
                        },'dbutton')
                    ]
                }
            ]
        }
    },'window'));
    webix.ui(extend({
        id:'win_c_evento',
        head:'Confirmación de evento',
        width:400,
        body:{
            rows:[
                extend({
                    id:'frm_evento_confirmacion',
                    elements:[
                        {
                            cols:[
                                {view:'label',label:'Total', css:'f2em'},
                                {view:'label',label:'0.00',id:'lbl_confirm_total', css:'t_right f2em'},
                            ]
                        },
                        extend({name:'forma_pago_id',id:'evento_forma_pago_id',label:'Forma de pago',labelPosition:'left',labelWidth:100,labelAlgin:'right'},'combo'),
                        extend({
                            label:'Anticipo',
                            name:'anticipo',
                            labelCss:'f2em',
                            labelPosition:'left',                                    
                            labelWidth:100,
                            on:{
                                onChange:function(val,old){
                                    var anticipo = 0.00,saldo = 0.00;
                                    if(pNumber(val)){                                        
                                        anticipo = app.parseFloat(val);    
                                        console.log(app_eventos.totalEvento);
                                        if(app_eventos.totalEvento < anticipo){
                                            anticipo = app_eventos.totalEvento;
                                            this.setValue(std_format(anticipo));
                                        }
                                        saldo = app_eventos.totalEvento - anticipo;
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
                                {view:'label',label:'0.00',id:'lbl_confirm_saldo', css:'t_right f2em'},
                            ]
                        },
                        {
                            cols:[
                                {},                                
                                extend({
                                    click:function(){
                                        $$('win_c_evento').hide();
                                    }
                                },'dbutton'),
                                extend({
                                    click:function(){
                                        var frm = $$('frm_evento_confirmacion');
                                        var data = {};
                                        if(frm.validate()){                                            
                                            data = frm.getValues();
                                            data.id = app_eventos.tools.editId;                                            
                                            app.ajax('catalogos/eventos/confirmar',data,function(response){
                                                if(response.status){
                                                    if(data.abonado!=undefined){
                                                        if(!response.abonado.success)
                                                             webix.alert('Hubo un error al registrar el anticipo');
                                                    }else{
                                                        webix.alert('Se ha realizado la operación');  
                                                        app.records('promocion_detalle','catalogos/eventos/detalle/'+app_eventos.tools.editId+'/1');            
                                                        $$('frm_evento').disable();
                                                        $$('btn_anadir').disable();
                                                        $$('btns_a_evento').disable();
                                                        $$('btns_i_evento').enable();
                                                        $$('win_c_evento').hide();
                                                        $$('btn_evento_save').disable();
                                                        $$('dt_eventos').filterByAll();
                                                        frm.clear();                                                        
                                                    }
                                                    
                                                }else{
                                                    webix.alert('Hubo un error al realizar la confirmación');
                                                }
                                            });
                                        }
                                    }
                                },'sbutton'),
                            ]
                        }
                    ],
                    rules:{
                        anticipo:notRequiredNumber,
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
    },'window'));
});