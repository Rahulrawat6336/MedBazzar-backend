var express = require('express')
var router= express.Router()
var pool= require('./pool')
var upload=require('./multer')

router.post('/submit_category',upload.single('picture'),function(req,res,next){
    try{
        pool.query("insert into category(categoryname,picture) values(?,?)",[req.body.categoryname,req.file.filename],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'category submit successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.get('/display_all_category',function(req,res){
    try{
        pool.query("select* from category",function(error,result){
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


router.post('/Edit_category_data',function(req,res,next){
    try{
        pool.query("update category set categoryname=? where categoryid=? ",[req.body.categoryname,req.body.categoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'category update successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.post('/Edit_category_picture',upload.single('picture'),function(req,res,next){
    try{
        pool.query("update category set picture=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'picture update successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.post('/Delete_category_data',function(req,res,next){
    try{
        pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'category delete successfully'})
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
