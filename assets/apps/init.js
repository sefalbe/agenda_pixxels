webix.ready(function(){
	webix.i18n.setLocale("es-ES");
	var app_cerrar_session = {
		init:function(){
			webix.confirm('Desea salir del sistema?',function(r){
				if (r) {
					document.location = app.base_url + 'main/logout';	
				}
			});			
		}
	};	
	webix.ui({
		id:'main_container',			
		rows:[
			/*{
				cols:[
					{height:110,width:110,template:'<img alt="Logo" src="'+LOGO+'" style="width:100px;height:100px;"/>',borderless:true},
					{height:110,template:'<div style="color:#ab0101;padding-top:1.2em;font-size:2em" class="bold">'+TITLE+'</div>',borderless:true}
				]
			},*/
			{view: "toolbar", id:"toolbar", elements:[
				//{view: "icon", icon: "bars",click: function(){$$("menu").toggle()}},				
				{view:'label',id:'current_module',label:TITLE},
				{},				
			]},
			{
				cols:[
					{
						view:"sidebar",
						id:'menu',
                        width:200,
						//collapsed:true,
						data:[	
                            {id: "inicio", icon: "area-chart", value: "Reportes",
								data:[
									{icon:'truck', id: "win_recorrido_rs", value: "Recorridos",app:app_recorridos_r},																																									
									{icon:'truck', id: "win_entradas_rs", value: "Entradas",app:app_entradas_r},																																									
									{icon:'truck', id: "win_entradas_rv", value: "Ventas - empleado",app:app_reporte_v},																																									
									{icon:'truck', id: "win_recorridos_rms", value: "Ventas - mes",app:app_recorridos_rm},																																									
									{icon:'truck', id: "win_recorridos_rms_x", value: "Ventas - mes - detallado",app:app_recorridos_rm_x},																																									
									{icon:'truck', id: "win_recorridos_rms_dev", value: "Devoluciones",app:app_recorridos_dev},																																									
								]
							},
                            {id: "catalogos", icon: "archive", value: "Catálogos",
								data:[
									{icon:'cube', id: "win_productos", value: "Productos",app:app_productos},																		
									{icon:'users', id: "win_empleados", value: "Empleados",app:app_empleados},																		
									{icon:'shopping-cart', id: "win_tiendas", value: "Tiendas",app:app_tiendas},																		
									{icon:'map-marker', id: "win_rutas", value: "Rutas",app:app_rutas},																		
									{icon:'map-o', id: "win_colonias", value: "Colonias",app:app_colonias},																		
									{icon:'money', id: "win_bonificaciones", value: "Bonificaciones",app:app_bonificaciones},																		
								]
							},
							/*{id: "gastos_y_otros", icon: "archive", value: "Compras y gastos",
								data:[
									{icon:'users', id: "win_proveedores", value: "Proveedores",app:app_proveedores},
									{icon:'cube', id: "win_materia_primas", value: "Materia prima",app:app_materia_primas},									
									{icon:'shopping-cart', id: "win_compras", value: "Compras",app:app_compras},																																									
									{icon:'shopping-cart', id: "win_gastos", value: "Caterorías de gastos",app:app_gastos},																																									
									{icon:'shopping-cart', id: "win_registro_gastos", value: "Gastos",app:app_registro_gastos},																																									
								]
							},*/
                            {id: "config", icon: "user", value: "Configuracion",
								data:[								
								{ id: "win_salir", value: "Cerrar sesión",app:app_cerrar_session},								
							]}
						],
						on:{
							onBeforeSelect:function(module){	
								if ($$(module)!=undefined) {						                                    
									$$(module).show();
									//$$("menu").define("collapsed", true);                                    
                                    $$('current_module').setHTML(TITLE + ' - ' + this.getItem(module).value );
									this.getItem(module).app.init();
								}else if(module=="win_salir"){
									app_cerrar_session.init();
									return false;
				                }						
							}
						}
					},
					{
						animate:false,						
						cells:[
                            {
                                id:'home_cell',
                                rows:[
                                    {},   
                                    {}
                                ]
                            },                           
                            tiendas,
							entradas,
                            recorridos_r,
                            empleados,
                            productos,
                            rutas,
							bonificaciones,
							colonias,
							proveedores,
							materia_primas,
							compras,
							rpt_ventas,
							recorridos_m,
							recorridos_m_x,
							recorridos_m_dev,
							gastos,
							registro
                        ]
					}
				]
			},			
		]
	});	    
    app_tiendas.init();
	$$("upl1").attachEvent("onUploadComplete", function(r){
		$$('dt_empleados').filterByAll();
			console.log(r);
		});
});