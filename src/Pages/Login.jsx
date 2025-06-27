import { useState } from "react"
import { useNavigate } from "react-router"


export default function Login() {

  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  return (
    <form
      onClick={e => {
        e.stopPropagation()
      }
      }
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className='p-4 rounded-md w-fit h-fit bg-white items-start '>
      <fieldset className="border flex flex-col gap-4 border-black p-4 rounded-md">
        <legend className="text-xl font-bold px-2">Sign In</legend>
        <label className='flex flex-col gap-2'>
          <span className='font-semibold text-sm'>Email: <span className='text-red-500'>*</span></span>
          <input placeholder='Enter e-mail' value={userEmail} onChange={e => setUserEmail(e.target.value)}
            type="email" required className='border px-2 p-1 outline-0 rounded-md' />
        </label>
        <label className='flex flex-col gap-2'>
          <span className='font-semibold text-sm'>Password:</span>
          <input type='password' placeholder="Enter password" value={userPassword} onChange={e => setUserPassword(e.target.value)}
            className='border px-2 p-1 outline-0 rounded-md' />
        </label>
        <span>New User? <span onClick={()=>navigate('/auth/register')} className="text-blue-500 font-semibold text-sm cursor-pointer">Register</span></span>
        <button type='submit' className='p-2 rounded-md font-[500] bg-green-500/90 hover:bg-green-500 cursor-pointer'>Login</button>
      </fieldset>
    </form>
  )
}