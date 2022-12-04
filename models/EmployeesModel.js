const Models = require("../classes/classModel");
const sch = require("../schemas/employees");

class employeesModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=employeesModel