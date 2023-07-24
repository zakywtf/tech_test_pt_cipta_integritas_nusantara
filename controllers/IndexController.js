const apiResponse = require("../helpers/apiResponse");
const Users = require("../schemas/users");

const { generate } = require("../helpers/randGen")

const IndexController = {
    ping: (req, res) => {
        return apiResponse.successResponse(res, 'Pong');
    },

    randString: (req, res) => {
        const rand = generate(80, false)
        return apiResponse.successResponseWithData(res, 'Random String', rand);
    },
    
}

module.exports = IndexController;