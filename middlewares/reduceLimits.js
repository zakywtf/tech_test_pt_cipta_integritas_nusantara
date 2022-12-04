// const ApiKeys = require("../models/api_keys");
// const apiResponse = require("../helpers/apiResponse");

// const reduceLimits = async (req, res, next) => {
//     try {

//         const data = await ApiKeys.findOne({ key: req.query.key, status: 'active' })

//         if (!data) return apiResponse.dataNotFoundResponse(res, 'No API Keys found')

//         // if (data.status == 'active') return apiResponse.dataNotFoundResponse(res, 'API Key is inactive')
        
//         if (data.isLimited == true) {
//             if (data.limits == 0) return apiResponse.dataNotFoundResponse(res, 'Limits is up')

//             data.limits -= 1
//             await data.save()

//             next()
//         } else {
//             next();

//         }


//     } catch (error) {
//         return next(error);
//     }
// }

// module.exports = {
//     reduceLimits
// }