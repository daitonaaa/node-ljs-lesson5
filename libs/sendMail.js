const juice = require('juice');
const config = require('config');
const fs = require('fs');
const path = require('path');
const pug = require('pug');

const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const stubTransport = require('nodemailer-stub-transport');
const SMTPTransport = require('nodemailer-smtp-transport');

const transportEngine = (process.env.NODE_ENV == 'test' || process.env.MAILER_DISABLED)
  ? stubTransport()
  : new SMTPTransport({
    service: "Gmail",
    debug: true,
    auth: {
      user: config.get('mailer.gmail.user'),
      pass: config.get('mailer.gmail.password')
    }
  });


const transport = nodemailer.createTransport(transportEngine);

transport.use('compile', htmlToText());

module.exports = async function sendMail(options, locals) {
  const html = pug.renderFile(
    path.join(process.cwd(), 'templates', options.template) + '.pug',
    locals
  );

  const message = {
    html: juice(html), // inline styles
    to: {
      address: options.to,
    },
    subject: options.subject,
    headers: options.headers || {},
  };

  return await transport.sendMail(message);

};
