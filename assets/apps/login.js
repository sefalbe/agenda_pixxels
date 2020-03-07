webix.ready(function(){
    function login(){
        if(frm_login.validate()){
        webix.ajax().post(app.base_url + 'main/do_login', frm_login.getValues(), function(response){												
            response = JSON.parse(response);
            webix.alert(response.message,function(){
                if(response.status){
                    document.location = app.base_url;
                }									
            });
        });
        }			
    }
    webix.ui({
        view:'window',position:"center",hidden:false,
        //head:'Acceso principal',
        body:{	
            view:'form',id:'login',elementsConfig:{labelPosition:'top'},
            elements:[
                {view:'text',name:'user',id:'user',label:'Usuario',invalidMessage:'Ingrese usuario'},
                {view:'text',name:'clave',id:'clave',label:'Contraseña',type:'password',invalidMessage:'Ingrese contraseña'},
                {
                    cols:[
                        {},
                        {view:'button',label:'Ingresar',autowidth:true,click:login},
                    ]
                }
            ],				
            rules:{
                user: webix.rules.isNotEmpty,
                clave: webix.rules.isNotEmpty
            }
        }							
    });	
    var frm_login = $$('login');
    $$('user').attachEvent('onKeyPress',function(e){
        var value = this.getValue();
        if(e==13 && value!=""){
            $$('clave').focus();
        }
    });
    $$('clave').attachEvent('onKeyPress',function(e){
        var value =this.getValue();
        if(e==13){
            login();
        }
    });
});
