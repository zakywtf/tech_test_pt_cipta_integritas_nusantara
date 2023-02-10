const Models = require("../classes/classModel");
const sch = require("../schemas/category_services");
const { generate } = require("../helpers/randGen");

class CatServicesModel extends Models{
    constructor(){
        super(sch)
    }

    
}

module.exports=CatServicesModel