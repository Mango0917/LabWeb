'use strict';

var request = require('request'); // Simplified HTTP request client for Node

var nodemailer = require('nodemailer'); // Package to send emails easily
var transporter = nodemailer.createTransport({ // Create transport object using SMTP transport
  service: 'Gmail',
  auth: {
    user: process.env.emailAddress,
    pass: process.env.PASSWORD
  }
});

//Keys for captcha. Private key should be set in environment
var PUBLIC_KEY = '6LdW_hwTAAAAAN1J8l7A3gniCRA930e0OtvIf7j8';
var PRIVATE_KEY = process.env.PRIVATE_KEY;


/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

/**
 * Send an e-mail when the contact form is submitted
 */
exports.sendMail = function (req, res) {

  var data = req.body; // Get data passed from form 

  
  request.post({ // Verify captcha with google
    url: 'https://www.google.com/recaptcha/api/siteverify', 
    form: { 
      secret: PRIVATE_KEY, 
      response: data.captcha
    }
  },function (err, response, body) {

    console.log(process.env.PRIVATE_KEY);
    console.log(PRIVATE_KEY);

    var parsedBody = JSON.parse(body); // Obtain response from google
    console.log(parsedBody);

    if(err){
      console.log('ERROR:\n',err);
    }
    //if the request to googles verification service returns a body which has false within it means server failed
    //validation, if it doesnt verification passed
    if (parsedBody.success) {

      // Object passed to sendMail function below
      var mailOptions = {
        from: data.email, // sender address
        to: 'settlejonathen@gmail.com', // list of receivers
        subject: 'Message from ' + data.name + ' via SoundPadLab app', // Subject line
        text: data.email + ' sent some template message and ' + data.msg, // plaintext body
      };

      transporter.sendMail(mailOptions, function(error, info){ // Actually send e-mail
        if(error){
          return console.log(error);
        }
        console.log('Message sent: ' + info.response); // Output info on success
      });
      res.send(parsedBody.success); // Send success response
    } else {
      console.log('CAPTCHA NOT VALID');
    }
  });
};
