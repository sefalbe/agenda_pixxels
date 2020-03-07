<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <title><?= COMPANY_NAME?></title>
    <link rel="stylesheet" href="<?= base_url('assets/codebase/webix.min.css')?>">
    <link rel="stylesheet" href="<?= base_url('assets/codebase/style.css?v=1')?>">
    <script>var BASE_URL = '<?= base_url()?>';</script>
    <script>var IS_ADMIN = <?= $this->session->userdata('admin')?>;</script>
    <script>var IS_MOBILE = <?= $mobile?>;</script>
    <script src="<?= base_url('assets/codebase/webix.js')?>"></script>
    <script src="<?= base_url('assets/codebase/skin.js')?>"></script>   
    <style>
        .noti_evento,.noti_citas,.noti_evento_p{font-size: .6em;padding:0;min-width: auto;min-height: auto;background-color: transparent;font-weight:bold;width:33%;}
        .num_day{font-size: .7em;padding:0 5px}        
        .noti_evento{
            background-color: #27ae60;
        }
        .noti_citas{
            background-color: #ca4635;
        }
        .noti_evento_p{
            background-color: #fb8c00;
        }
        .calendar .webix_dataview_item{padding: 0;}
    </style>     
    <?= mscript([        
        'rules',
        'extend',
        'app',
        'routes',                
        'agenda',
        'catalogos/clientes',        
        'catalogos/eventosm',                      
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
                        cells:[
                            tab_catalogos,                                                    
                        ]
                    },
                    {
                        animate:true,
                        cells:[
                            {
                                id:'win_inicio',
                                rows:[
                                    {                                              
                                        height:290,
                                        rows:[
                                            extend({
                                                css:'own_header',
                                                borderless:true,
                                                cols:[  
                                                    {view:'button',type:'form',label:'M.Actual',autowidth:true,click:function(){
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
                                                cols:[
                                                    {},
                                                    {
                                                        rows:[
                                                            {                                                                                                
                                                                view:'dataview',
                                                                template:'#dia#',
                                                                type:{height:25,width:45,},
                                                                yCount:1,  
                                                                borderless:true,
                                                                xCount:7,
                                                                scroll:false,
                                                                select:false,
                                                                data:[{dia:'Dom'},{dia:'Lun'},{dia:'Mar'},{dia:'Mie'},{dia:'Jue'},{dia:'Vie'},{dia:'Sáb'}]
                                                            },
                                                            {
                                                                view:'dataview',
                                                                id:'calendar',
                                                                css:'calendar',                                                                                                
                                                                scroll:false,
                                                                select:true,                                                
                                                                borderless:true,   
                                                                width:320,
                                                                type:{
                                                                    height:45,
                                                                    width:45,
                                                                },
                                                                template:'<span class="num_day #current#">#dia#</span><br/>'+
                                                                '<div class="t_center" style="line-height:10px;"><span class="noti_evento hide#neventos#">#neventos#</span><!--'+
                                                                '--><span class="noti_evento_p hide#neventosp#">#neventosp#</span><!--'+
                                                                '--><span class="noti_citas hide#ncitas#">#ncitas#</span></div>',
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
                                                    {}
                                                ]
                                            }
                                        ]
                                    },                                    
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
                                                        var citas = [],i = 0;
                                                        var data = webix.copy(this.getItem(id));
                                                        var datetime = new Date(agenda.date);                                                        
                                                        for(i = 0;i < data.citas.length;i++){                                                            
                                                            if(data.citas[i].time == data.id){
                                                                citas.push(data.citas[i]);
                                                            }
                                                        }
                                                        datetime.setHours(data.hora);
                                                        datetime.setMinutes(data.minutos);
                                                        datetime.setSeconds(0); 
                                                        agenda.date = datetime;
                                                        $$('dt_citas_hora').clearAll();
                                                        $$('dt_citas_hora').parse(citas);                                                                                                              
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
                width:320,
                body:{
                    rows:[
                        {
                            rows:[
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
                                    rows:[                                       
                                        extend({
                                            hidden:(!IS_ADMIN),
                                            id:'dt_citas_hora',
                                            yCount:5,
                                            columns:[
                                                {id:'usuario',header:'Usuario',fillspace:true},
                                                {id:'cliente',header:'Cliente',fillspace:true},
                                                extend({id:'fecha_hora',header:'Fecha y hora',width:120},'datetime_col')
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
                                        extend({id:'fecha_hora_cita',label:'Fecha y hora',width:300},'rdatetime'),
                                        extend({name:'comentario',label:'Comentario'},'textarea'),
                                        {
                                            cols:[
                                                {},
                                                extend({
                                                    id:'btn_cancelar',
                                                    label:'Cancelar',
                                                    click:function(){
                                                        $$('frm_cita_cliente').clear();
                                                        $$('btn_posponer').hide();
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
            window.scrollTo(0, 1);
        });
    </script>
</body>
</html>
