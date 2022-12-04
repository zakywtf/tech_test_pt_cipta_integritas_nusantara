const apiResponse = require("../helpers/apiResponse");
const Users = require("../schemas/users")

const isAdmin = async (req, res, next) => {
    let user = await Users.findById(req.user._id)
    
    if(user.role != 'admin') {
        return apiResponse.unauthorizedResponse(res, 'Unauthorized. Only admin is allowed');
    }

    next();
}

module.exports = {
    isAdmin
};