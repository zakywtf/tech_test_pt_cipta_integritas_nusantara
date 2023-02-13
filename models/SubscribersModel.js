const Models = require("../classes/classModel");
const sch = require("../schemas/subscribers");
const { generate } = require("../helpers/randGen");

class SubscribersModel extends Models{
    constructor(){
        super(sch)
    }

    doConvertParam(body){
        return body
    }

    insert_result(resp){
        return resp
    }

    async save(body){
        console.log({body});

        const data = await this.model.findOne({ email: body.email })
        if (data) {
            return { status: 500, message: "Your email is already subscribe!"}
        }
        const obj = {...body}
        let insert = await this.model.create(this.doConvertParam(obj))

        return { status: 200, message: "Thank You for Your Support"}
    }
    
}

module.exports=SubscribersModel