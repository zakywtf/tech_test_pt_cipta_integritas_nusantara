const Models = require("../classes/classModel");
const sch = require("../schemas/payments");
const { generate } = require("../helpers/randGen");
const { sendRequestToMidtrans } = require("../helpers/masterFunction")

class PaymentsModel extends Models{
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
        console.log({ body });
        
        const obj = {...body}
        let insert = await this.model.create(this.doConvertParam(obj))

        var payments = {
            "transaction_details": {
                "order_id": body.invoice,
                "gross_amount": body.total_price
            },
            "customer_details": {
                "first_name" : body.customer_details.first_name,
                "email": body.customer_details.email,
                "phone": body.customer_details.phone
            }
        }
        
        const resp = await sendRequestToMidtrans(payments)

        return this.insert_result(resp)
    }

    
}

module.exports=PaymentsModel