const midtransClient = require('midtrans-client');

const create = async (req, res) => {
    let parameter = {
        "transaction_details": {
            "order_id": req.body.order_id,
            "gross_amount": req.body.amount
        }, "credit_card":{
            "secure" : true
        }
    };
    
    let coreApi = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'SB-Mid-server',
        clientKey : 'SB-Mid-client'
    });
    
    coreApi.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            let transactionToken = transaction.token;
            console.log('transactionToken:',transactionToken);

            res.status(200).send({
                status:"Success",
                token: transactionToken
            })
    }).catch(e=> {
        console.log(e)
    })

}

const callback = async (req, res) => {
    console.log(req.body)

    res.status(200).send({
        "status": "success"
    })
}

module.exports = {
    create,
    callback
}