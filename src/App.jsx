import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { CreateUser } from './components/CreateUser'
import { ChatWindow } from './components/ChatWindow'

const socket = io('https://chat-socketio-backend-q2o1-dev.fl0.io/')

function App () {
  const [isConnected, setIsConected] = useState(false)
  const [userLogged, setUserLogged] = useState(null)
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    socket.on('connect', () => setIsConected(true))
    socket.on('msg', (data) => {
      setMessages((prevState) => [...prevState].concat(data))
    })
    socket.on('updateUsers', (data) => setOnlineUsers(data.quantity))
  }, [])

  return (
    <>
      <header className='text-center my-[10px]'>
        <h1 className='inline py-0 px-[20px] mt-[20px] font-bold text-xl'>
          <a href='/'>Chat</a>
        </h1>
        <h3 className='inline py-0 px-[20px] mt-[20px]'>
          State: {isConnected ? `Connected 🟢 ${onlineUsers}` : 'Disconnected 🔴'}
        </h3>
        {
          userLogged
            ? <h3 className='inline py-0 px-[20px] mt-[20px]'>{userLogged}</h3>
            : ''
        }
      </header>

      {
        userLogged === null
          ? <CreateUser setUser={setUserLogged} socket={socket} />
          : <ChatWindow messages={messages} socket={socket} activeUser={userLogged} />
      }

    </>
  )
}

export default App
