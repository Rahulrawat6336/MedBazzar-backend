var express = require('express');
var router = express.Router();
var pool= require('./pool')




router.get('/show_all_order',function(req,res){
    try{
        pool.query("select* from orders",function(error,result){
            if(error){
                console.log('cccccc',error)
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'success',data:result})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }

})

router.post('/show_all_orderdetails',function(req,res){
    try{
        pool.query("select* from orderdetail where orderid=?",[req.body.orderid],function(error,result){
            if(error){
                console.log('cccccc',error)
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'success',data:result})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }

})



module.exports=router