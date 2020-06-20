const express = require("express");
const app = express();
const port  = 3001;

//socket需要的服务器
var server = require("http").createServer(app);
require("./socketIO/test")(server);

const bodyParser = require('body-parser')


const router = require("./router");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

 
app.use(router);


server.listen(port,()=>{
  console.log('runing...');
  
});