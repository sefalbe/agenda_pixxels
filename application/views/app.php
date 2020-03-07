<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= COMPANY_NAME?></title>
    <link rel="stylesheet" href="<?= base_url('assets/codebase/webix.min.css')?>">
    <link rel="stylesheet" href="<?= base_url('assets/codebase/style.css?v=1')?>">
    <script>var BASE_URL = '<?= base_url()?>';</script>
    <script>var IS_ADMIN = <?= $this->session->userdata('admin')?>;</script>
    <script>var IS_MOBILE = <?= $mobile?>;</script>
    <script src="<?= base_url('assets/codebase/webix.js')?>"></script>
    <script src="<?= base_url('assets/codebase/skin.js')?>"></script>
    <style>
        .footer,.left,.footerr{background-color: #fafafa!important;}
        .left{text-align: right;padding-right: 20px;}
         .footer{border-right:2px solid #ebebeb!important;text-align: right;}
        }
    </style>        
    <?= mscript([        
        'rules',
        'extend',
        'app',
        'routes',                
        'agenda',
        'catalogos/clientes',        
        'catalogos/eventos',                      
        'catalogos/cargos',                      
        'catalogos/promociones',                      
        'tabs/catalogos',        
    ])?>
</head>
<body>
    <script>
        webix.ready(function(){                                  
            webix.ui({ 
                rows:[                    
                    {
                        hidden:true,
                        view:"tabbar", id:'tabbar', value:'tab_catalogos', multiview:true,
                        options:[
                            { value: 'Menu', id: 'tab_catalogos'},
                            /*{ value: 'Servicios', id: 'tab_servicios'},                        
                            { value: 'Ordenes de trabajo', id: 'tab_ordenes_de_trabajo'},                        
                            { value: 'Calendarios', id: 'tab_calendarios'},                        
                            { value: 'Gráficas', id: 'tab_graficas'},                        
                            { value: 'Presupuestos', id: 'tab_presupuestos'}*/
                        ]
                    },
                    {
                        cells:[
                            tab_catalogos,
                            {id:"tab_servicios", template:"Some content"},
                            {id:"tab_ordenes_de_trabajo", template:"Some content"},
                            {id:"tab_calendarios", template:"Some content"},
                            {id:"tab_graficas", template:"Some content"},
                            {id:"tab_presupuestos", template:"Some content"}                         
                        ]
                    },
                    {
                        animate:true,
                        cells:[
                            {
                                id:'win_inicio',
                                cols:[
                                    {
                                        width:840,
                                        rows:[
                                            extend({
                                                css:'own_header',
                                                borderless:true,
                                                cols:[  
                                                    {view:'button',type:'form',label:'Mes actual',autowidth:true,click:function(){
                                                        calendar.current();
                                                    }},                                                                                                        
                                                    {view:'label',id:'lbl_current_month',css:'t_center'},
                                                    {view:'button',type:'form',label:'<',autowidth:true,click:function(){
                                                        calendar.prev_month();
                                                    }}, 
                                                    {view:'button',type:'form',label:'>',autowidth:true,click:function(){
                                                        calendar.next_month();
                                                    }},                                                    
                                                ]
                                            },'toolbar'),
                                            {                                                                                                
                                                view:'dataview',
                                                template:'#dia#',
                                                type:{
                                                    height:25,
                                                    width:120,
                                                },
                                                yCount:1,  
                                                borderless:true,
                                                xCount:7,
                                                scroll:false,
                                                select:false,
                                                data:[{dia:'Domingo'},{dia:'Lunes'},{dia:'Martes'},{dia:'Miercoles'},{dia:'Jueves'},{dia:'Viernes'},{dia:'Sábado'}]
                                            },
                                            {
                                                view:'dataview',
                                                id:'calendar',
                                                css:'calendar',                                                                                                
                                                scroll:false,
                                                select:true,                                                
                                                borderless:true,
                                                type:{
                                                    height:75,
                                                    width:120,
                                                },
                                                template:'<span class="num_day #current#">#dia#</span>#hoy#<br>'+
                                                '<div class="t_center"><span class="noti_evento hide#neventos#">#neventos#</span>'+
                                                '<span class="noti_evento_p hide#neventosp#">#neventosp#</span>'+
                                                '<span class="noti_citas hide#ncitas#">#ncitas#</span></div>',
                                                on:{
                                                    onItemClick:function(id){
                                                        var data = this.getItem(id), i = 0,item;
                                                        if(data.date){
                                                            agenda.setDate(data.date);
                                                            $$('list_agenda').clearAll();
                                                            $$('list_agenda').parse(agenda.times());
                                                            for(i = 0;i < data.citas.length;i++){
                                                                item = $$('list_agenda').getItem(data.citas[i].time);
                                                                if(item != undefined){
                                                                    item.clientes+= ' - ' + data.citas[i].cliente;                                                                    
                                                                    item.citas = data.citas;                                                                    
                                                                    $$('list_agenda').updateItem(data.citas[i].time,item);                    
                                                                }
                                                            }                                                            
                                                        }else{
                                                            this.unselectAll();
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {width:10},
                                    {
                                        rows:[
                                            extend({
                                                css:'own_header',
                                                borderless:true,
                                                cols:[                                                                                                        
                                                    {view:'label',id:'lbl_current_day',css:'t_center',label:'Citas -' + agenda.formato()},
                                                ]
                                            },'toolbar'),
                                            {
                                                view:'list',
                                                id:'list_agenda',
                                                template:'#time##clientes#',
                                                select:true,
                                                data:agenda.times(),
                                                on:{
                                                    onItemDblClick:function(id){                                                        
                                                        var data = webix.copy(this.getItem(id));
                                                        var datetime = new Date(agenda.date); 
                                                        var citas_hr = [];
                                                        var i = 0;
                                                        datetime.setHours(data.hora);
                                                        datetime.setMinutes(data.minutos);
                                                        datetime.setSeconds(0); 
                                                        agenda.date = datetime;                                                        
                                                        for(i = 0; i < data.citas.length;i++){
                                                            if(data.citas[i].time== data.id){
                                                                citas_hr.push(data.citas[i]);
                                                            }
                                                        }
                                                        $$('dt_citas_hora').clearAll();
                                                        $$('dt_citas_hora').parse(citas_hr);
                                                        $$('frm_cita_cliente').clear();
                                                        $$('frm_cita_cliente').clearValidation();
                                                        if(!IS_ADMIN && data.citas.length > 0){
                                                            $$('frm_cita_cliente').setValues(data.citas[0]);                                                            
                                                        }
                                                        $$('fecha_hora_cita').setValue(datetime);                                                                                                              
                                                        $$('fecha_hora_cita').disable();                                                                                                              
                                                        $$('btn_posponer').hide();                                                        
                                                        $$('win_citas_hora').show();                                                          
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                    
                                ]
                            },                                                        
                            app_clientes.view,                           
                            app_eventos.view,
                            app_cargos.view,
                            app_promocions.view,
                        ]
                    }
                ]
            });
            calendar.init();
            webix.ui({
                view:'window',
                id:'win_citas_hora',
                head:'Citas',
                modal:true,
                position:'center',
                width:((IS_ADMIN)?800:400),
                body:{
                    rows:[
                        {
                            cols:[
                                {
                                    hidden:true,
                                    cols:[
                                        {},
                                        extend({
                                            click:function(){
                                                
                                            }
                                        },'sbutton')
                                    ]
                                },
                                {               
                                    hidden:(!IS_ADMIN),
                                    rows:[                                       
                                        extend({                                            
                                            id:'dt_citas_hora',
                                            yCount:10,
                                            columns:[
                                                {id:'usuario',header:'Usuario',fillspace:true},
                                                {id:'cliente',header:'Cliente',fillspace:true},
                                                extend({id:'fecha_hora',header:'Fecha y hora',width:150},'datetime_col')
                                            ],
                                            on:{
                                                onItemClick:function(id){
                                                    //var data = webix.copy(this.getItem(id));
                                                    //delete data.time;
                                                    //delete data.cliente;
                                                    //$$('frm_cita_cliente').setValues(data);                                                    
                                                    //$$('btn_posponer').show();
                                                }
                                            }
                                        },'datatable'),
                                    ]
                                },
                                extend({
                                    id:'frm_cita_cliente',                                                                        
                                    rules:{
                                        cliente_id:pNumber,
                                    },
                                    elements:[
                                        {name:'cliente_id',id:'agend_cliente_id',label:'Cliente',view:'combo',options:app.base_url + app.combos.clientes,required:true},
                                        extend({id:'fecha_hora_cita',label:'Fecha y hora',width:380},'rdatetime'),
                                        extend({name:'comentario',label:'Comentario',height:100},'textarea'),
                                        {
                                            cols:[
                                                {},
                                                extend({
                                                    id:'btn_cancelar',
                                                    label:'Cancelar',
                                                    click:function(){
                                                        $$('frm_cita_cliente').clear();
                                                        $$('btn_posponer').hide();
                                                        $$('win_citas_hora').hide();
                                                    }
                                                },'dbutton'),
                                                extend({
                                                    id:'btn_posponer',
                                                    hidden:true,
                                                    label:'Posponer',
                                                    click:function(){
                                                        
                                                    }
                                                },'sbutton'),
                                                extend({
                                                    label:'Guardar',
                                                    click:function(){
                                                        var frm = $$('frm_cita_cliente');
                                                        var data = {};
                                                        if(frm.validate()){
                                                            data = frm.getValues();
                                                            data.fecha_hora = $$('fecha_hora_cita').getValue();
                                                            app.ajax('catalogos/citas/save',data,function(response){
                                                                if(response.success){
                                                                    $$('win_citas_hora').hide();
                                                                    calendar.current();                                                                    
                                                                }
                                                            });
                                                        }
                                                    }
                                                },'sbutton'), 
                                            ]
                                        }
                                    ]
                                },'form')
                            ]
                        },
                        {
                            cols:[
                                {},                       
                                extend({
                                    hidden:(!IS_ADMIN),
                                    label:'Cerrar',
                                    click:function(){
                                        $$('win_citas_hora').hide();
                                    }
                                },'dbutton')
                            ]
                        }
                    ]
                }
            });    
        });
    </script>
</body>
</html>
