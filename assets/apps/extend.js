function extend(target,source){
    if(typeof source == 'string')
        return (extend_objects[source] != undefined)?webix.extend(target,webix.copy(extend_objects[source])):target;    
    else
        return webix.extend(target,source);
}
//Elements
var extend_objects = {
    datatable:{view:'datatable',navigation:true,select:'row',columns:[]},
    date_col:{format:webix.Date.dateToStr("%d/%m/%Y")},
    datetime_col:{format:webix.Date.dateToStr("%d/%m/%Y %H:%i")},
    qty_col:{css:'t_right',format:quantity_format,footer:{content:'summColumn',css:'t_right',format:quantity_format}},
    qty_col_wf:{css:'t_right',format:quantity_format,},
    button:{view:'button',label:'',autowidth:true},
    sbutton:{view:'button',label:'',autowidth:true,type:'form',label:'Guardar'},
    dbutton:{view:'button',label:'',autowidth:true,type:'danger',label:'Cancelar'},
    date:{view:'datepicker',label:'',stringResult:true,format:"%d/%m/%Y",width:120},//%Y-%m-%d      
    rdate:{view:'datepicker',label:'',stringResult:true,format:"%d/%m/%Y",width:120,required:true},  
    datetime:{view:'datepicker',label:'',stringResult:true,format:"%d/%m/%Y %H:%i",width:150,timepicker:true,icons:false},  
    rdatetime:{view:'datepicker',label:'',stringResult:true,format:"%d/%m/%Y %H:%i",width:150,timepicker:true,required:true,icons:false},      
    counter:{view:'counter',label:'',min:1,width:100},  
    text:{view:'text',label:''},  
    rtext:{view:'text',label:'',required:true},
    qty_text:{view:'text',label:'',inputAlign:'right'},    
    rqty_text:{view:'text',label:'',required:true,format:std_format_i,labelAlgin:'right'},
    textarea:{view:'textarea',label:''},  
    rtextarea:{view:'textarea',label:'',required:true},
    check:{view:'checkbox',label:''},
    text_qty:{view:'text',css:'t_right'},
    rtext_qty:{view:'text',css:'t_right',required:true},
    combo:{view:'combo',options:[]},
    rcombo:{view:'combo',options:[],required:true},
    toolbar:{view:'toolbar',cols:[]},    
    form:{view:'form',elements:[],elementsConfig:{labelPosition:'top'},borderless:true,},
    pager:{view:'pager',size:100,group:5},    
    section:{type:'section',template:''},    
    window:{view:'window',modal:true,position:'center',head:'',body:{},width:800},    
};
//shortcuts
var serverFilter = function(){
    return {content:'serverFilter'};
};
var serverSelectFilter = function(){
    return {content:'serverSelectFilter'};
};