import { defaultLocalData } from "../Constants";
import { useDispatch } from "react-redux";
import { addStage } from "../features/boards/boardsSlice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

export default function CreateItem({ handleCreateItemOpenClose, boardId, stageId }) {

    const [itemData, setItemData] = useState({})

    useEffect(() => {
        setItemData({
            item_id: nanoid(),
            title: "",
            description: "",
            createdAt: new Date(Date.now()).toLocaleString(),
            updatedAt: new Date(Date.now()).toLocaleString(),
            creator: "",
            priority: 1,
        })
    }, [])

    const dispatch = useDispatch()

    const localData = JSON.parse(localStorage.getItem('kanban')) ?? defaultLocalData


    function handleAddItem() {
        dispatch(addStage({ boardId, stageId, itemData }))
        const board = localData.boards.find(({ board_id }) => board_id === boardId)
        const stage = board.stages.find(({ stage_id }) => stage_id === stageId)
        stage.items.push(itemData)
        localStorage.setItem('kanban', JSON.stringify(localData))
        setItemData({})
        handleCreateItemOpenClose()
    }

    return (
        <div onClick={handleCreateItemOpenClose} className='h-screen w-screen bg-black/80 z-50 top-0 left-0 fixed flex items-center justify-center'>

            <form
                onClick={e => {
                    e.stopPropagation()
                }
                }
                onSubmit={(e) => {
                    e.preventDefault()
                    handleAddItem()
                }}
                className='p-4 rounded-md w-fit h-fit bg-white items-start '>
                <fieldset className="border flex flex-col gap-4 border-black p-4 rounded-md">
                    <legend className="text-xl font-bold px-2">Create New Item:</legend>
                    <label className='flex flex-col gap-2'>
                        <span className='font-semibold text-sm'>Item title: <span className='text-red-500'>*</span></span>
                        <input placeholder='Enter label for the item' value={itemData.label} onChange={e => setItemData(prev => {
                            prev.title = e.target.value
                            return { ...prev }
                        })} type="text" required className='border px-2 p-1 outline-0 rounded-md' />
                    </label>
                    <label className='flex flex-col gap-2 '>
                        <span className='font-semibold text-sm'>Item Description:</span>
                        <textarea rows='2' placeholder='Enter description for the item' value={itemData.description} onChange={e => setItemData(prev => {
                            prev.description = e.target.value
                            return { ...prev }
                        })} type="text" className='border px-2 p-1 outline-0 rounded-md' />
                    </label>

                    <label className='flex flex-col gap-2'>
                        <span className='font-semibold text-sm'>Item Creator:</span>
                        <textarea rows='2' placeholder="Enter creator's name" value={itemData.creator} onChange={e => setItemData(prev => {
                            prev.creator = e.target.value
                            return { ...prev }
                        })} type="text" className='border px-2 p-1 outline-0 rounded-md' />
                    </label>

                    <div  className="focus-within:border-black shadow-xl border-1 px-2 p-1 border-black/30 flex justify-between rounded-md">
                        <span>Priority:</span>
                        <select value={itemData.priority} onChange={e => setItemData((prev) => {
                            prev.priority = e.target.value
                            return { ...prev }
                        })} className="border-0 outline-none w-full text-center px-2 ">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <button type='submit' className='p-2 rounded-md font-[500] bg-green-500/90 hover:bg-green-500 cursor-pointer'>Create Item</button>
                </fieldset>
            </form>

        </div>
    )
}