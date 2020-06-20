const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const  Schema = mongoose.Schema;

const masterSchema = new Schema({
    username:{type: String,required: true}, //用户名
    email:{type: String,required: true},  //邮箱
    password:{type: String,required: true}, //密码
    type:{type: String,required: true}, //用户类型
    header:{type: String},  //头像名称
    post:{type: String},   //职位
    info:{type: String},  //个人或公司简介
    company:{type: String}, //公司名称
    salary:{type: String} //月薪
});

module.exports =  mongoose.model('Master', masterSchema);