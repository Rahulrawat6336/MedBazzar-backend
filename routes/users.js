
/* GET users listing. */
var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.post('/submit_user', function(req, res, next) {
  try{
    pool.query("insert into userdata (mobileno,emailid,username) values(?,?,?)",[req.body.mobileno,req.body.emailid,req.body.username],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  
      var data=JSON.parse(localStorage.getItem('USER'))
        res.status(200).json({status:true,message:'User Submitted Successfully...',data:data})

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});


router.post('/check_userdata', function(req, res, next) {
  try{
    pool.query("select * from userdata  where mobileno=?",[req.body.mobileno],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  if(result.length==1){
      localStorage.setItem('USER',JSON.stringify(result[0]))
        res.status(200).json({status:true,data:result[0],message:'User found...'})
     }
        else
        {
        res.status(200).json({status:false,data:[],message:'User found...'})
        }

        

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});

router.post('/check_user_address', function(req, res, next) {
  try{
    console.log("user",req.body)
    pool.query("select * from address  where mobileno=?",[req.body.mobileno],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  if(result.length>=1)
        res.status(200).json({status:true,data:result,message:'User found...'})
        else
        res.status(200).json({status:false,data:[],message:'User found...'})

        

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});




router.post('/submit_user_address', function(req, res, next) {
  try{
    console.log("user",req.body)
    pool.query("insert into address (mobileno,address,landmark,pincode,state,city) values(?,?,?,?,?,?)",[req.body.mobileno,req.body.address,req.body.landmark,req.body.pincode,req.body.state,req.body.city],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  
        res.status(200).json({status:true,message:'Address Submitted Succesfully...'})
        

        

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});


router.post('/delete_user_address', function(req, res, next) {
  try{
    console.log("user",req.body)
    pool.query("delete from address  where addressid=?",[req.body.addressid],function(error,result){
     if(error)
     {  console.log('aaaaa',error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  
        
        res.status(200).json({status:true,data:result,message:'successfully delete'})
        console.log("result",result)

        

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});

// router.post('/save_orders', function(req, res, next) {
//   try{
//     console.log("user",req.body)
//     pool.query("insert into orders (userid,mobileno,emailid,orderdate,paymentid,paymentstatus) values(?,?,?,?,?,?)",[req.body.userid,req.body.mobileno,req.body.emailid,new Date().toString(),req.body.paymentid,req.body.paymentstatus],function(error,result){
//      if(error)
//      {  console.log(error)
//          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
//      else
//      {
//         res.status(200).json({status:true,message:'Address Submitted Successfully...'})
//         console.log(result)
//         pool.query("insert into orderdetail( orderid, productdetailid, price, offerprice, qty,productname) values ?",[req.body.orderlist?.map((item)=>{

//          return [result.insertId,item.productdetailid, item.price, item.offerprice, item.qty,item.productname,]

//         })],function(error,result){

//           if(error)
//           {  console.log(error)
//               res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
//           else
//           {
//              res.status(200).json({status:true,message:'Address Submitted Successfully...'})
//           }

//         })

//      }
    
//     })



//   }
//   catch(e)
//   {
//     console.log('Error:',e)
//     res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
//   }

// });

router.post('/save_orders',upload.single('picture'),  function (req, res, next) {
  try {
      console.log("user", req.body);
      pool.query("insert into orders (userid, mobileno, emailid, orderdate, paymentid, paymentstatus) values (?, ?, ?, ?, ?, ?)", [req.body.userid,req.body.mobileno, req.body.emailid, new Date().toString(), req.body.paymentid, req.body.paymentstatus], function (error, result) {
          if (error) {
              console.log(error);
              res.status(500).json({ status: false, message: 'Server Error: Please Contact Database Administrator...' });
          } else {

            console.log("dataaaaa1", req.body);
              pool.query("insert into orderdetail (orderid, productdetailid, price, offerprice, qty, productname,paidamount,picture) values ?", [req.body.orderlist?.map((item) => {
                  return [result.insertId, item.productdetailid, item.price, item.offerprice, item.qty, item.productname,item.paidamount,item.picture];
              })], function (error, result) {
                  if (error) {
                      console.log(error);
                      res.status(500).json({ status: false, message: 'Server Error: Please Contact Database Administrator...' });
                  } else {
                      res.status(200).json({ status: true, message: 'Address Submitted Successfully...' });
                  }
              });
          }
      });
  } catch (e) {
      console.log('Error:', e);
      res.status(500).json({ status: false, message: 'Server Error: Please Contact Server Administrator...' });
  }
});





module.exports = router;
