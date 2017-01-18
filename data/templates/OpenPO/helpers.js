var handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
  handlebars: handlebars
});
var viewData = {
    itemSize: 20,
    items: [
        'Zimbabwe', 'dog', 'falafel'
    ]
};   

function totCost(poNumbers){
    var tot = 0.00;
    poNumbers.forEach(function (b) {
        tot+=b.extCost; 
    });

    return tot.toFixed(2);
}
