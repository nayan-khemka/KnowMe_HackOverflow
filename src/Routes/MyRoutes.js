import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from '../Components/ProtectedRoutes';
import Allotment from '../Pages/Allotment';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Needy from '../Pages/Needy';
import Register from '../Pages/Register';
import Resources from '../Pages/Resources';

const MyRoutes =()=> {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/needy' element={<Needy/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        }/>
        <Route path='/resources' element={
          <ProtectedRoutes>
            <Resources/>
          </ProtectedRoutes>
        }/>
        <Route path='/allotment-table' element={
          <ProtectedRoutes>
            <Allotment/>
          </ProtectedRoutes>
        }/>
      </Routes>
    </div>
  )
}

export default MyRoutes