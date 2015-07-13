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
    var pages = [ { "url":"https://dns.godaddy.com/ZoneFile.aspx?zone=babel.school&zoneType=0&refer=dcc&prog_id=GoDaddy",

    var actions = ["handle_page", "add_elements", "select_type_record", "finish"];

    onloadfinished(function() { page.includejs('', function() { $().click() }) })

    phantom.create('--load-images=no', '--ignore-ssl-errors=true', function (ph) {
      ph.createPage(function (page) {
        page.set('settings.userAgent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

        function handle_page(file) {
          page.open(file, function() {
            page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {
              page.evaluate(function(){
                $('#Login_userEntryPanel2_UsernameTextBox').val('');
                $('#Login_userEntryPanel2_PasswordTextBox').val('');
                $("#LoginImageButton_div").click();
              }, function(err, result){
                setTimeout(next_page, 4000);
              });
            });
          });
        }

        function add_elements() {
          page.evaluate(function(){
            $('#divAddRecord').click();
          }, function(err, result){
            setTimeout(next_page, 1000);
          });
        }

        function select_type_record() {
          page.evaluate(function(){
            $("#ctl00_cphMain_ctl00_ddlRecordType", $("#ifrm").contents()).val("A");
            setTimeout($("#ctl00_cphMain_ctl00_ddlRecordType", $("#ifrm").contents()).trigger("change"), 100);
            $("#ctl00_cphMain_ctl00_txtARecordHost", $("#ifrm").contents()).val("zzz");
            $("#ctl00_cphMain_ctl00_txtARecordPointsto", $("#ifrm").contents()).val("192.168.1.26");
            setTimeout($("#ctl00_cphMain_ctl00_btnOK", $("#ifrm").contents()).click(), 100);
            setTimeout($("#ctl00_cphMain_divSaveOne .cssblack-button").click(), 100);
          }, function(err, result){
            setTimeout(next_page, 1000);
          });
        }

        function finish() {
          page.evaluate(function(){
            $("#modalOkTwo").click();
          }, function(err, result){
            setTimeout(next_page, 1000);
          });
        }

        function next_page() {
          var file=pages.shift();
          if(file === undefined){
            page.close();
            ph.exit(0);
          } else {
            console.log(file);
            if (file.action === "handle_page"){
              handle_page(file.url);
            } else if (file.action === "add_elements") {
              add_elements();
            } else if (file.action === "select_type_record") {
              select_type_record();
            } else if (file.action === "finish") {
              finish();
            }
          }
        }
        next_page();
      });
    });
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
