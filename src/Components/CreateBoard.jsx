import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { defaultLocalData } from "../Constants";
import { useDispatch} from "react-redux";
import { addBoard } from "../features/boards/boardsSlice";

export default function CreateBoard({ handleOpenClose }) {

    const [board, setBoard] = useState({})
    const dispatch = useDispatch()

    useEffect(() => setBoard(
        {
            board_id: nanoid(),
            title: "",
            description: "",
            stages: [],
            color: "#ffffff"
        }
    ), [])

    const localData = JSON.parse(localStorage.getItem('kanban')) ?? defaultLocalData

    function handleAddBoard() {
        dispatch(addBoard(board))
        localData.boards.push(board)
        localStorage.setItem('kanban', JSON.stringify(localData))
        setBoard({})
        handleOpenClose()
    }

    return (
        <div onClick={handleOpenClose} className='h-screen w-screen bg-black/80 z-50 top-0 left-0 fixed flex items-center justify-center'>

            <form
                onClick={e => {
                    e.stopPropagation()
                }
                }
                onSubmit={(e) => {
                    e.preventDefault()
                    handleAddBoard()
                }}
                className='p-4 rounded-md w-fit h-fit bg-white items-start '>
                <fieldset className="border flex flex-col gap-4 border-black p-4 rounded-md">
                    <legend className="text-xl font-bold px-2">Create New Board:</legend>
                    <label className='flex flex-col gap-2'>
                        <span className='font-semibold text-sm'>Board Title: <span className='text-red-500'>*</span></span>
                        <input placeholder='Enter title for the board' value={board.title} onChange={e => setBoard(prev => {
                            prev.title = e.target.value
                            return { ...prev }
                        })} type="text" required className='border px-2 p-1 outline-0 rounded-md' />
                    </label>
                    <label className='flex flex-col gap-2'>
                        <span className='font-semibold text-sm'>Board Description:</span>
                        <textarea rows='2' placeholder='Enter description for the board' value={board.description} onChange={e => setBoard(prev => {
                            prev.description = e.target.value
                            return { ...prev }
                        })} type="text" className='border px-2 p-1 outline-0 rounded-md' />
                    </label>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold text-sm '>Choose a color: </span>
                        <span className='flex gap-2 items-center '>
                            <input value={board.color} onChange={e => setBoard(prev => {
                                prev.color = e.target.value
                                return { ...prev }
                            }
                            )} type="color" className="border-2 p-1 rounded-md"/>
                            <span className='text-sm font-semibold'>{board.color}</span>
                        </span>
                    </div>
                    <button type='submit' className='p-2 rounded-md font-[500] bg-green-500/90 hover:bg-green-500 cursor-pointer'>Create Board</button>
                </fieldset>
            </form>

        </div>
    )
}