const { controller } = require("../classes/classController")
const m = require("../models/EmployeesModel")
  
let model = new m()
let rtr = controller(model)

module.exports = rtr