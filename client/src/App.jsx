//import libraries/components
import React, { useEffect } from 'react'
import{useState , useeffect} from 'react'
import io from 'socket.io-client'

//instances
const socket =io('http://localhost:5000/');

const App = () => {
  const [messages , setmessages] = useState([]);
  const [messageInput, setMessageInput] = useState('')

  useEffect(()=>{
    socket.on('messages', (messages)=>{
      setmessages([...messages, messages])
    })

    return ()=>{
      socket.off("mesages");
    }    

  },[messages]);
  const sendMessage=()=>{
    if (messageInput.trim() !== " "){
      socket.emit('message', messageInput);
      setMessageInput('');
    }
  }

  return (
    <>
      <h1>Campus Hive</h1>
      <input type="text" value ={messageInput}
         placeholder='Type your message...'
        onChange={(e)=>setMessageInput(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      {/* render all the messages  */}
      <section>

        {messages.map((message,index)=>(
          <div key={index}>{message}</div>
        ))}

      </section>


    </>
  )
}

export default App