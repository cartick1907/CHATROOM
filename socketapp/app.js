const express = require ('express');
const app= express();
const path = require('path');
const port = 3000;
const server = require('http').createServer(app);
const io = require("socket.io")(server);
// const {errorHandler} = require
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(errorHandler);
app.get('/',(req,res)=>{
  res.render('home');
})

app.get('/room',(req,res)=>{
  console.log(req.query)
  res.render('chat' ,{title:"CHATROOM" ,name:req.query['user']});
})

server.listen(port,()=>{
  console.log(`server running on port: ${port}` );
})

io.on('connection', (Socket)=>{

  Socket.on('message', (data) => {
    Socket.emit('message',data);
    Socket.broadcast.emit('message',data);
  })
  console.log('user connected : ' + Socket.id);
})
