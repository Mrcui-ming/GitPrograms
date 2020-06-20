const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//引入集合对象
const  Schema = mongoose.Schema;

//创建集合结构
const MGchars = new Schema({
   //发送方
   from: {type: String,required: true},
   //接收方
   to: {type: String,required: true},
   //发送和接收整合起来的字符串
   chat_id: {type: String,required: true},
   //发送的内容
   content: {type: String,required: true},
   //是否为已读
   read: {type: Boolean,default: false},
   //发送的事件
   create_time: {type: Number}
});

//依照集合结构创建集合
module.exports =  mongoose.model('Char', MGchars);