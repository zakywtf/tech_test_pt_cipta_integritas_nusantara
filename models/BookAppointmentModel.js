const Models = require("../classes/classModel");
const sch = require("../schemas/book_appointment");
const { generate } = require("../helpers/randGen");

class BookAppointmentModel extends Models{
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
        // console.log({body});
        const obj = {...body}
        let insert = await this.model.create(this.doConvertParam(obj))

        return { status: 200, message: "Your message was successfully sent. Wait for further confirmation from the beehive drones team. Thank You"}
    }
    
}

module.exports=BookAppointmentModel