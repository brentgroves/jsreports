var handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
  handlebars: handlebars
});
/* r1omgHrLe
style="border-bottom: 1px solid gray;"
col-sm-offset-2 style="font-size:15px;"
<h1 style='background-color:lightGray;text-align:center;'>
    PO Status Report <br/>
    {{formatDate dtStart}} TO
{{formatDate dtEnd}}
    </h1> 

*/
handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

var curPO='start',curCompany,curCngDate,curStatus;


handlebars.registerHelper('poChange', function(fpono, fcompany, fcngdate, fstatus, options) {
    if (arguments.length < 4)
        throw new Error("Handlebars Helper equal needs 5 parameters");
    if(( fpono!=curPO) &&('start'==curPO) ) {
        curPO=fpono;
        curCompany=fcompany;
        curCngDate=fcngdate;
        curStatus=fstatus;
        
        return options.fn(this);
//        return options.inverse(this);
    } else if( fpono!=curPO){

        var sumRow 
        if(curStatus == "OPEN"){
            sumRow=      
                '<tr><td colspan="4">&nbsp;</td></tr>'
//                '<tr>'+
//                    '<td class="text-right" colspan="3">Summary PO:'+curPO+' / <span style="color:red !important;">'+curStatus+ '</span></td>' +
//                    '<td></td>'+
//                '</tr>'
        }else{
            sumRow=      
                '<tr><td colspan="4">&nbsp;</td></tr>'
//                '<tr>'+
//                    '<td class="text-right" colspan="3"><span >Summary PO:'+curPO+' / '+curStatus+ '</span></td>' +
//                    '<td></td>'+
//                '</tr>' +
        }
        curPO=fpono;
        curCompany=fcompany;
        curCngDate=fcngdate;
        curStatus=fstatus;
        return  sumRow+options.fn(this);
    }else{
//        rcvTotCost+=totcost;
        return options.inverse(this);
    }
});

function totCost(poNumbers){
    var tot = 0.00;
    poNumbers.forEach(function (b) {
        tot+=b.extCost; 
    });

    return tot.toFixed(2);
}
