var express = require('express');
var router = express.Router();
var pool= require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var data =JSON.parse(localStorage.getItem('USER'))


router.post('/show_all_banners',function(req,res){
    try{
        var data =JSON.parse(localStorage.getItem('USER'))
        pool.query("select* from banners where bannertype=?",[req.body.bannertype],function(error,result){
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


router.get('/show_all_brand',function(req,res){
    try{
        var data =JSON.parse(localStorage.getItem('ADMIN'))
        pool.query("select* from brand where brandid!=0",function(error,result){
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
router.get('/show_all_category',function(req,res){
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

router.get('/display_all_brand',function(req,res){
    try{
        var data =JSON.parse(localStorage.getItem('USER'))
        pool.query("select* from brand  where brandid!=0",function(error,result){
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

router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
    try{
        var data =JSON.parse(localStorage.getItem('USER'))
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


router.post('/display_all_productdetail_by_offer',function(req,res){
    try{
        var data =JSON.parse(localStorage.getItem('USER'))
        pool.query("select p.*,pr.*,p.picture as multi_picture,p.description as pd_description,(select c.categoryname from category c where c.categoryid=p.categoryid) as categoryname,(select s.subcategoryname from subcategory s where s.subcategoryid=p.subcategoryid) as subcategoryname,(select b.brandname from brand b where b.brandid=p.brandid) as brandname,(select con.concernname from concern con where con.concernid=p.concernid)as concername from productdetail p,product pr where p.productid=pr.productid and p.offertype=?",[req.body.offertype],function(error,result){
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


router.get('/display_all_concern',function(req,res){
    try{
        var data =JSON.parse(localStorage.getItem('USER'))
      pool.query("select * from concern",function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {  console.log(result)
          res.status(200).json({status:true,message:'Success',data:result})
  
       }
      
      })
  
   }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
      
  })

  router.post('/display_all_productdetail_by_category',function(req,res){
    try{ 
        var data =JSON.parse(localStorage.getItem('USER'))
        
        console.log('bodddyy',req.body)

    // var pat= '%'+ req.body.pattern+'%'

    var q= "select p.*,pr.*,p.picture as multi_picture,p.description as pd_description,(select c.categoryname from category c where c.categoryid=p.categoryid) as categoryname,(select s.subcategoryname from subcategory s where s.subcategoryid=p.subcategoryid) as subcategoryname,(select b.brandname from brand b where b.brandid=p.brandid) as brandname,(select con.concernname from concern con where con.concernid=p.concernid)as concername from productdetail p,product pr where ( p.productid=pr.productid ) and (p.categoryid= "+ req.body.categoryid +"  or p.subcategoryid="+req.body.subcategoryid+" or pr.productname like '%"+req.body.pattern+"%')"


    console.log(q)
        pool.query(q,function(error,result){
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

module.exports=router