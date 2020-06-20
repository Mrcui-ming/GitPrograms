const MGchars = require("../mongdb/MGchars");
module.exports = function (server) {

  const io = require('socket.io').listen(server);

  io.on('connection', socket => {
    socket.on('sendMsg', ({from,to,content}) => {
      console.log('客户端已经连接...');
      //处理数据（保存消息） 准备chatMsg对象的相关信息
      const chat_id = [from,to].sort().join("_");
      const create_time = Date.now();
      
      new MGchars({from,to,content,chat_id,create_time}).save().then(data => {
        io.emit("receiveMsg",data);
      })
    })
  })

}