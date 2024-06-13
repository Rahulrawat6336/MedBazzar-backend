var mysql=require('mysql')
var pool=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'medbazzar',
    password:'Rahul@1234',
    multipleStatements:true,
})
module.exports=pool;