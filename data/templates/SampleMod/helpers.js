var handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
  handlebars: handlebars
});

handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

var curPO='start',curReceiver,curPN,rcvTotCost;


handlebars.registerHelper('poChange', function(fpono, freceiver, fpartno, totcost, options) {
    if (arguments.length < 5)
        throw new Error("Handlebars Helper equal needs 4 parameters");
    if(( fpono!=curPO) &&('start'==curPO) ) {
        curPO=fpono;
        curReceiver=freceiver;
        curPN=fpartno;
        rcvTotCost=totcost;
        return options.fn(this);
//        return options.inverse(this);
    } else if( fpono!=curPO){
        rcvTotCost=rcvTotCost.toFixed(2);
        var sumRow = 
        '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>' +
            '<td><span style="margin-left:-40px !important;">Total:'+rcvTotCost+'</span></td>' 
        '</tr>'
        curPO=fpono;
        curReceiver=freceiver;
        curPN=fpartno;
        rcvTotCost=totcost;
        return  sumRow+options.fn(this);
    }else{
        rcvTotCost+=totcost;
        return options.inverse(this);
    }
});

function maxCost(poitem){
    var max = { totcost: 0 };
    poitem.forEach(function (b) {
        if (b.totcost > max.totcost) {
            max = b
        }
    });

    return max.fpono + ' ' + max.totcost;
}



function mostSelling(books) {
    var max = { sales: 0 };
    books.forEach(function (b) {
        if (b.sales > max.sales) {
            max = b
        }
    });

    return max.name + ' ' + max.sales;
}
