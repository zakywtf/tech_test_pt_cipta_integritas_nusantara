const { controller } = require("../classes/classController")
const m = require("../models/UsersModel")
  
let model = new m()
let rtr = controller(model)

module.exports = rtr