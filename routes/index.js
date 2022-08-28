const session = require("express-session");

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

module.exports = (app)=>{
    app.get('/',(req,res)=>{
        if(session.userid){
            res.statusCode(200).send("Welcome User <a href=\'/logout'>Click to logout</a>");
        } else{
            res.statusCode = 200;
            res.setHeader('Content-type','text/html');
            res.end('<h1>Ola mundo, redondo e azul</h1>');
        }        
    });
}



