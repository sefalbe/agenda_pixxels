var agenda = {
    date:new Date(),
    setDate:function(date){
        this.date = date;  
        $$('lbl_current_day').define('label','Citas - ' + this.formato());
        $$('lbl_current_day').refresh();
    },
    formato:function(){
        var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var days = ['Dommingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'];
        return days[this.date.getDay()] + ' ' + this.date.getDate() + ' de ' + months[this.date.getMonth()] + ' ' + this.date.getFullYear();
    },
    times:function(){
        var times = [], i = 0,time = 0,horas = 8,minutos = 0;
        for(i = 0;i <= 35;i++){
            if((i%2)==0 && i > 0){
                horas++;
                minutos = 0;
            }else if(i > 0){
                minutos = 30;
            }
            times.push({
                id:((horas<10)?('0' + horas):horas) +''+ ((minutos<10)?('0' + minutos):minutos),
                citas:'',
                clientes:'',
                hora:horas,
                minutos:minutos,
                time:horas + ':' + ((minutos<10)?('0' + minutos):minutos)
            });
        }
        return times;
    }
};
var calendar = {
    date:new Date(),
    current_date:new Date(),
    refresh:function(){
        var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var first_day = new Date(this.current_date);
        var last_day = new Date(this.current_date);        
        var i = 0,today = false,this_month = 0,i_d = 0,selected = false,fecha_c;
        var days = [];
        first_day.setDate(1);
        last_day.setDate(1);
        last_day.setMonth(last_day.getMonth()+1);                    
        last_day.setDate(last_day.getDate()-1);                        
        for(i = 0;i < (first_day.getDay());i++){
            i_d++;
            days.push({id:i_d,dia:'',hoy:'',current:'',neventos:'',neventosp:'',ncitas:'',eventos:'',eventosp:'',citas:''}); 
        }
        for(i = 0;i < (last_day.getDate());i++){   
            i_d++;
            today = this.is_today(first_day,this.date);            
            this_month = (first_day.getMonth() == this.date.getMonth());
            fecha_c = (first_day.getFullYear()) + (((first_day.getMonth() < 9)?'0':'') + (first_day.getMonth() + 1)) + ((first_day.getDate() < 10)?'0':'') + first_day.getDate();            
            if(today)
                selected = fecha_c;
            days.push({
                id:fecha_c,
                dia:first_day.getDate(),
                date:new Date(first_day),
                fdate:(first_day.getFullYear()) + (first_day.getMonth() + 1) + '-' + ((first_day.getDate() < 10)?('0'+first_day.getDate()):''),
                hoy:((today)?'':''),                            
                current:(this_month)?'current_month':'',
                neventos:'',
                neventosp:'',
                ncitas:'',
                eventos:'',
                citas:'',
                eventosp:''
            });                        
            first_day.setDate(first_day.getDate() + 1);
        }
        $$('lbl_current_month').define('label',months[this.current_date.getMonth()] + ' ' + this.current_date.getFullYear());
        $$('lbl_current_month').refresh();
        $$('calendar').clearAll();
        $$('calendar').parse(days);
        if(selected !== false)
            $$('calendar').select(selected);
        this.load();
    },
    load:function(){
        var year = this.current_date.getFullYear(), month = (this.current_date.getMonth() + 1);
        app.ajax('catalogos/eventos/mes',{year:year,month:month},function(response){
            var i = 0,item,item2,item3;            
            if(response.citas){                                
                for(i = 0;i < response.citas.length;i++){
                    item = $$('calendar').getItem(response.citas[i].fecha);
                    item.ncitas = response.citas[i].total;                    
                    item.citas = response.citas[i].detalle;
                    $$('calendar').updateItem(response.citas[i].fecha,item);                    
                }
            }
            if(response.eventos){                                
                for(i = 0;i < response.eventos.length;i++){
                    item2 = $$('calendar').getItem(response.eventos[i].fecha);
                    item2.neventos = response.eventos[i].total;                    
                    item2.eventos = response.eventos[i].detalle;                    
                    $$('calendar').updateItem(response.eventos[i].fecha,item2);                    
                }
            }
            if(response.eventosp){                  
                for(i = 0;i < response.eventosp.length;i++){
                    item3 = $$('calendar').getItem(response.eventosp[i].fecha);                    
                    item3.neventosp = response.eventosp[i].total;                    
                    item3.eventosp = response.eventosp[i].detalle;                    
                    $$('calendar').updateItem(response.eventosp[i].fecha,item3);                    
                }
            }
        });
    },
    is_today:function(a,b){                    
        return (a.getFullYear()==b.getFullYear() && a.getMonth()==b.getMonth() && a.getDate()==b.getDate());
    },
    prev_month:function(){
        this.current_date.setMonth(this.current_date.getMonth()-1);
        this.refresh();
    },
    next_month:function(){
        this.current_date.setMonth(this.current_date.getMonth()+1);
        this.refresh();
    },
    current:function(){
        var today = new Date();
        this.current_date.setMonth(today.getMonth());
        this.refresh();
    },
    init:function(){
        this.refresh();
    }
}; 