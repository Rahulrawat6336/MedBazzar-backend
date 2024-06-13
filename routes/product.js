var express=require('express')
var pool= require('./pool')
var upload =require('./multer')
var router=express.Router()

router.post('/submit_product',upload.single('picture'),function(req,res,next){
    try{
        pool.query("insert into product(categoryid,subcategoryid,brandid,productname,description,picture) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.file.filename],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator...1 '})
                console.log('errorrr',error)
            }
            else{
                res.status(200).json({status:true,message:'product submit Successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log('Errrr',error)
    }
})

router.get('/display_all_product',function(req,res,next){
    try{
        pool.query("select p.*,(select c.categoryname from category c where c.categoryid=p.categoryid) as categoryname,(select s.subcategoryname from subcategory s where s.subcategoryid=p.subcategoryid) as subcategoryname,(select b.brandname from brand b where b.brandid=p.brandid) as brandname from product p",function(error,result){
            if(error){
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
router.post('/edit_product_data',function(req,res){
    try{
        pool.query('update product set categoryid=?,subcategoryid=?,brandid=?, productname=? ,description=?  where productid=?',[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.productid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator...1 '})
            }
            else{
                res.status(200).json({status:true,message:'product update successfully'})
                console.log("result",result)
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
    }
})
router.post('/edit_product_picture',upload.single('picture'),function(req,res){
    try{
        pool.query('update product set picture=?  where productid=?',[req.file.filename,req.body.productid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator...1 '})
            }
            else{
                res.status(200).json({status:true,message:'picture update successfully'})
                console.log("result",result)
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
    }
})
router.post('/Delete_product_data',function(req,res,next){
    try{
        pool.query("delete from product where productid=?",[req.body.productid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'product delete successfully'})
                console.log("result",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }
})

router.post('/fetch_all_product_by_brandid', function(req,res){
    try{
        pool.query('select * from product where brandid=?',[req.body.brandid],function(error,result){
            if(error){
                console.log('pb',error)
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