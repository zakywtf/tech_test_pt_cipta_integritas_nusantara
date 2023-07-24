const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

const secret = process.env.JWT_SECRET;
const jwtData = {
    expiresIn: process.env.JWT_TIMEOUT_DURATION,
};
const signerOption = {
	algorithms: ['HS256']
}

const signer = async (payload) => {
    return token = jwt.sign(payload, secret, jwtData);
}

const verify = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    // console.log({authHeader})
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return apiResponse.unauthorizedResponse(res, 'Token provied');

    jwt.verify(token, secret, signerOption, async (err, user) => {
        if (err) {
            // console.log({err})
            return apiResponse.unauthorizedResponse(res, err.message);

        } else {
            req.user = user
            let payload = {
                _id: user._id,
                name: user.name,
                emil: user.email
            };
            req.token = await signer(payload)
            next()
        }
        
    }) 
    
}

module.exports = { 
    signer, 
    verify 
}