const apiResponse = require("../helpers/apiResponse");
const mailer = require("../helpers/nodeMailer");
const { sendRequestToMidtrans } = require("../helpers/masterFunction")
const { generate } = require("../helpers/randGen")

const IndexController = {
    index: async (req, res) => {
        if ( req.query.id ) {
            const rgxVal = new RegExp(req.query.id, 'i');
            var qry = {
                $or: [ 
                    { code: rgxVal }
                ]
            };
            const data = await Webdata.findOne(qry)
            return apiResponse.successResponseWithData(res, 'Data retrieved', data)

        } else {
            // res.redirect(301, 'https://idepreneursclub.org')
            return apiResponse.successResponse(res, 'Index')

        }
        
    },

    ping: (req, res) => {
        return apiResponse.successResponse(res, 'Pong');
    },

    contactUs: async (req, res, next) => {
        const mailOptions = {
            from: req.body.name + ' <' + req.body.email + '>',
            to: 'contact@idepreneursclub.org',
            subject: "Enquiry from " + req.body.name,
            text: req.body.message,
            html: `
                <p>Name: ${req.body.name}</p>
                <p>Email: ${req.body.email}</p>
                <p>${req.body.message}</p>
            `
        }

        try {
            let contact = new ContactUs(req.body);

            contact.save((err) => {
                if(err) return next(err);
            });

            await mailer.sendMail(mailOptions);

            return apiResponse.successResponse(res, 'Thank You. Our representative will contact you shortly.');
        } catch (error) {
            return next(error);
        }
    },

    reduceLimits: async (req, res) => {
        return apiResponse.successResponse(res, 'Key: '+req.query.key);
    },

    testPayment: async (req, res) => {
        const resp = await sendRequestToMidtrans()
        // console.log({resp});
        return apiResponse.successResponseWithData(res, 'Send Data to Midtrans Successfull.', resp);

    },

    randString: (req, res) => {
        const rand = generate(80, false)
        return apiResponse.successResponseWithData(res, 'Random String', rand);
    },

    // serviceLandCharacteristic: async (req, res) => {
    //     const data = await serviceLandCharacteristic(req.query.village_id)
    //     return apiResponse.successResponseWithData(res, 'Data retrieved', data);
    // },
    
}

module.exports = IndexController;