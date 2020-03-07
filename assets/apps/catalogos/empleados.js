var app_empleados = extend({
    model:'empleado',
    url:'catalogos/empleados',
    combos:{
        plaza_id:app.combos.plazas
    },    
    afterSave:function(){
        app_empleados.tools.unsetOptions();
    },
    view:{
        id:'main_empleados',
        rows:[                        
            {
                cells:[
                    {
                        id:'win_empleados',
                        rows:[
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Empleados'},                                    
                                ]
                            },'toolbar'),
                            extend({ 
                                id:'dt_empleados',                                             
                                columns:[                            
                                    {id:'nombres',header:['Nombre',serverFilter],fillspace:true},                            
                                    {id:'a_paterno',header:['Apellido paterno',serverFilter],fillspace:true},
                                    {id:'a_materno',header:['Apellido materno',serverFilter],fillspace:true},
                                ],
                                on:{
                                    onItemClick:function(id){
                                        var item = this.getItem(id);
                                        app_empleados.tools.editId = item.id;
                                    },
                                    onItemDblClick:function(id){
                                        var item = this.getItem(id);
                                        app_empleados.record(item.id);
                                        app_empleados.tools.setOption('record');
                                    }
                                }                                
                            },'datatable')                            
                        ]
                    },
                    {
                        id:'win_empleado',
                        rows:[   
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Empleado'},
                                    extend({
                                        click:function(){
                                            app_empleados.cancel();
                                            app_empleados.close_e();
                                            app_empleados.tools.unsetOptions();
                                        }
                                    },'dbutton'),
                                    extend({
                                        click:function(){                                            
                                            if(!app_empleados.save() == false){
                                                if(app_empleados.tools.editId == 0)
                                                    app_empleados.tools.setOption('new');
                                                else
                                                    app_empleados.tools.setOption('record');
                                            }
                                        }
                                    },'sbutton'),
                                ]
                            },'toolbar'),
                            extend({
                                id:'frm_empleado',
                                elements:[
                                    {
                                        cols:[
                                            extend({label:'Plaza',name:'plaza_id',id:'empleado_plaza_id'},'rcombo'),
                                        ]
                                    },
                                    {
                                        cols:[
                                            extend({label:'Nombre',name:'nombres'},'rtext'),
                                            extend({label:'Apellido paterno',name:'a_paterno'},'rtext'),
                                            extend({label:'Apellido materno',name:'a_materno'},'text'),
                                        ]
                                    },  
                                    {
                                        cols:[
                                            extend({label:'Correo electrónico',name:'correo'},'text'),
                                            extend({label:'Teléfono',name:'telefono'},'text'),
                                            extend({label:'Celular',name:'celular'},'text'),
                                        ]
                                    },
                                    {}
                                ],
                                rules:{
                                    plaza_id:pNumber,
                                    nombres:required,
                                    a_paterno:required,
                                    correo:notRequiredEmail,
                                    telefono:notRequiredNumber,
                                    celular:notRequiredNumber,
                                }
                            },'form')
                        ]
                    }
                ]
            }
        ]
    }
},app_std);