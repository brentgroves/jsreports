var handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
  handlebars: handlebars
});
/*
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

var curVendorPO='start', curVendorName, curPOdate, curPOStatusDescription;


handlebars.registerHelper('poChange', function(VendorPO, VendorName, podate, POStatusDescription, options) {
    if (arguments.length < 4)
        throw new Error("Handlebars Helper equal needs 5 parameters");
        
    if(( VendorPO!=curVendorPO) &&('start'==curVendorPO) ) {
        curVendorPO=VendorPO;
        curVendorName=VendorName;
        curPOdate=podate;
        curPOStatusDescription=POStatusDescription;

        return options.fn(this);
//        return options.inverse(this);
    } else if( VendorPO!=curVendorPO){
        var sumRow ='<tr><td colspan="4">&nbsp;</td></tr>';
        curVendorPO=VendorPO;
        curVendorName=VendorName;
        curPOdate=podate;
        curPOStatusDescription=POStatusDescription;
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
