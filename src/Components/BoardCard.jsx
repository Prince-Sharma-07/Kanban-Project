import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { removeBoard } from "../features/boards/boardsSlice";

export default function BoardCard({ title, description, color, board_id }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleRemoveBoard(boardId){
      dispatch(removeBoard(boardId))
  }

  return (
    <li onClick={() => navigate('/board/' + board_id)} style={{ borderColor: color === '#ffffff' ? 'black' : color }} className='shadow-[0px_0px_2.5px_2px_rgba(0,0,0,0.25)] flex relative flex-col gap-2 border-3 w-full h-30 cursor-pointer rounded-xl overflow-hidden bg-white'>
       <button onClick={(e) => {
        e.stopPropagation()
        handleRemoveBoard(board_id)
      }
      } className="absolute bottom-24 text-xl hover:text-red-400 right-3 cursor-pointer">x</button>
      <div style={{ backgroundColor: color }} className={`h-4 w-full ${color === '#ffffff' ? 'border-b-[2px]' : ''}`} />
      <span className='capitalize px-4 truncate'><strong>Board Title: </strong>{title}</span>
      <span className='px-4 line-clamp-2'><strong>Board Description: </strong>{description}</span>
    </li>
  )
}