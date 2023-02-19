import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import "./App.css";

const SERVER_URL = 'http://localhost:3001';
const password = "0147258369"
let socket = io(SERVER_URL,{
  auth: {
    password,
  },
})

function App() {
  const [details,setDetail] = useState({})
  const [showChat,setChat] = useState(false)
  function handleChange(e){
    let {name,value} = e.target
    setDetail({...details,[name]:value})
  }

  let joinRoom = ()=>{
    let {username, room} = details
    if(username !== "" && room !== ""){
      socket.emit("join_room",room)
      setChat(true)
    }
  }
  return (
    <div className="App">
    { !showChat ?
    (<div className='joinChatContainer'>
    <h3>Join A Chat</h3>
    <input type="text" onChange={handleChange} name="username" placeholder='name' />
    <input type="text" onChange={handleChange} name="room" placeholder='Room ID' />
    <button onClick={joinRoom}>Join Room</button>
    </div>)
:(<Chat socket={socket} username={details.username} room={details.room} />)
    }
    </div>
  )}

export default App;