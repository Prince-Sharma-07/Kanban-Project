import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CreateStage from './CreateStage'
import CreateItem from './CreateItem'
import { useDispatch, useSelector } from 'react-redux'
import { moveItem } from '../features/boards/boardsSlice'


export default function Board() {
  const [openStage, setOpenStage] = useState(false)
  const [openItem, setOpenItem] = useState(false)
  const { boardId = '' } = useParams()
  const [stageId, setStageId] = useState('')
  const [transferData, setTransferData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { boards } = JSON.parse(localStorage.getItem('kanban')) ?? defaultLocalData
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

  function handleCreateItemOpenClose(stageId) {
    setStageId(stageId)
    setOpenItem(!openItem)
  }

  return (
    <div className='w-full flex items-center flex-col gap-2.5 p-4 px-8 h-fit min-h-screen max-h-fit' style={{ backgroundColor: color + '50' }}>
      {openStage ? <CreateStage handleCreateStageOpenClose={handleCreateStageOpenClose} boardId={boardId} /> : null}
      {openItem ? <CreateItem handleCreateItemOpenClose={handleCreateItemOpenClose} boardId={boardId} stageId={stageId} /> : null}

      <h1 style={{ color: color === '#ffffff' ? 'black' : color }} className='text-3xl font-[700] flex items-center justify-center p-2 px-8 capitalize w-fit rounded-2xl'>Board: {title}</h1>

      <div className='stages grid max-xs:grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-full gap-8 p-4 bg-white/50 rounded-2xl shadow-[0px_0px_5px_5px_rgba(0,0,0,0.25)]'>
        {stages?.map((stage, i) =>
          <div 
          onDragOver={e=>e.preventDefault()}
          onDragEnter={()=>{
              setTransferData(prev=>({
                ...prev,
                receiverStageId: stage.stage_id
              }))
          }}
          onDrop={()=>{
            dispatch(moveItem(transferData))
            setTransferData({})
          }}
          className='stage flex flex-col w-full border-2 rounded-2xl bg-white h-150 p-3 px-4 gap-4'>
            <div className='flex justify-between w-full items-center'>
              <h1 className='text-2xl font-[700] truncate'>{(stage.label ?? '').trim() === '' ? 'Stage' + ++i : stage.label}</h1>
              {stage.items.length < 10 ? <button onClick={() => handleCreateItemOpenClose(stage.stage_id)} className='bg-blue-400 px-2 p-1 rounded-md w-fit cursor-pointer'>+Item</button> : null}
            </div>

            <div className='flex flex-col gap-3 overflow-auto scrollbar-hidden h-[85%]'>
              {stage?.items?.map((item) =>
                <ul
                  draggable
                  onDragOver={e => e.stopPropagation()}
                  onDragStart={(e) => {
                    e.stopPropagation()
                    setTransferData(
                      () => ({
                          receiverStageId: null,
                          boardId: boardId,
                          senderStageId: stage?.stage_id,
                          itemId: item?.item_id
                        }))
                      }}
                  key = {item.item_id}
                  className='flex bg-amber-100 text-md xl:text-[17px] flex-col p-2 gap-2 rounded-lg shadow '>
                  <li className='line-clamp-2 '><strong className='font-[500]'>Title: </strong>{item.title}</li>
                  <li className='line-clamp-3 '><strong className='font-[500]'>Description: </strong> {item.description}</li>
                  <li className='truncate'><strong className='font-[500]'>CreatedBy: </strong > {item.creator}</li>
                  <li><strong className='font-[500]'>Priority: </strong>{item.priority}</li>
                  <hr />
                  <span className='flex flex-col leading-2'>
                    <li className='text-xs'><strong className='font-[500]'>CreatedAt:-</strong> {item.createdAt}</li>
                    <li className='text-xs'><strong className='font-[500]'>UpdatedAt:-</strong> {item.updatedAt}</li>
                  </span>
                </ul>
              )}
            </div>
            <div className='w-full flex justify-between m-auto text-lg'>
              <span>Total Items: {stage.items.length}</span>
              <span>Max Items: 10</span>
            </div>
          </div>
        )}
        {stages.length < 4 ? <button className='bg-blue-400 px-2 p-1 rounded-md w-fit h-fit cursor-pointer' onClick={handleCreateStageOpenClose}>+Stage</button> : null}
      </div>
    </div>
  )
}

