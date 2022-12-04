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

        if (req.files) {
            const uploadedImage = req.files;

            if (req.files.proof_of_payment){
                req.body.proof_of_payment = uploadedImage.proof_of_payment[0]["location"];
            }
        }

        try {

            let user = new Users({ ...req.body });
            
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
                role: user.role
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

    change_pass:async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
        }

        try {
            const { old_password, new_password } = req.body;
            let user = await Users.findOne({_id: req.user._id, isDeleted: false})
            if(!user) return apiResponse.notFoundResponse(res, "user ID not found");

            let newPasswordHash = await bcrypt.hash(new_password+user.email, 10);
            const isMatch = await bcrypt.compare(old_password+user.email, user.password);

            if (!isMatch)
                return apiResponse.unauthorizedResponse(res, "Incorrect old password");

            user.password = newPasswordHash
            user.save((err, data) => {
                if (err) return apiResponse.ErrorResponse(res, err);

                return apiResponse.successResponseWithData(res, "Change password successfully.");
            });
          } catch (error) {
            return next(error);
          }
    }
}

module.exports = Controller;