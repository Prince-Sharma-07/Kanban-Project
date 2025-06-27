import { useState } from 'react'
import { useSelector } from 'react-redux'
import CreateBoard from '../Components/CreateBoard'
import BoardCard from '../Components/BoardCard'
import Header from '../Components/Header'

export default function Home() {

  const [open, setOpen] = useState(false)
  const boards = useSelector((state) => state.Boards)

  function handleOpenClose() {
    setOpen(!open)
  }

  return (
    <div className='flex flex-col items-center gap-4 w-full h-screen bg-gray-200'>
      {open ? <CreateBoard handleOpenClose={handleOpenClose} /> : null}
      <Header />
      <button onClick={() => handleOpenClose()}
        className='bg-blue-400 font-[500] lg:text-md p-1 px-2 lg:p-1.5 lg:px-3 xl:p-2 xl:px-4 cursor-pointer rounded-lg'
      >Add a Board
      </button>
      <span className='text-xl font-[700]'>Your Boards: </span>
      <hr className=' w-[82%]' />
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[80%] justify-between'>
        {boards.length ? boards?.map(({ board_id, title, color, stage, description }) => <BoardCard key={board_id} board_id={board_id} title={title} color={color} stage={stage} description={description} />) : <div className='text-lg text-center'>No Boards Available...</div>}
      </ul>
    </div>
  )

}

