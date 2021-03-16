//const api_key = '3640bde018e5d32a9f4ff6d1536d6fed-29561299-a21f6844'
//const DOMAIN = 'sandboxc67d3337cdff4e99bfde8da1fe89fe13.mailgun.org';

const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

/*
const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
    console.log(body);
});*/

const sendWelcomeEmail = (email,name) => {
    const data = {
        from: 'Andrew Mead <andrewmead@mead.io>',
        to: email,
        subject: 'thanks',
        text: `Welcome to the app, ${name}. Let me know hou you get along with the app.`
    }
    mg.messages().send(data, function (error,body) {
        console.log(body)
    })
}

const sendCancelationEmail = (email,name) => {
    const data = {
        from: 'Andrew Mead <andrewmead@mead.io>',
        to: email,
        subject: 'why leaving?',
        text: `Hi ${name}. Let me know why you are leaving the system`
    }
    mg.messages().send(data, function (error,body) {
        console.log(body)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}