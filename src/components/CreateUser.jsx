import { useState } from 'react'

export function CreateUser ({ setUser, socket }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (username !== '') {
      setUser(username)
      socket.emit('newUser', { username, id: socket.id })
    } else {
      alert('Ingrese un nombre de usuario')
    }
  }

  return (
    <form
      className='bg-[#2f6cdd46] w-[600px] h-[70vh] text-center pt-20 rounded-xl'
      onSubmit={handleSubmit}
    >
      <label className='block my-2'>Username</label>
      <input
        type='text'
        className='block w-9/12 m-auto px-0 py-2 text-black my-2 text-center focus:outline-none focus:ring-4'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type='submit' className='block bg-[#12213d] w-9/12 m-auto px-20 py-2'>Log in</button>
    </form>
  )
}
