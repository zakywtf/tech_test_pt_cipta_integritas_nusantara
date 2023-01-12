const fetch = require("node-fetch")
const base64 = require("base-64")
const moment = require("moment-timezone")

const Payment = require("../schemas/payments")

const sendRequestToMidtrans = async (obj) => {
    const base = base64.encode(`${process.env.MIDTRANS_SERVER_KEY}:`)
    
    const options = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${base}`
        }
    }
    const resp = await fetch(process.env.MIDTRANS_TRANSACTION_URL, options).then(resp=>resp.json()).then(json=>json).catch(error=>error);
    // console.log({resp});
    return resp;
}

const cakllbackFromMidtrans = async (body) => {
    const { order_id, transaction_status } = body

    const payment = await Payment.findOne({ invoice: order_id })
    if (payment.midtrans_details == null) {
        var resp = await checkTransaction(body, transaction_status)
    } else {
        var resp = null
    }

    return resp
}

const updatePayment = async (status, obj) => {
    var payment = await Payment.findOne({ invoice: obj.order_id })
    payment.status = status
    payment.payment_type = obj.payment_type
    payment.updated_at = moment()
    payment.midtrans_details = obj
    await payment.save()

    return payment
}

const checkTransaction = async (body, status) => {
    switch (status) {
        case 'settlement': 
                var resp = await updatePayment(status='accept', body)               
            break;
        
        case 'expire':
                var resp = await updatePayment(status='expired', body)        
            break;
    
        default:
            break;
    }

    return resp

}

module.exports = {
    sendRequestToMidtrans,
    cakllbackFromMidtrans,
    checkTransaction
}