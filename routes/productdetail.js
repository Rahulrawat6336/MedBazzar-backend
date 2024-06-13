var express=require('express')
var pool= require('./pool')
var upload =require('./multer')
var router=express.Router()

router.post('/submit_productdetail',upload.any(),function(req,res,next){
    try{
      console.log("files",req.files)
      var files=req.files.map((item)=>{
        return item.filename
      })
        pool.query("insert into productdetail(categoryid,subcategoryid,brandid,productid,productsubname,description,weight,weighttype,type,packaging,quantity,price,offerprice,offertype,picture,concernid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.quantity,req.body.price,req.body.offerprice,req.body.offertype,files+",",req.body.concernid],function(error,result){
            if(error){
              console.log('error',error)
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator...1 '})
            }
            else{
                res.status(200).json({status:true,message:'productdetail submit Successfully'})
                console.log("result",result)
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error:2 Please contact database administrator...2 '})
        console.log('eeeee',e)
    }
})


router.get('/display_all_productdetail',function(req,res){
    try{
        pool.query("select p.*,(select pt.productname from product pt where pt.productid=p.productid) as productname,(select c.categoryname from category c where c.categoryid=p.categoryid) as categoryname,(select s.subcategoryname from subcategory s where s.subcategoryid=p.subcategoryid) as subcategoryname,(select b.brandname from brand b where b.brandid=p.brandid) as brandname from productdetail p",function(error,result){
            if(error){
              console.log('aaaaaa',error)
                res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
            }
            else{
                res.status(200).json({status:true,message:'success',data:result})
                console.log("errr111",result)
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error: Please contact database administrator... '})
        console.log("Error",error)
    }

})


router.post('/edit_productdetail_data',function(req, res, next) {
    try{
      pool.query("update productdetail set categoryid=?, subcategoryid=?, brandid=?, productid=?, productsubname=?, weight=?, weighttype=?, type=?, packaging=?, quantity=?, price=?, offerprice=?, offertype=?, description=?, concernid=? where productdetailid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.productsubname,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.quantity,req.body.price,req.body.offerprice,req.body.offertype,req.body.description,req.body.concernid,req.body.productdetailid],function(error,result){
       if(error)
       {  console.log( 'aaaaa',error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Productdetail Updated successfully'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });
  
  
  router.post('/edit_productdetail_picture',upload.single('picture'), function(req, res, next) {
    try{
      pool.query("update productdetail set picture=? where productdetailid=?",[req.file.filename,req.body.productdetailid],function(error,result){
       if(error)
       {  
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...1'})}
       else
       {
          res.status(200).json({status:true,message:'Picture Updated Successfully...'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...2'})
    }
  
  });
  
  
  
  router.post('/delete_productdetail_data', function(req, res, next) {
    try{
      pool.query("delete from productdetail where productdetailid=?",[req.body.productdetailid],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Productdetail Deleted Successfully...'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });
module.exports=router