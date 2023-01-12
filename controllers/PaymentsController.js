const { controller } = require("../classes/classController")
const m = require("../models/PaymentsModel")
const apiResponse = require("../helpers/apiResponse");
const { cakllbackFromMidtrans } = require("../helpers/masterFunction")
 
let model = new m()
let rtr = controller(model)

rtr.post('/save',async (req, res, next)=>{
    try {
        const data = await model.save(req.body)

        return apiResponse.successResponseWithData(res, "Data added succesfully", data);
    } catch (error) {
        return next(error);
    }
})

rtr.post('/midtrans',async (req, res, next)=>{
    try {
        const data = await cakllbackFromMidtrans(req.body)

        return apiResponse.successResponseWithData(res, "Data added succesfully", data);
    } catch (error) {
        return next(error);
    }
})
    
module.exports = rtr