export function Message ({ username, text, first, yours }) {
  const firstClass = first ? 'mt-3' : 'mt-0'
  const yoursClass = yours ? 'text-right bg-[#254786] px-2' : 'text-left bg-[#2f6cdd] pl-2 pr-5'

  const renderUsername = first && !yours ? <small className='opacity-75'>{username}</small> : ''

  return (
    <div className={`w-full ${yours ? 'flex justify-end' : ''}`}>
      <div className={`mx-2 w-fit py-1 rounded-md mb-1 ${firstClass} ${yoursClass}`}>
        {renderUsername}
        <p className='leading-4'>{text}</p>
      </div>
    </div>
  )
}
