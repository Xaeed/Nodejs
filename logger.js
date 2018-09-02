// here we will create a logger middle ware
 function  log( req,res,next)
 {
console.log('some data has been input ');
next();
 }

 function UserAuthenticaiton(req,res,next)
 {
   console.log('User has been authenticated');
   next();
 }
 module.exports= log;
 module.exports= UserAuthenticaiton;