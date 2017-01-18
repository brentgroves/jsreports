var dateFormat = require('dateformat');


function helperA() {
  return 'A';
}

function helperB() {
  return 'B';
}
function toFixed(num) {
    return num.toFixed(2);
}

function toJSON(data) {
    return JSON.stringify(data);
}

function trim(str) {
    return str.trim();
}

function fmtDesc(itemDescription){
    var format = require('string-format');
    var description;
    description=format('{0}    Rev:NS,    U/M:EA', itemDescription.substring(0, 24));
    return description;
//    '{{0}, you have {1} unread message{2}'.format(, 2, 's');
}


function formatPhone(phone){
    var format = require('string-format');
    var formPhone;
    console.log(phone.length);
    if(10==phone.trim().length){
        formPhone=format('({0}){1}-{2}', phone.substring(0,3),phone.substring(3,6),phone.substring(6,10));
    }else{
        formPhone=phone;
    }
    return formPhone;
//    '{{0}, you have {1} unread message{2}'.format(, 2, 's');
}


function fmtDate(dte) {
var dateFormat = require('dateformat');
    var dateNow = new Date(dte);
    var local = dateNow.toLocaleString();
    return dateFormat(dateNow, "mmmm dS, yyyy");

}


function formatDate(dte) {
var dateFormat = require('dateformat');
var now = new Date();
dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    var dateNow = new Date(dte);
    var local = dateNow.toLocaleString();
    return dateFormat(local, "mm/dd/yyyy");

//    return dateNow.toLocaleString();

//    return "test";
//    return dte.toLocaleString();
}
function beforeRender(done) {
    request.template.helpers +='\n' + fmtDate + '\n' + fmtDesc + '\n' + formatPhone + '\n' + formatDate + '\n' + trim +'\n' + toFixed + '\n' + toJSON + '\n' + helperA + '\n' + helperB;
    done();
}