const { controller } = require("../classes/classController")
const m = require("../models/PositionsModel")
  
let model = new m()
let rtr = controller(model)

module.exports = rtr