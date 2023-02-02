import './App.css';
import  io  from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001")

function App() {
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", {message,room})
  }

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      // alert(data.message)
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <h1>{room}</h1>
      <input onChange={(e)=>setRoom(e.target.value)} placeholder='Join Room ...'/>
      <button onClick={joinRoom}>Join</button>
      <input onChange={(e)=>setMessage(e.target.value)} placeholder='Message...'/>
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message</h2>
      <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
