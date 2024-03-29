const route = require('express').Router()
const userArrivalModel = require('../model/model.user_arrival');

route.get('/', async (req, res)=>{
    const ipAddress = req.socket.remoteAddress;
    // console.log(`controller.user_arrival: date: ${date}, ip address: ${ipAddress}`);
    
    try{
        console.time('User Arrival');
        await userArrivalModel.registerUser(ipAddress);
        console.timeEnd('User Arrival')
        res.status(200).send({"status": true})
    }catch(err){
        res.status(500).send({"status": false})
    }
})

module.exports = route;