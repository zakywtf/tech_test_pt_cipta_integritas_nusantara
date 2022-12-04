const nodemailer = require('nodemailer');

const smtp = {
    // service: 'gmail',
    host:'smtp.googlemail.com',
    secure: 'true',
    port: 465,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    tls:{
        rejectUnauthorized: false
    },
    sender:'"Admin Snow Drop Invitation" <app.snowdropinvitation@gmail.com>'

}

const transporter = nodemailer.createTransport(smtp);

module.exports = {
    sendMail: (mailOptions) => {
        if(!mailOptions.from) mailOptions.from=smtp.sender
        return transporter.sendMail(mailOptions);
    }
}