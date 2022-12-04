const { controller } = require("../classes/classController")
const m = require("../models/SallarysModel")
  
let model = new m()
let rtr = controller(model)

module.exports = rtr