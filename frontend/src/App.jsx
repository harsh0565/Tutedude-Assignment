import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import PendingRequests from './components/pages/PendingRequests'
import FriendList from './components/pages/FriendList'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/pendingReq' element={<PendingRequests/>}/>
       <Route path='/friendList' element={<FriendList/>}/>
      </Routes>
    </div>
  )
}

export default App
