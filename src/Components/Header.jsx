import { useNavigate } from 'react-router'

export default function Header() {
    const navigate = useNavigate()
  return (
    
      <div className='w-full flex items-center bg-amber-600/70   p-2 justify-between px-30'>
        <h1 className='text-3xl font-bold p-2 text-center'>Kanban App</h1>
        <span onClick={()=>navigate('/auth/Login')} className='cursor-pointer hover:text-blue-400'>Login</span>
      </div>
    
  )
}
