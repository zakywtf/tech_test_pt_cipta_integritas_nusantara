const {sendMail} = require("./nodeMailer")
const htmlSendPassword = require("./htmlSendPassword")

const detailEmail = async (type = null, obj) => {
    switch (type) {
        case "send-password":
            const html = await htmlSendPassword(obj)
            const body = {
                to: obj.email,
                cc: [],
                subject: 'Data Login Snow Drop Invitation',
                html: html,
                attachments: []
            }
            await mailing(body)

            break;
    
        default:
            break;
    }
}

const mailing = async (body) => {
    // console.log({body});
    await sendMail({
        replyTo: process.env.GMAIL_USER,
        ...body
    });
}

module.exports = {
    detailEmail
}