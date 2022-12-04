const Models = require("../classes/classModel");
const sch = require("../schemas/users");

class usersModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=usersModel