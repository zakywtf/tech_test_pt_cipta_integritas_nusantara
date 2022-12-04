const Models = require("../classes/classModel");
const sch = require("../schemas/sallarys");

class sallarysModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=sallarysModel