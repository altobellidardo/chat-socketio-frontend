import { useRef, useEffect } from 'react'
import { Message } from './Message'

export function ChatWindow ({ messages, socket, activeUser }) {
  const msgInput = useRef(null)
  const chatWindow = useRef(null)

  useEffect(() => {
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight
  }, [messages])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (msgInput.current.value !== '') {
      socket.emit('newMsg', {
        userid: socket.id,
        username: activeUser,
        message: msgInput.current.value
      })
      msgInput.current.value = ''
    }
  }

  return (
    <>
      <main>
        <div className='w-[600px] h-[70vh] border-4 border-[#2f6cdd46] my-2 bg-[#2f6cdd13] overflow-y-auto rounded-md' ref={chatWindow}>
          {
            messages.length === 0
              ? <p className='text-center font-bold my-5'>No hay mensajes disponibles</p>
              : messages.map((msg, index) => {
                const yours = msg.username === activeUser
                const first = index === 0 || messages[index - 1].username !== messages[index].username

                return (
                  <Message key={msg.id} username={msg.username} text={msg.message} first={first} yours={yours} />
                )
              })
          }
        </div>
      </main>

      <footer className='w-full'>
        <form onSubmit={handleSubmit} className='w-full flex align-middle justify-center'>
          <input
            ref={msgInput}
            type='text'
            placeholder='Type a message'
            className='w-[510px] border-none py-3 px-5 rounded-md text-black focus:outline-none focus:ring-4'
          />
          <button
            type='submit'
            className='bg-[#2f6cdd] text-xl h-12 border-none px-3 ml-2 rounded-md'
          >
            Send
          </button>
        </form>
      </footer>
    </>
  )
}
