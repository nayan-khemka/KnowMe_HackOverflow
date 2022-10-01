import '../Pages/CSS/Dashboard.css';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { createToken, checkAuthentication, clearToken } from '../util/authentication';
import logo from './logo.png';
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
  const [shown, setShown] = useState(false);

  const [response, setResponse] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false);
  const [postData, setPostData]= useState()
  let navigate= useNavigate();
  const loggedIn = checkAuthentication();

  useEffect(()=>{
    if (isSubmit){
      axios.post('http://172.20.10.2:8080/add/aadhar', postData)
      .then((res)=> {
        console.log(res);
        console.log("token is: "+res.data.data)
        createToken(res.data.data)
        if(checkAuthentication()){
          navigate('/dashboard', {replace: true})
        }
        else {
          setResponse(false)
        }
      })
    }
  }, [isSubmit])

  console.log(postData)

  const handleLogout = () => {
    clearToken();
    if(!checkAuthentication()){
      navigate(0, {replace: true})
    }
  }

  // console.log(paginatedData);

  
  return (
    <div id="hero">
      <div className="navbar">
        <img src={logo} className="logo" />
        <div className="user">
          <button type="button" onClick={handleLogout()}>Logout</button>
          <img src="" />
        </div>
      </div>
      <div className="container">
        <div className="info">
          <h1>KnowMe</h1>
          <p />
          <button onClick={()=>setShown(true)}>Add an ID</button>
        </div>
      </div>
      {shown && (
      <Formik
      initialValues={{aadharNumber:""}}
      validationSchema = {
        Yup.object({
          aadharNumber : Yup.string()
                .required("Required")
                .matches(
                  /^[0-9]{12}$/ ,
                  "Must Contain 12 digits"
                )
                
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setShown(false);
                  setSubmitting(false);
                  setPostData(values);
                  setIsSubmit(true);
                }, 400);
              }}
            >
            <div className='form-1'>
            <Form id='form'> 
            <div className='form-group mt-2'>
                      <Field name="aadharNumber" className="form-control red" placeholder="Enter aadharNumber"></Field>
                      <div className='errormessage' style={{ color: "red" }} >
                      <ErrorMessage name="aadharNumber" className='error' /></div>
                    </div>
                    <button className="button" type='submit'><span>Submit</span></button>
      </Form>
      </div>
      </Formik>)}
    </div>

  )
}

export default Dashboard

