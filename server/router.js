const express = require("express");
const router = express.Router();
const MGregister = require("./mongdb/MGregister");
const MGchars = require("./mongdb/MGchars");
const Validator = require("validator");
const isEmpty = require("lodash/isEmpty");
const md5 = require("blueimp-md5");
const filter = null;

function getCookie(cookie) {
    if(cookie.includes(";")){
        let activestate = cookie.split(";");
        if(activestate[0].includes("userid")){
            return cookie.split(";")[0].trim().split("=")[1].substr(7).split("%")[0];
        }else{
            return cookie.split(";")[1].trim().split("=")[1].substr(7).split("%")[0];
        }   
     }else{
        return  cookie.split("=")[1].substr(7).split("%")[0];
     } 
}

//注册的表单验证
const validator = (data) => {
   const errors = {}; 
   if(Validator.isEmpty(data.username)){
    errors.username = "用户名不能为空"
   }
   if(Validator.isEmpty(data.email)){
    errors.email = "邮箱不能为空"
   }
   if(Validator.isEmpty(data.password)){
    errors.password = "密码不能为空"
   }
   return {
            errors,
            isValid: isEmpty(errors)
        }
}

//登录的表单验证
const validatorlogin = (data) => {
    const errors = {}; 
    if(Validator.isEmpty(data.username)){
     errors.username = "用户名不能为空"
    }
    if(Validator.isEmpty(data.password)){
     errors.password = "密码不能为空"
    }
    if(Validator.isEmpty(data.definepassword)){
     errors.definepassword = "确认密码不能为空"
    }
    if(!Validator.equals(data.password,data.definepassword)){
     errors.definepassword = "俩次输入的密码不一致"
    }
    return {
             errors,
             isValid: isEmpty(errors)
         }
 }

 //注册的路由
router.post('/api/register',(req,res)=>{
    let body = req.body;
    let { errors,isValid } = validator(body);
    body.password = md5(md5(body.password));
    if(isValid){
        MGregister.findOne({
           $or : [
               {
                username: body.username,             
               },
               {
                email: body.email
               }
           ]
        }).then(data => {
            if(data){
                res.status(200).json({code:1,message:"用户名或邮箱已存在"})
            }else{
                //需要对密码加，等等做
                new MGregister(body).save().then(user => {
                    const {username,email,_id,type} = user;
                    const dataobj = {username,email,_id,type};
                    res.cookie("userid",user._id,{maxAge: 1000*60*60*24*7})
                    res.status(200).json({code:0,data: dataobj})
                })
            }
        })
    }else{
        res.status(200).json({...errors,code:1});
    }   
})


//登录的路由
router.post("/api/login",(req,res) => {
    let body = req.body; 
    const {errors,isValid} = validatorlogin(body);
    if(isValid){
        MGregister.findOne({
            username: body.username,
            password: md5(md5(body.password))
        }).then(user => {
            if(user){           
                res.cookie("userid",user._id,{maxAge: 1000*60*60*24*7})
                res.status(200).json({code:0,data: user})
            }else{
                
                res.status(200).json({code:1,message: "用户名或密码错误"})
            }
        })
    }else{
        res.status(200).json({...errors,code:1});
    }
})

//完善信息的路由
router.post("/api/perfect",(req,res) => {
    const user = req.body;
    //由于保存到cookie里面的数据自动加密了 所以我们要自己取值。
    const cookie = req.headers.cookie;
    if(!cookie){
        res.status(200).json({code: 1,message: "请先登录"})
    }else{
        let userid = getCookie(cookie);
        MGregister.findByIdAndUpdate(userid,user).then(data => {
            if(!data){
                res.clearCookie("userid");
                res.status(200).json({code: 1,message: "请先登录"})
            }else{
                let {_id,username,type} = data;
                let users = Object.assign(user,{_id,username,type});
                res.status(200).json({code: 0,data: users})
            }
        },err => {
            res.status(500).json({err: "服务端错误"})
        })
    }
})

//获取用户信息的路由
router.get("/api/user",(req,res) => {
    const cookie = req.headers.cookie;
    if(cookie){
        let userid = getCookie(cookie);
        MGregister.findByIdAndUpdate(userid).then(data => {
            //不想把密码给前端返回,所以过滤一下
            data.password = filter;        
            res.status(200).json({"code": "0","data": data});
        },err => {
            res.status(500).json({err: "服务端错误"})
        })
    }else{
        res.status(200).json({code: "1",message: "请先登录"})
    }
})

//获取boss/jobhunter用户列表
router.get("/api/userlist",(req,res) => {
    const { type } = req.query;
    MGregister.find({
        type: type
    }).then(data => {  
        res.status(200).json({code: "0",data: data});
    },err => {
        res.status(500).json({err: "服务端出错!"})
    })
})

//实现聊天功能的路由
router.get("/api/msglist",(req,res) => {
    const cookie = req.headers.cookie;
    let userid = getCookie(cookie);
    //查询得到所有的user文档数组
    MGregister.find().then(userDocs => {
        //用对象储存所有的user信息，key为user的_id，val为name和header组成的user对象
        const users = {};
        userDocs.forEach(doc => {
            users[doc._id] = {username: doc.username,header: doc.header}
        })
        //查询与（userid当前用户）相关的所有聊天信息
        MGchars.find({
            "$or": [
                {from: userid},
                {to: userid}
            ]
        }).then(chatMsgs =>{
            chatMsgs.password = filter;
            res.status(200).json({code: "0",data: {users, chatMsgs}})
        })
    })
})

//修改指定消息为已读
router.post("/api/readmsg",(req,res) => {
    //传递过来from
    const from = req.body.from;
    //当前用户id
    const to = getCookie(req.headers.cookie);
    console.log(from,to);
    
    MGchars.update({from,to, read: false},{read: true},{multi: true}).then(data => {
        //返回更新的条数
        res.status(200).json({code: "0",data: data.nModified})
    })
})

module.exports = router;