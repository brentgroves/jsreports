

var sql = require('mssql');
//var helper = require('sendgrid').mail
//var sg = require('sendgrid')('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');


var config = {
  user: 'sa',
  password: 'buschecnc1',
//  server: '192.168.254.36', // You can use 'localhost\\instance' to connect to named instance
  server: '10.1.2.19',//   server: 'busche-sql-1', // You can use 'localhost\\instance' to connect to named instance
  database: 'M2MDATA02',
//  database: 'm2mdata01',
  port: 1433,
//    debug: true,
  options: {
      encrypt: false // Use this if you're on Windows Azure
     // ,instanceName: 'SQLEXPRESS'
  }
}

function beforeRender(done) {
    sql.connect(config).then(function() {
        var req = new sql.Request();
       var someText=request.data.someText;
       var po = request.data.po;
       //var someText="Hello";
       //var po = '122572';
       var myText = 'select rcm.fpono,rcm.freceiver,fpartno, ' +
            '(ABS(CONVERT(BIGINT,CONVERT(BINARY(8), NEWID()))) % 1000)/100.00 AS  totcost ' +
            'from rcmast rcm ' +
            'inner join ' +
            'rcitem rci ' +
            'on rcm.freceiver=rci.freceiver ';
       var modText =    `where (fpono>'${po}') and (fpono < '122585')`
       var sqlText = myText + ' ' + modText;
       //var modText =    `where (fpono>'${po}') and (fpono < '122585')`
       //var someText = myText +' ' + modText;
        console.log(someText)           
        return req.query(sqlText).then(function(recordset) {
            var dateNow = new Date();
            var generatedOn=dateNow.toLocaleString();
            request.data = { poitem: recordset,generatedOn:generatedOn,someText:someText };
            done();
        });
    }).catch(done);
}
/*
        return req.query('select rcm.fpono,rcm.freceiver,fpartno, ' +
            '(ABS(CONVERT(BIGINT,CONVERT(BINARY(8), NEWID()))) % 1000)/100.00 AS  totcost ' +
            'from rcmast rcm ' +
            'inner join ' +
            'rcitem rci ' +
            'on rcm.freceiver=rci.freceiver ' +
            "where (fpono>'122572') and (fpono < '122585')").then(function(recordset) {
*/
var attempts=0;
//nswank@buschegroup.com,Administrator@BUSCHE-CNC.COM
function afterRender(req, res, done) {
    //filter out script execution for phantom header
    if (req.options.isChildRequest){
      return done();
    }
    //your script

    var mailer = require("nodemailer");
    var smtpTransport = require('nodemailer-smtp-transport');
    var transport = mailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'brent.groves@gmail.com', // my mail
            pass: 'JesusLives1!'
        }
    }));
var test =
'<HTML>' +
'<HEAD>' +
'<TITLE>Your Title Here</TITLE>'+
'</HEAD>'+
'<BODY BGCOLOR="111111">'+

'<a href="http://somegreatsite.com">Link Name</a>'+
'is a link to another nifty site'+

'<h1 style="color:blue;">This is a Blue Heading</h1>'+
'<H2>This is a Medium Header</H2>'+
'Send me mail at <a href="mailto:support@yourcompany.com">'+
'support@yourcompany.com</a>.'+
'<P> This is a new paragraph!'+
'<P> <B>This is a new paragraph!</B>'+
'<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>'+
'<HR>'+
'</BODY>'+
'</HTML>';
//Nancy Swank nswank@buschegroup.com,Administrator@BUSCHE-CNC.COM,bgroves3196@yahoo.com,
    var mail = {
        from: "Test <brent.groves@gmail.com",
        to: "bgroves3196@yahoo.com",
        subject: "Sending email from node.js",
        text: "See the attached report",
        html:'Your Purchase Order Status is attached',
        attachments: [
        {  
            filename: 'Report.pdf',
            content: new Buffer(res.content)
        }],
    }

    transport.sendMail(mail, function(error, response){
        transport.close();
        if(error){
            return done(error);
        }

        return done();
    });

}    
/*
    var helper = require('sendgrid').mail
    from_email = new helper.Email("brent.groves@gmail.com")
    to_email = new helper.Email("Administrator@BUSCHE-CNC.COM")
    subject = "Sending with SendGrid is Fun"
    content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
    mail = new helper.Mail(from_email, subject, to_email, content)

    var sg = require('sendgrid')('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');
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
    
    sg.API(request, function(error, response) {
    //  console.log(response.statusCode)
  //    console.log(response.body)
//      console.log(response.headers)
      done();
    })

    //filter out script execution for phantom header
    if (req.options.isChildRequest){
      return done();
    }
    //your script

      
    var mailer = require("nodemailer");
    var smtpTransport = require('nodemailer-smtp-transport');
    var transport = mailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'brent.groves@gmail.com', // my mail
            pass: 'JesusLives1!'
        }
    }));
var test =
'<HTML>' +
'<HEAD>' +
'<TITLE>Your Title Here</TITLE>'+
'</HEAD>'+
'<BODY BGCOLOR="111111">'+

'<a href="http://somegreatsite.com">Link Name</a>'+
'is a link to another nifty site'+

'<h1 style="color:blue;">This is a Blue Heading</h1>'+
'<H2>This is a Medium Header</H2>'+
'Send me mail at <a href="mailto:support@yourcompany.com">'+
'support@yourcompany.com</a>.'+
'<P> This is a new paragraph!'+
'<P> <B>This is a new paragraph!</B>'+
'<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>'+
'<HR>'+
'</BODY>'+
'</HTML>';
//Nancy Swank nswank@buschegroup.com,Administrator@BUSCHE-CNC.COM
    var mail = {
        from: "Test <bgroves3196@yahoo.com>",
        to: "bgroves3196@yahoo.com,brent.groves@gmail.com",
        subject: "Sending email from node.js",
        text: "See the attached report",
        html:'Your Purchase Order Status is attached',
        attachments: [
        {  
            filename: 'Report.pdf',
            content: new Buffer(res.content)
        }],
    }

    transport.sendMail(mail, function(error, response){
        transport.close();
        if(error){
            return done(error);
        }

        return done();
    });

    
}
*/
/* 

    //filter out script execution for phantom header
    if (req.options.isChildRequest)
      return done();

    //your script

    var helper = require('sendgrid').mail
    from_email = new helper.Email("brent.groves@sendgrid.com")
    to_email = new helper.Email("brent.groves@gmail.com")
    subject = "Sending with SendGrid is Fun"
    content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
    mail = new helper.Mail(from_email, subject, to_email, content)

    var sg = require('sendgrid')('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');
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
    
    sg.API(request, function(error, response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    })
    done();


    */


/*
    var mailer = require("nodemailer");
    var smtpTransport = require('nodemailer-smtp-transport');
    var transport = mailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'brent.groves@gmail.com', // my mail
            pass: 'JesusLives1!'
        }
    }));
var test =
'<HTML>' +
'<HEAD>' +
'<TITLE>Your Title Here</TITLE>'+
'</HEAD>'+
'<BODY BGCOLOR="111111">'+

'<a href="http://somegreatsite.com">Link Name</a>'+
'is a link to another nifty site'+

'<h1 style="color:blue;">This is a Blue Heading</h1>'+
'<H2>This is a Medium Header</H2>'+
'Send me mail at <a href="mailto:support@yourcompany.com">'+
'support@yourcompany.com</a>.'+
'<P> This is a new paragraph!'+
'<P> <B>This is a new paragraph!</B>'+
'<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>'+
'<HR>'+
'</BODY>'+
'</HTML>';
//Nancy Swank nswank@buschegroup.com,Administrator@BUSCHE-CNC.COM
    var mail = {
        from: "Test <bgroves3196@yahoo.com>",
        to: "bgroves3196@yahoo.com,brent.groves@gmail.com",
        subject: "Sending email from node.js",
        text: "See the attached report",
        html:'Your Purchase Order Status is attached',
        attachments: [
        {  
            filename: 'Report.pdf',
            content: new Buffer(res.content)
        }],
    }

    transport.sendMail(mail, function(error, response){
        transport.close();
        if(error){
            return done(error);
        }

        return done();
    });
    */
