let express = require('express')
let cors = require('cors')
let app = express()
let http = require("http")
let server = http.createServer(app)
let socketIO = require('socket.io')
app.use(cors())

let io = socketIO(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
})

io.use((socket, next) => {
  const password = socket.handshake.auth.password;
  if (password === "0147258369") {
    return next();
  }
  return next(new Error('Unauthorized'));
});

io.on("connection",(socket)=>{
  console.log("user connected",socket.id)

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log("User with id:",socket.id,"joined room:",data)
  })

  socket.on("send_message",(data)=>{
    // console.log(data)
    socket.to(data.room).emit("receive_message",data)
  })




  socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
  })
})

// const PORT = 3001;
server.listen(3001, () => {
  console.log(`Server listening on port 3001`);
});
module.exports = {app, server, io}

