const apiResponse = require("../helpers/apiResponse");
const mailer = require("../helpers/nodeMailer");
const Users = require("../schemas/users");
const CatServices = require("../schemas/category_services");
const Careers = require("../schemas/careers");

const { generate } = require("../helpers/randGen")

const IndexController = {

    index: async (req, res) => {
        const services = await CatServices.find({ isDeleted: false })
        const active_menu = 'home'
        const head_title = 'Beehive Drones: Best Drone System Provider Company'

        res.render('public/home/index', { head_title, active_menu, services });
    },

    service: async (req, res) => {
        const services = await CatServices.find({ isDeleted: false })
        const active_menu = 'service'
        switch (req.params.category) {
            case 'agriculture':
                var head_title = 'Best Drone Service for Agriculture | Beehive Drones'
                break;
            case 'forestry':
                var head_title = 'Best Drone Service for Forestry | Beehive Drones'
                break;
            case 'logistics':
                var head_title = 'Best Drone Service for Navier | Beehive Drones'
                break;
        
            default:
                break;
        }

        res.render('public/service/' + req.params.category, { head_title, active_menu, services });
    },

    blog: async (req, res) => {
        const services = await CatServices.find({ isDeleted: false })
        const active_menu = 'blog'
        const head_title = 'Information About Technology and Business | Beehive Drones'

        res.render('public/blog/index', { head_title, active_menu, services });
    },

    career: async (req, res) => {
        const services = await CatServices.find({ isDeleted: false })
        const careers = await Careers.find({})
        const active_menu = 'career'
        const head_title = 'Beehivedrones Job Vacancies, Check Out the Position!'

        res.render('public/career/index', { head_title, active_menu, services, careers });
    },

    book_appointment: async (req, res) => {
        const services = await CatServices.find({ isDeleted: false })
        const active_menu = ''
        const head_title = 'Book Appoinment | Beehive Drones'

        res.render('public/book_appointment/index', { head_title, active_menu, services });
    },

    // ==========================================================================================================================================

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