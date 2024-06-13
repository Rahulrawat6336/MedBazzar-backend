var express = require('express');
var router = express.Router();
var pool= require('./pool');
const upload = require('./multer');

router.post('/submit_banners',upload.any(),function(req,res,next){
    try{
        console.log('files',req.files)
        var files=req.files.map((item)=>{
            return(item.filename)
        })
        pool.query("insert into banners(bannertype,brandid,picture) values(?,?,?)",[req.body.bannertype,req.body.brandid,files+""],function(error,result){
            if(error){
                 console.log("Error",error)
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... 1'})
            }
            else{
                res.status(200).json({status:true,message:'subcategory submit successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator...2 '})
        console.log("Error",error)
    }
})

module.exports=router