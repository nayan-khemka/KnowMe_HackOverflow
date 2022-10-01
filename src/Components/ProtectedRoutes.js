import React from 'react'
import { Navigate } from 'react-router-dom'
import {checkAuthentication} from '../util/authentication'

const ProtectedRoutes = ({children }) => {
    if (!checkAuthentication()) {
      return <Navigate to="/"/>;
    }
  
    return children;
  };

export default ProtectedRoutes;