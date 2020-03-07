var app_catalogos = {
    app:false,
    tools:{
        editId:0,                    
        unsetOptions:function(){
            $$('catalogos_tools').unselectAll();
        },
        setOption:function(id){
            this.unsetOptions();
            $$('catalogos_tools').select(id);
        },
        getOption:function(){
            return $$('catalogos_tools').getSelectedId();
        }
    }
};
var menu_gral = [                                                
    {id:'win_inicio',value:'Inicio',image:'home.png',app:extend({
        init:function(){
            $$('win_inicio').show();                                       
        },
        cancel:function(){},
        close_e:function(){},
        tools:{
            editId:0,
            unsetOptions:function(){}
        },                            
    },app_std)},                        
    {id:'cat_clientes',value:'Clientes',image:'clientes.png',hidden:(IS_MOBILE),app:app_clientes},                        
    {id:'cat_eventos',value:'Eventos',image:'eventos.png',app:app_eventos},                                                        
    {id:'win_salir',value:'Salir',image:'exit.png',app:extend({
        init:function(){
            webix.confirm('Desera salir del sistema?',function(r){
                if(r){
                    document.location = BASE_URL + 'main/logout';
                }
            });                                      
        },
        cancel:function(){},
        close_e:function(){},
        tools:{
            editId:0,
            unsetOptions:function(){}
        },                            
    },app_std)}, 
];
if(IS_ADMIN){
    menu_gral = [                                                
        {id:'win_inicio',value:'Inicio',image:'home.png',app:extend({
            init:function(){
                $$('win_inicio').show();                                       
            },
            cancel:function(){},
            close_e:function(){},
            tools:{
                editId:0,
                unsetOptions:function(){}
            },                            
        },app_std)},                        
        {id:'cat_clientes',value:'Clientes',image:'clientes.png',hidden:(IS_MOBILE),app:app_clientes},                        
        {id:'cat_eventos',value:'Eventos',image:'eventos.png',app:app_eventos},                                                
        {id:'cat_cargos',value:'Cargos',image:'insumos.png',hidden:(IS_MOBILE),app:app_cargos},  
        {id:'cat_promocions',value:'Paquetes',image:'promociones.png',hidden:(IS_MOBILE),app:app_promocions},  
        {id:'win_salir',value:'Salir',image:'exit.png',app:extend({
            init:function(){
                webix.confirm('Desera salir del sistema?',function(r){
                    if(r){
                        document.location = BASE_URL + 'main/logout';
                    }
                });                                      
            },
            cancel:function(){},
            close_e:function(){},
            tools:{
                editId:0,
                unsetOptions:function(){}
            },                            
        },app_std)}, 
    ]
}
if(IS_MOBILE){
    menu_gral = [                                                
        {id:'win_inicio',value:'Inicio',image:'home.png',app:extend({
            init:function(){
                $$('win_inicio').show();                                       
            },
            cancel:function(){},
            close_e:function(){},
            tools:{
                editId:0,
                unsetOptions:function(){}
            },                            
        },app_std)},                                
        {id:'cat_eventos',value:'Eventos',image:'eventos.png',app:app_eventos},                                                        
        {id:'win_salir',value:'Salir',image:'exit.png',app:extend({
            init:function(){
                webix.confirm('Desera salir del sistema?',function(r){
                    if(r){
                        document.location = BASE_URL + 'main/logout';
                    }
                });                                      
            },
            cancel:function(){},
            close_e:function(){},
            tools:{
                editId:0,
                unsetOptions:function(){}
            },                            
        },app_std)}, 
    ];
}
var tab_catalogos = {
    id:"tab_catalogos",    
    cols:[
        {
            hidden:true,
            rows:[
                {type:'section',template:'Herramientas'},
                {
                    view:'dataview',id:'catalogos_tools',yCount:2,xCount:2,type:{height: 37},select:true,multiselect:false,css:'wborder',borderless:true,data:[
                        {id:'new',value:'Nuevo',image:'add.png'},
                        {id:'record',value:'Editar',image:'edit.png'}
                        //{id:'cat_provedores',value:'Eliminar',image:'remove.png'},
                        //{id:'cat_medidas',value:'Exportar',image:'export.png'},
                    ],
                    template:'<div class="menu_item"><img src="'+app.base_url+'assets/img/tools/#image#"><span>#value#</span></div>',
                    on:{
                        onAfterSelect:function(id){
                            var option = this.getItem(id).id;                                           
                            if(app_catalogos.app !== false){                                 
                                app_catalogos.app[option](app_catalogos.tools.editId);                                                
                            }else
                                $$('catalogos_tools').unselectAll();
                            if(option === 'record' && app_catalogos.tools.editId === 0){
                                $$('catalogos_tools').unselectAll();
                            }
                        }
                    }
                }
            ]
        },
        {width:5},
        {            
            rows:[
                {type:'section',template:'Menu',hidden:(IS_MOBILE)},
                {
                    view:'dataview',id:'menu_catalogos',yCount:((IS_MOBILE)?1:2),type:((IS_MOBILE)?{height: 37,width:50}:{height: 37}),select:true,css:'wborder',multiselect:false,borderless:true,
                    data:menu_gral
                    ,template:'<div class="menu_item"><img src="'+app.base_url+'assets/img/icons/#image#">'+((!IS_MOBILE)?'<span>#value#</span>':'&nbsp;')+'</div>',
                    on:{
                        onItemClick:function(id){
                            var app = this.getItem(id).app;                                        
                            if(app!==undefined){                                              
                                if(app_catalogos.tools.getOption()!==""){
                                    webix.confirm('Es necesario cancelar su edición actual, desea cancelar?',function(r){
                                        if(r){
                                            app_catalogos.app = app;                                        
                                            app_catalogos.app.tools = app_catalogos.tools;
                                            app_catalogos.app.init();
                                            app_catalogos.app.cancel();
                                            app_catalogos.app.close_e();
                                            app_catalogos.app.tools.editId = 0;
                                            app_catalogos.app.tools.unsetOptions();
                                        }else{
                                            $$('menu_catalogos').select('cat_' + app_catalogos.app.model + 's');
                                        }
                                    });
                                }else{                                            
                                    app_catalogos.app = app;                                        
                                    app_catalogos.app.tools = app_catalogos.tools;
                                    app_catalogos.app.init();
                                    app_catalogos.app.cancel();
                                    app_catalogos.app.close_e();
                                    app_catalogos.app.tools.editId = 0;
                                    app_catalogos.app.tools.unsetOptions();
                                }
                            }else{
                                if(app_catalogos.app !== false){
                                    if(app_catalogos.tools.getOption()!==""){
                                        webix.confirm('Es necesario cancelar su edición actual, desea cancelar?',function(r){
                                            if(r){
                                                app_catalogos.app.init();
                                                app_catalogos.app.tools.editId = 0;
                                            }
                                        });
                                    }                                                                                                
                                }
                            }
                        }
                    }
                }                                
            ]
        }
    ]
};