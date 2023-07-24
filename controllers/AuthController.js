const Users = require("../schemas/users");
const { check, validationResult, body } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const { signer } = require("../middlewares/authMiddleware")
const { generate } = require("../helpers/randGen");

const Controller = {
    register: async (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        }

        try {
            const { email, password, name } = req.body
            
            let passwordHash = await bcrypt.hash(password + process.env.SALT, 10);

            let user = new Users({...req.body, password: passwordHash });
            
            user.save(async(err, user) => {
                if (err) return apiResponse.ErrorResponse(res, err);

                return apiResponse.successResponseWithData(res, "Registration Success.", { name: user.name, email: user.email });
            });
        } catch (error) {
			return apiResponse.ErrorResponseWithData(res, 'Server Error', error);
        }
    },

    login: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        }

        try {
            let user = await Users.findOne({email: req.body.email})
            if (!user) return apiResponse.notFoundResponse(res, "user ID not found");
            var payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
            const isMatch = await bcrypt.compare(req.body.password + process.env.SALT, user.password)
            if (!isMatch) return apiResponse.validationError(res, "Incorrect Password");

            const token = await signer(payload)
            payload.token = token

            return apiResponse.successResponseWithData(res, "Login Success.", payload);

        } catch (error) {
            return apiResponse.ErrorResponseWithData(res, 'Server Error', error);
        }
    },

    me: async (req, res, next) => {
        try {
            const user = await Users.findById(req.user._id).select('_id email name')
            return apiResponse.successResponseWithData(res, "Data retrieved", user);
        } catch (error) {
            return next(error);
        }
    },

}

module.exports = Controller;