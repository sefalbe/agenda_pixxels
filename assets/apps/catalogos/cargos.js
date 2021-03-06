var app_cargos = extend({
    model:'cargo',
    url:'catalogos/cargos',
    combos:{
        plaza_id:app.combos.plazas
    },    
    afterSave:function(){
        app_cargos.tools.unsetOptions();
    },
    view:{
        id:'main_cargos',
        rows:[                        
            {
                cells:[
                    {
                        id:'win_cargos',
                        rows:[
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Cargos'},   
                                    extend({
                                        label:'Nuevo',
                                        click:function(){
                                            app_cargos.new()
                                        }
                                    },'sbutton')
                                ]
                            },'toolbar'),
                            extend({ 
                                id:'dt_cargos',                                             
                                columns:[                            
                                    {id:'nombre',header:['Nombre',serverFilter()],fillspace:true},                            
                                    {id:'descripcion',header:['Descripcion',serverFilter()],fillspace:true},                            
                                    extend({id:'precio',header:['Precio',serverFilter()],fillspace:true},'qty_col')
                                ],
                                on:{
                                    onItemClick:function(id){
                                        var item = this.getItem(id);
                                        app_cargos.tools.editId = item.id;
                                    },
                                    onItemDblClick:function(id){
                                        var item = this.getItem(id);
                                        app_cargos.record(item.id);
                                        app_cargos.tools.setOption('record');
                                    }
                                }                                
                            },'datatable')                            
                        ]
                    },
                    {
                        id:'win_cargo',
                        rows:[   
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Cargo'},
                                    extend({
                                        click:function(){
                                            app_cargos.cancel();
                                            app_cargos.close_e();
                                            app_cargos.tools.unsetOptions();
                                        }
                                    },'dbutton'),
                                    extend({
                                        click:function(){                                            
                                            if(!app_cargos.save() == false){
                                                if(app_cargos.tools.editId == 0)
                                                    app_cargos.tools.setOption('new');
                                                else
                                                    app_cargos.tools.setOption('record');
                                            }
                                        }
                                    },'sbutton'),
                                ]
                            },'toolbar'),
                            extend({
                                id:'frm_cargo',
                                elements:[                                   
                                    {
                                        cols:[
                                            extend({label:'Nombre',name:'nombre'},'rtext'),
                                            extend({label:'Descripción',name:'descripcion'},'text'),
                                            extend({label:'Precio',name:'precio',on:{onBlur:function(){this.setValue(std_format_i(this.getValue()))}}},'qty_text'),
                                        ]
                                    },                                      
                                    {}
                                ],
                                rules:{                                
                                    nombre:required,
                                    precio:pNumber
                                }
                            },'form')
                        ]
                    }
                ]
            }
        ]
    }
},app_std);