var app = {
    urls:{},
    base_url:BASE_URL,        
    save:function(form,url,success){
        if($$(form).validate()){
            var data = $$(form).getValues();
            webix.ajax().sync().post(this.base_url+url, data, function(response){
                response = JSON.parse(response);
                if (response.message!=undefined) {
                    webix.alert(response.message,function(){                        
                        success(response);
                    });				
                }else{
                    success(response);
                }		
            });
            return data;
        }else
            return false;
    },
    ajax:function(url,data,success){
        success = (typeof success == "function")?success:function(){};
        webix.ajax().sync().post(this.base_url+url, data, function(response){
            response = JSON.parse(response);
            if (response.message!=undefined) {
                webix.alert(response.message,function(){
                    success(response);
                });				
            }else{
                    success(response);
            }
        });
    },
    record:function(form,url,success){
        $$(form).load(this.base_url + url,success);
    },
    records:function(datatable,url){
        if ($$(datatable)!=undefined) {
            $$(datatable).clearAll();
            $$(datatable).showOverlay("Cargando los datos, espere un momento por favor...");
            $$(datatable).load(this.base_url + url,function(){
                    $$(datatable).hideOverlay();
            });
        }		
    },
    parseInt:function(val){
        if(webix.rules.isNumber(val))
            return parseInt(val);
        else
            return 0;
    },
    parseFloat:function(val){
        if(webix.rules.isNumber(val))
            return parseFloat(val);
        else
            return 0.0;
    },
    isset:function(val){
        return (val!=undefined);
    },
    log:function(){
        var i = 0;
        for(i = 0;i<arguments.length;i++)
            console.log(0,arguments[i]);
    }
};
var app_std = {
    url:'',
    model:'',
    default:{},
    initialized:false,
    tools:false,
    combos:{},
    unique:function(field,value){
        var exist = false;
        if(required(value)){
            var id = $$('frm_' + this.model).getValues().id;
            id = (webix.rules.isNumber(id))?id:0;
            webix.ajax().sync().post(app.base_url + this.url + '/unique', {id:id,field:field,value:value}, function(response){
                response = JSON.parse(response);
                if(response.status === true) {
                    exist = true;
                }		
            });              
        }
        return exist;
    },
    show:function(){
        $$('main_' + this.model + 's').show();
    },
    records:function(){		
        if($$('dt_' + this.model + 's')!=undefined)
            app.records('dt_' + this.model + 's', this.url + '/records');
    },
    filterByAll:function(){		
        if($$('dt_' + this.model + 's')!=undefined)
            $$('dt_' + this.model + 's').filterByAll();
    },
    record:function(id){        
        var model = this.model;
        var this_app = this;
        if(id!=0){
            app.record('frm_' + this.model, this.url + '/record/' + id,function(){
                this_app.afterLoad();            
                $$('win_' + model ).show();
            });
        }else{
            this_app.afterLoad();
        }
    },
    save:function(){
        var model = this.model;
        var this_app = this;		
        app.save('frm_' + model,this.url + '/save',function(success){
           $$('win_' + this_app.model + 's').show();   
            if($$('dt_' + this_app.model + 's').getItem(success.data.id)==undefined)
                $$('dt_' + this_app.model + 's').add(success.data);
            else
                $$('dt_' + this_app.model + 's').updateItem(success.data.id,success.data);
           this_app.afterSave(success);
           this_app.init();
        });            
    },
    new:function(){
        if($$('frm_' + this.model) != undefined){
            $$('frm_' + this.model).clear();
            $$('frm_' + this.model).clearValidation();
            $$('frm_' + this.model).setValues(this.default);        
        }              
        $$('win_' + this.model).show();                    
        this.beforeNew();
    },    
    close_e:function(){
        if($$('frm_' + this.model) != undefined){
            $$('frm_' + this.model).clear();
            $$('frm_' + this.model).clearValidation();
            $$('win_' + this.model + 's').show();
        }
    },        
    init:function(){     
        if(!this.initialized){   
            this.load();
            this.records();
            this.initialized = true;            
        }  
        
        this.show();
    },
    load:function(){
        var i = 0;
        for(combo in this.combos){
            if($$(this.model +'_'+ combo)!=undefined){
                $$(this.model +'_'+ combo).define('options',app.base_url + this.combos[combo]);
            }            
        }
        for(datatable in this.datatables){
            if($$(this.model +'_'+ datatable)!=undefined){
                app.records(this.model +'_'+ datatable,this.datatables[datatable])                
            }            
        }
    },
    cancel:function(){        
        if($$('dt_' + this.model + 's'))
            $$('dt_' + this.model + 's').clearSelection();        
    },
    afterLoad:function(){

    },
    afterSave:function(){

    },
    beforeNew:function(){
        
    }
};