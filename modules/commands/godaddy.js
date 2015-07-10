var _ = require('lodash');
var utils = require('../utils');
var phantom = require('phantom');

var commands = {};
exports.commands = commands;

commands.godaddy = {
  name: 'godaddy',
  usage: 'overcast godaddy [domain] [options...]',
  description: [
    'Sends a message to a Slack channel.',
    'Requires a SLACK_WEBHOOK_URL property to be set in variables.json.',
    'You can set that with the following command:',
    'overcast var set SLACK_WEBHOOK_URL https://foo.slack.com/blah'
  ],
  examples: [
    '$ overcast godaddy "" --icon-emoji ":satelite:"',
    '$ overcast godaddy "Server stats" --channel "#general" --cpu "0.54 0.14 0.09"'
  ],
  required: [
    { domain: 'domain.com', raw: true }
  ],
  options: [
    { usage: '--channel NAME', default: '#alerts' },
    { usage: '--icon-emoji EMOJI', default: ':cloud:' },
    { usage: '--icon-url URL' },
    { usage: '--user NAME', default: 'Overcast' },
    { usage: '--KEY VALUE' }
  ],
  run: function (args) {
    var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36';

    phantom.create('--ignore-ssl-errors=true', function (ph) {
      ph.createPage(function (page) {
        page.set('settings', {userAgent: user_agent}, function(){
          page.open("https://dns.godaddy.com/ZoneFile.aspx?zone=NDRIVE.COM&zoneType=0&refer=dcc&prog_id=GoDaddy", function (open_err, status) {
            page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {
              console.log("JS Included");
              page.render('aaaa0-entry.jpg');
              page.evaluate(function(){
                $('#Login_userEntryPanel2_UsernameTextBox').val('');
                $('#Login_userEntryPanel2_PasswordTextBox').val('');
                $("#LoginImageButton_div").click();

                return true;
              }, function(err, result){
                page.render('aaaa1-entry.jpg');
                console.log($('body').html());
                ph.exit();
              });
            });
          });
        });
      });
    });





    // phantom.create('--ignore-ssl-errors=true', function (ph) {

    //   function renderPage(url, ph) {
    //     var redirectURL = null;

    //     ph.createPage(function (page) {
    //       page.onConsoleMessage(function(msg) {
    //         console.log("onConsole: " + msg);
    //       });

    //       page.onResourceReceived(function(resource) {
    //         if (url == resource.url && resource.redirectURL) {
    //           redirectURL = resource.redirectURL;
    //         }
    //       });

    //       page.open(url, function(status) {
    //         if (redirectURL) {
    //           console.log("redirected");
    //           renderPage(redirectURL);
    //         } else if (status == 'success') {
    //           console.log("success");
    //         }
    //       });
    //     });
    //   }

    //   renderPage("http://www.google.com", ph)
    // });








  // Attempt 2nd

    //   phantom.create('--ignore-ssl-errors=true', function (ph) {
    //   ph.createPage(function (page) {



    //     setTimeout(function() {
    //       page.open("https://sso.godaddy.com", function () {
    //           page.render('aaaa-entry.png');

    //           page.evaluate(function () {
    //             document.querySelector('input[id=username]').value = '';
    //             document.querySelector('input[id=password]').value = '';

    //             var ev = document.createEvent("MouseEvents");
    //             ev.initEvent("click", true, true);
    //             document.querySelector("button[id=submitBtn]").dispatchEvent(ev);
    //           });

    //           console.log("........");
    //           page.render('aaaa2-entry.png');
    //       });
    //     }, 0);

    //     setTimeout(function() {
    //       console.log("### STEP 2: ");
    //       page.open("https://dns.godaddy.com/ZoneFile.aspx?zone=NDRIVE.COM&zoneType=0&refer=dcc&prog_id=GoDaddy", function () {
    //         page.render('aaaa4-entry.png');
    //       });

    //       setTimeout(function(){
    //           ph.exit();
    //       }, 100);
    //     }, 5000);
    //   });
    // });

    //     var failExercise = function(msg) {
    //         // exercise.emit('fail', msg);
    //         callback(null, false);
    //         ph.exit();
    //     };

    //     page.onConsoleMessage(function(msg) {
    //         console.log(msg);
    //         page.render('aaaa4-entry.png');
    //         if (msg === 'prevented') {
    //             // exercise.emit('pass', 'DOM-configures');
    //             // callback(null, true);
    //             ph.exit();
    //         } else if (msg === 'finished') {
    //             failExercise('failed exercise');
    //         }
    //     });





    //     page.open("https://sso.godaddy.com", function () {
    //         page.render('aaaa-entry.png');


    //       page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {


    //         page.evaluate(function () {
    //           document.querySelector('input[id=username]').value = '';
    //           document.querySelector('input[id=password]').value = '';
    //         });

    //         // console.log("........");
    //         // page.render('aaaa2-entry.png');

    //         // // page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {
    //         //   page.evaluate(function () {
    //         //     console.log('click?');
    //         //     console.log(document.querySelector('input[id=username]').text);
    //         //     $('#forgotUsernameLink').click();
    //         //     // $('#login-form :submit').click();
    //         //     setTimeout(function(){
    //         //         // page.render('aaaa4-entry.png');
    //         //         console.log('prevented');
    //         //     }, 2000);
    //         //     // var ev = document.createEvent("MouseEvents");
    //         //     // ev.initEvent("click", true, true);

    //         //     // console.log(document.querySelector("button[id=submitBtn]").dispatchEvent(ev));

    //         //     // document.querySelector("button[id=submitBtn]").dispatchEvent(ev);
    //         //   })
    //         // // })

    //         console.log("........");
    //         page.render('aaaa3-entry.png');
    //     });

    //     // setTimeout(function() {
    //     //   console.log("### STEP 2: ");
    //     //   page.open("https://dns.godaddy.com/ZoneFile.aspx?zone=NDRIVE.COM&zoneType=0&refer=dcc&prog_id=GoDaddy", function () {
    //     //     page.render('aaaa4-entry.png');
    //     //   });

    //     //   setTimeout(function(){
    //     //       ph.exit();
    //     //   }, 100);
    //     // }, 5000);
    //   });
    // });



    // var options = {
    //   channel: args.channel || '#alerts',
    //   icon_emoji: args['icon-emoji'] || ':cloud:',
    //   icon_url: args['icon-url'] || null,
    //   text: args.message,
    //   username: args.user || 'Overcast'
    // };

    // var custom_fields = _.extend({}, args);
    // var keys = ['_', 'channel', 'command', 'message', 'icon-emoji', 'icon-url', 'message', 'user'];
    // _.each(keys, function (key) {
    //   delete custom_fields[key];
    // });

    // options.fields = custom_fields;

    // exports.send(options);





    // attempt 3rd

          // ph.createPage(function (page) {
      //   page.onConsoleMessage(function(msg) {
      //     // if (msg === 'finished') {
      //     //   console.log("onConsole: " + msg);
      //     //   page.render('aaaa2-entry.jpg', {format: 'jpeg', quality: '100'});
      //     //   setTimeout(function () {
      //     //     handle_page_two();
      //     //   }, 2000);
      //     // } else {
      //       console.log("onConsole: " + msg);
      //     // }
      //   });

      //   // function handle_page(){

      //   //   page.open("https://sso.godaddy.com", function(status) {
      //   //     if ( status === "success" ) {
      //   //       page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {
      //   //         page.evaluate(function() {
      //   //           $('#username').val('');
      //   //           $('#password').val('');
      //   //           $("#submitBtn").click();
      //   //           console.log("finished");
      //   //         });
      //   //       });
      //   //     }
      //   //   });
      //   // }

      //   function handle_page_two(){
      //     console.log("page two handle");

      //     page.open("https://dns.godaddy.com/ZoneFile.aspx?zone=NDRIVE.COM&zoneType=0&refer=dcc&prog_id=GoDaddy", function(status){
      //       page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {

      //         page.render('aaaa0-entry.jpg');

      //         page.evaluate(function() {
      //           $('#Login_userEntryPanel2_UsernameTextBox').val('');
      //           $('#Login_userEntryPanel2_PasswordTextBox').val('');
      //           $("#LoginImageButton_div").click();

      //           setTimeout(function () {
      //             console.log("will click add record");
      //             console.log("=======================================================");
      //             console.log($("body").html());
      //             console.log("=======================================================");
      //           }, 1000);
      //           // $('#foo').length === 0

      //           // $('#divAddRecord').click();

      //           // // console.log("check elements");
      //           // $('#ctl00_cphMain_ctl00_ddlRecordType').val("A");

      //           // // console.log("check elements part 2");

      //           // // console.log($('#ctl00_cphMain_ctl00_txtARecordHost').html());

      //           // $('#ctl00_cphMain_ctl00_txtARecordHost').val("zzz");
      //           // $('#ctl00_cphMain_ctl00_txtARecordPointsto').val("176.58.123.102");
      //           // $('#ctl00_cphMain_ctl00_btnOK').click();

      //           // // console.log($('#ctl00_cphMain_ctl00_btnOK').html());

      //           // // console.log("adds ip address");

      //           // $('.cssblack-button').click();

      //           // // console.log($('.cssblack-button').html());
      //           // // console.log("confirm click");

      //           // // console.log($('#modalOkTwo').html());
      //           // $('#modalOkTwo').click();

      //         });
      //       });
      //     });
      //   }


      //   function exit_page(){
      //     // console.log("State : 4" + ph.state());
      //     // setTimeout(function () {
      //       // page.evaluate(function() {
      //         console.log("finalized");
      //         page.render('aaaa10-entry.jpg', {format: 'jpeg', quality: '100'});
      //         ph.exit();
      //       // });
      //     // }, 3000);
      //   }

      //   function next_page(){
      //       console.log("start page 2");
      //       handle_page_two();

      //       // setTimeout(function () {
      //       //   console.log("finish page 2");
      //       //   handle_page_two();
      //       // }, 10000);

      //       setTimeout(function(){
      //         exit_page();
      //       }, 10000)
      //   }

      //   next_page();
      // });









  }
};

exports.send = function (options) {
  // var variables = utils.getVariables();
  // if (!variables.SLACK_WEBHOOK_URL) {
  //   utils.grey('No message sent.');
  //   utils.grey('Please add SLACK_WEBHOOK_URL to ' + utils.VARIABLES_JSON + '.');
  //   return false;
  // }

  // var godaddy = require('slack-notify')(variables.SLACK_WEBHOOK_URL);
  // godaddy.send(options);
  // utils.success('Message sent to Slack.');
};
