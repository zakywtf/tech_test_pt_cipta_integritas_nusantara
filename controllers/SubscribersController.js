const { controller } = require("../classes/classController")
const m = require("../models/SubscribersModel")
  
let model = new m()
let rtr = controller(model)

rtr.post('/save',async (req, res, next)=>{
    try {
        const data = await model.save(req.body)
        res.send({status: data.status, message: data.message})

    } catch (error) {
        return next(error);
    }
})

module.exports = rtr