function std_format(value){
	var std = webix.Number.numToStr({
		groupDelimiter:",",groupSize:3,decimalDelimiter:".",decimalSize:2	
	});
	return std(value);
}
function std_format_i(value){
	var std = webix.Number.numToStr({
		groupDelimiter:"",groupSize:3,decimalDelimiter:".",decimalSize:2	
	});
	return std(value);
}
function quantity_format(value){	
	var new_val = std_format(value);	
	return (new_val=='0.00')?'':new_val;
}
function pNumber(val){
    return (webix.rules.isNumber(val) && val > 0 );
}
function date_format(val){
    if(val.length==10){
        var anio = val.substr(0,4);
        var mes = val.substr(5,2);
        var dia = val.substr(8,2);
        return dia + '/' + mes + '/' + anio;                                                        
    }
    return val;
}
function notRequiredNumber(val){ 
    if(typeof val === "string"){
        val = trim(val);
        if(webix.rules.isNotEmpty(val))
            return webix.rules.isNumber(val);
    }
    return true;        
}
function notRequiredEmail(val){    
    if(typeof val === "string"){
        val = trim(val);
        if(webix.rules.isNotEmpty(val))
            return webix.rules.isEmail(val);        
    }
    return true;        
}
function notRequiredRFC(val){
    if(typeof val === "string"){
        val = trim(val);
        if(webix.rules.isNotEmpty(val))
            return rfc(val);        
    }
    return true; 
}
function notRequiredCURP(val){
    if(typeof val === "string"){
        val = trim(val);
        if(webix.rules.isNotEmpty(val))
            return curp(val);        
    }
    return true; 
}
function required(val){
    if(val!=""){
        val = trim(val);
        return webix.rules.isNotEmpty(val);
    }
    return false;
}
function trim(val) {
    return val.replace(/^\s+|\s+$/gm,'');
}
function rfc(val){
    var regex = /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/;
    return regex.test(val);
}
function curp(val){
    var regex = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    return regex.test(val);
}
function f_estado(val){
    return (val==1)?'Sí':'No';
}