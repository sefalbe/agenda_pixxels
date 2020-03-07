var app_promocions = extend({
    model:'promocion',
    url:'catalogos/promociones',        
    afterSave:function(){
        app_promocions.tools.unsetOptions();
    },
    datatables:{
        s_p:'catalogos/productos/records',
    },
    afterLoad:function(){
        app.records('dt_promocion_detalle','catalogos/promociones/detalle/'+app_promocions.tools.editId);    
    },
    view:{
        id:'main_promocions',
        rows:[                        
            {
                cells:[
                    {
                        id:'win_promocions',
                        rows:[
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Paquetes'},   
                                    extend({
                                        label:'Nuevo',
                                        click:function(){
                                            app_promocions.new();
                                            $$('dt_promocion_detalle').clearAll();
                                        }
                                    },'sbutton')
                                ]
                            },'toolbar'),
                            extend({ 
                                id:'dt_promocions',                                             
                                columns:[                            
                                    {id:'nombre',header:['Nombre',serverFilter()],fillspace:true},                            
                                    {id:'descripcion',header:['Descripcion',serverFilter()],fillspace:true},                                                                
                                ],
                                on:{
                                    onItemClick:function(id){
                                        var item = this.getItem(id);
                                        app_promocions.tools.editId = item.id;
                                    },
                                    onItemDblClick:function(id){
                                        var item = this.getItem(id);
                                        app_promocions.record(item.id);
                                        app_promocions.tools.setOption('record');
                                    }
                                }                                
                            },'datatable')                            
                        ]
                    },
                    {
                        id:'win_promocion',
                        rows:[   
                            extend({
                                css:'own_header',
                                cols:[
                                    {view:'label',label:'Paquete'},
                                    extend({
                                        click:function(){
                                            app_promocions.cancel();
                                            app_promocions.close_e();
                                            app_promocions.tools.unsetOptions();
                                        }
                                    },'dbutton'),
                                    extend({
                                        click:function(){   
                                            var data = {evento:{},detalle:[]};
                                            data = $$('frm_promocion').getValues();
                                            data.detalle = $$('dt_promocion_detalle').serialize();
                                            if($$('frm_promocion').validate()){
                                                app.ajax('catalogos/promociones/save',data,function(response){
                                                    if(response.success){                                                        
                                                        if($$('dt_promocions').getItem(response.id)==undefined)
                                                            $$('dt_promocions').add(response.data);
                                                        else
                                                            $$('dt_promocions').updateItem(response.id,response.data);
                                                        app_promocions.cancel();
                                                        app_promocions.close_e();
                                                        app_promocions.tools.unsetOptions();
                                                    }else{
                                                         if(app_promocions.tools.editId == 0)
                                                            app_promocions.tools.setOption('new');
                                                        else
                                                            app_promocions.tools.setOption('record');
                                                    }
                                                });
                                            }                                             
                                        }
                                    },'sbutton'),
                                ]
                            },'toolbar'),
                            extend({
                                id:'frm_promocion',
                                elements:[                                   
                                    {
                                        cols:[
                                            {
                                                rows:[
                                                    extend({label:'Nombre',name:'nombre'},'rtext'),
                                                    extend({label:'Descripción',name:'descripcion'},'text'),
                                                    //extend({label:'Precio',name:'precio'},'text'),
                                                    {}
                                                ]
                                            },
                                            {width:5},
                                            {
                                                rows:[
                                                    {
                                                        cols:[
                                                            extend({template:'Detalle'},'section'),
                                                            extend({                                                                
                                                                label:'Añadir',
                                                                click:function(){
                                                                    $$('win_s_p').show();
                                                                }
                                                            },'button'),    
                                                            {width:30}
                                                        ]
                                                    },
                                                    extend({
                                                        footer:true,
                                                        id:'dt_promocion_detalle',
                                                        editable:true,
                                                        yCount:10,
                                                        columns:[
                                                            {id:'producto',header:'Producto',fillspace:true,footer:{colspan:3,text:'Total',css:'t_right'}},
                                                            {id:'cantidad',header:'Cantidad',editor:'text'},                                                                                                
                                                            extend({id:'precio',header:'Precio',editor:'text'},'qty_col'),                                                    
                                                            extend({id:'subtotal',header:'Subtotal'},'qty_col')
                                                        ],
                                                        on:{
                                                            onAfterEditStop:function(val,e){
                                                                var row = this.getItem(e.row);
                                                                if(row!=undefined){
                                                                    row[e.column] = pNumber(val.value)?val.value:0;
                                                                    if(row[e.column]==0 && e.column =='cantidad')
                                                                        this.remove(e.row);
                                                                    else{
                                                                        row.subtotal = row.cantidad * row.precio;                                                                                                                                            
                                                                        this.updateItem(e.row,row);
                                                                    }
                                                                }
                                                            },                                                            
                                                        },
                                                    },'datatable'),
                                                ]
                                            }
                                        ]
                                    },                                        
                                    {}
                                ],
                                rules:{                                
                                    nombre:required,                                    
                                }
                            },'form')
                        ]
                    }
                ]
            }
        ]
    }
},app_std);
webix.ready(function(){
    webix.ui(extend({
        id:'win_s_p',
        head:'Selección de productos y cargos',        
        body:{
            rows:[
                extend({
                    id:'promocion_s_p',                    
                    yCount:10,                                   
                    columns:[                        
                        {id:'producto',header:['Producto',serverFilter()],fillspace:true},
                        {id:'tipo',header:['Tipo',serverSelectFilter()]},
                        {id:'precio',header:'Precio'},
                    ],
                    on:{
                        onItemDblClick:function(id){
                            var item = webix.copy(this.getItem(id));                            
                            var productos = $$('dt_promocion_detalle').serialize();
                            var i = 0,exists = false;                            
                            for(i = 0; i < productos.length;i++){
                                if(productos[i].tipo_c == item.tipo_c && productos[i].clave == item.clave)
                                    exists = true;
                            }
                            if(!exists){
                                item.cantidad = 1;
                                item.subtotal = item.cantidad * item.precio;
                                item.cargo = item.tipo_c;
                                item.producto_id = item.clave;
                                $$('dt_promocion_detalle').add(item);                                
                                $$('win_s_p').hide();
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
                                $$('win_s_p').hide();
                            }
                        },'button')
                    ]
                }
            ]
        }
    },'window'));
});