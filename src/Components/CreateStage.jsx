import { defaultLocalData } from "../Constants";
import { useDispatch } from "react-redux";
import { addStage } from "../features/boards/boardsSlice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

export default function CreateStage({ handleCreateStageOpenClose, boardId }) {

    const [stageData, setStageData] = useState({})

    useEffect(() => {
        setStageData({
            stage_id: nanoid(),
            label: "",
            items: [],
            total: 0
        })
    }, [])

    const dispatch = useDispatch()

    const localData = JSON.parse(localStorage.getItem('kanban')) ?? defaultLocalData


    function handleAddStage() {
        dispatch(addStage({ boardId, stageData }))
        const board = localData.boards.find(({ board_id }) => board_id === boardId)
        board.stages.push(stageData)
        localStorage.setItem('kanban', JSON.stringify(localData))
        setStageData({})
        handleCreateStageOpenClose()
    }

    return (
        <div onClick={handleCreateStageOpenClose} className='h-screen w-screen bg-black/80 z-50 top-0 left-0 fixed flex items-center justify-center'>

            <form
                onClick={e => {
                    e.stopPropagation()
                }
                }
                onSubmit={(e) => {
                    e.preventDefault()
                    handleAddStage()
                }}
                className='p-4 rounded-md w-fit h-fit bg-white items-start '>
                <fieldset className="border flex flex-col gap-4 border-black p-4 rounded-md">
                    <legend className="text-xl font-bold px-2">Create New Stage:</legend>
                    <label className='flex flex-col gap-2'>
                        <span className='font-semibold text-sm'>Stage label: </span>
                        <input placeholder='Enter Label for the board' value={stageData.label} onChange={e => setStageData(prev => {
                            prev.label = e.target.value
                            return { ...prev }
                        })} type="text" className='border px-2 p-1 outline-0 rounded-md' />
                    </label>
                    <button type='submit' className='p-2 rounded-md font-[500] bg-green-500/90 hover:bg-green-500 cursor-pointer'>Create Stage</button>
                </fieldset>
            </form>

        </div>
    )
}