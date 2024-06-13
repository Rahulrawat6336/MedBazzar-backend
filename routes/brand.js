var express=require('express')
var pool= require('./pool')
var upload =require('./multer')
var router=express.Router()

router.post('/submit_brand',upload.single('brandicon'),function(req,res,next){
    try{
        pool.query("insert into brand(brandname,brandicon) values(?,?)",[req.body.brandname,req.file.filename],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'brand submit Successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
    }
})

router.get('/display_all_brand',function(req,res,next){
    try{
        pool.query("select* from brand where brandid!=0",function(error,result){
            if(error){
                console.log('bbbbbbb',error)
            res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'Success',data:result})
                console.log("result",result)
            }
            
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})
router.post('/edit_brand_data',function(req,res){
    try{
        pool.query('update brand set brandname=?  where brandid=?',[req.body.brandname,req.body.brandid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'brand update successfully'})
                console.log("result",result)
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
    }
})
router.post('/edit_brand_picture',upload.single('brandicon'),function(req,res){
    try{
        pool.query('update brand set brandicon=?  where brandid=?',[req.file.filename,req.body.brandid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'brandicon update successfully'})
                console.log("result",result)
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
    }
})
router.post('/Delete_brand_data',function(req,res,next){
    try{
        pool.query("delete from brand where brandid=?",[req.body.brandid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'brand delete successfully'})
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