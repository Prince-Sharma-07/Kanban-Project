import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CreateStage from './CreateStage'
import { useSelector } from 'react-redux'
import Stage from './Stage'

export default function Board() {
  const [openStage, setOpenStage] = useState(false)
  const { boardId = '' } = useParams()

  const navigate = useNavigate()

  const boards = useSelector(state => state.Boards)


  const {
    title = "",
    color = "",
    stages = []
  } = boards.find(({ board_id }) => board_id === boardId) ?? {}

  useEffect(() => {
    if (boardId?.length <= 0) navigate('/')
  }, [boardId, navigate])

  function handleCreateStageOpenClose() {
    setOpenStage(!openStage)
  }

  return (
    <div className='w-full flex items-center flex-col gap-2.5 p-4 px-8 h-fit min-h-screen max-h-fit' style={{ backgroundColor: color + '50' }}>
      {openStage ? <CreateStage handleCreateStageOpenClose={handleCreateStageOpenClose} boardId={boardId} /> : null}

      <h1 style={{ color: color === '#ffffff' ? 'black' : color }} className='text-3xl font-[700] flex items-center justify-center p-2 px-8 capitalize w-fit rounded-2xl'>Board: {title}</h1>

      <Stage stages={stages} boardId={boardId} handleCreateStageOpenClose={handleCreateStageOpenClose} />
    </div>
  )
}

