import CreateItem from './CreateItem'
import { moveItem } from '../features/boards/boardsSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { removeStage, removeItem } from '../features/boards/boardsSlice'

export default function Stage({ stages, boardId, handleCreateStageOpenClose }) {
  const dispatch = useDispatch()
  const [transferData, setTransferData] = useState({})
  const [openItem, setOpenItem] = useState(false)
  const [seletedStageId, setSeletedStageId] = useState('')

  function handleCreateItemOpenClose(stageId) {
    setSeletedStageId(stageId)
    setOpenItem(!openItem)
  }

  function handleRemoveStage(stageId) {
    dispatch(removeStage({ boardId, stageId }))
  }

  function handleRemoveItem(stageId, itemId) {
    dispatch(removeItem({ boardId, stageId, itemId }))
  }

  return (
    <div className='stages grid max-xs:grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-full gap-8 p-4 bg-white/50 rounded-2xl shadow-[0px_0px_5px_5px_rgba(0,0,0,0.25)]'>
      {openItem ? <CreateItem handleCreateItemOpenClose={handleCreateItemOpenClose} boardId={boardId} stageId={seletedStageId} /> : null}
      {stages?.map((stage, i) =>
        <div
          key={stage.stage_id}
          onDragOver={e => e.preventDefault()}
          onDragEnter={() => {
            setTransferData(prev => ({
              ...prev,
              receiverStageId: stage.stage_id
            }))
          }}
          onDrop={() => {
            dispatch(moveItem(transferData))
            setTransferData({})
          }}
          className='stage flex flex-col w-full border-2 rounded-2xl bg-white h-150 p-3 px-4 gap-4'>
          <div className='flex justify-between w-full items-center'>
            <h1 className='text-2xl font-[700] truncate'>{(stage.label ?? '').trim() === '' ? 'Stage' + ++i : stage.label}</h1>
            <div className='flex gap-3'>
              {stage.items.length < 10 ? <button onClick={() => handleCreateItemOpenClose(stage.stage_id)} className='font-bold flex items-center text-lg justify-center bg-blue-400 size-8 box-content rounded-md cursor-pointer hover:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.25)]'>+</button> : null}
              <button onClick={() => handleRemoveStage(stage.stage_id)} className='px-2 p-1 rounded-md w-fit cursor-pointer'><img className="size-6 rounded-full border-2 hover:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.25)]" src="/cross.png" alt="" /></button>
            </div>
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
                key={item.item_id}
                className='flex bg-amber-100 text-md xl:text-[17px] relative flex-col p-2 gap-2 rounded-lg shadow '>
                <li className='absolute top-1 right-1'><button onClick={() => handleRemoveItem(stage.stage_id, item.item_id)} className='text-lg cursor-pointer'><img className="size-5 hover:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.25)] rounded-full border-2" src="/cross.png" alt="" /></button></li>
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
  )
}