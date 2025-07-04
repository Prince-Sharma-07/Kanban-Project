import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Auth from './Pages/Auth'
import NotFound from './Pages/NotFound'
import Board from './Components/Board'
import Login from './Pages/Login'
import Register from './Pages/Register'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Layout} >
          <Route index Component={Home} />
          <Route path='profile' Component={Profile} />
          <Route path='auth' Component={Auth}>
            <Route index Component={Home} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='board' >
            <Route index Component={Board} />
            <Route path=":boardId" element={<Board />} />
            <Route path="*" element={<>Board id not found</>} />
          </Route>
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}
