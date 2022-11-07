const route = require('express').Router()
const clipboardModel = require('../model/model.clipboard')

route.post('/addMessage', async (req, res)=>{
    /*
    {
        message: "",
    }
    */

    console.log(req.body);
    try{
        var result = await clipboardModel.addMessage(req.body);
        
        res.status(201).send({
            code: result
        });
    }catch(err){
        if(err == 'No Data Found'){
            res.status(400).send({
                error: "No Data Found"
            })
        }else{
            res.status(500).send({
                error: "Some internal error occured"
            });
        }
    }
})

route.get('/getMessage/:id', async (req, res)=>{
    /*
    {
        code: ""
    }
    */
    console.log(req.params);
    try{
        var result = await clipboardModel.getMessage(req.params);
        console.log(result)
        if(result.data == null){
            res.status(404).send({
                error: "No Data Found"
            })
        }else{
            res.status(200).send({
                message: result.data
            });
        }
    }catch(err){
        if(err == 'No Data Found'){
            res.status(400).send({
                error: "No Data Found"
            })
        }else{
            res.status(500).send({
                error: "Some internal error occured"
            });
        }
    }
})

module.exports = route;