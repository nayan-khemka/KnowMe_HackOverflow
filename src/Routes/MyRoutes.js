import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from '../Components/ProtectedRoutes';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const MyRoutes =()=> {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        }/>
      </Routes>
    </div>
  )
}

export default MyRoutes
