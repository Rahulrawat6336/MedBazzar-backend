var express = require('express')
var router= express.Router()
var pool= require('./pool')
var upload=require('./multer')

router.post('/submit_subcategory',upload.single('icon'),function(req,res,next){
    try{
        pool.query("insert into subcategory(categoryid,subcategoryname,icon) values(?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.file.filename],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... 1'})
            }
            else{
                res.status(200).json({status:true,message:'subcategory submit successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.get('/display_all_subcategory',function(req,res){
    try{
        pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S",function(error,result){
            if(error){
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


router.post('/Edit_subcategory_data',function(req,res,next){
    try{
        pool.query("update subcategory set categoryid=? ,subcategoryname=? where subcategoryid=? ",[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator...1 '})
            }
            else{
                res.status(200).json({status:true,message:'subcategory update successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.post('/Edit_subcategory_picture',upload.single('icon'),function(req,res,next){
    try{
        pool.query("update subcategory set icon=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator...0 '})
            }
            else{
                res.status(200).json({status:true,message:'icon update successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.post('/Delete_subcategory_data',function(req,res,next){
    try{
        pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'subcategory delete successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})



router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
    try{
        pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
            if(error){
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
