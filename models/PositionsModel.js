const Models = require("../classes/classModel");
const sch = require("../schemas/positions");

class positionsModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=positionsModel