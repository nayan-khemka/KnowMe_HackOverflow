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
  const [isShown, setIsShown] =useState(false);
  const [shows, setShows] = useState(false);
  const [getData, setGetData] = useState()
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);
  const [postData, setPostData]= useState()
  const [otpPostData, setOtpPostData]= useState()
  let navigate= useNavigate();
  const loggedIn = checkAuthentication();

  useEffect(()=>{
    axios.post('http://172.20.10.2:8080/get/', {
      username:localStorage.username,
      apiKey:localStorage.apiKey,
    })
      .then((res => {
        setGetData(res.data.data);
        setIsShown(Object.keys(res.data.data).length !== 0);
      }))

    if (isSubmit){
      postData['username']=localStorage.username
      postData['apiKey']= localStorage.apiKey
      axios.post('http://172.20.10.2:8080/add/aadhaar/', postData)
      .then((res)=> {
        console.log(res);
        console.log("token is: "+res.data.data)
        // createToken(res.data.data)
        if(checkAuthentication()){
          window.location.reload();
          // navigate('/dashboard', {replace: true})
        }
      })
    }

    if (isOtpSubmit){
      otpPostData['username']=localStorage.username
      otpPostData['apiKey']= localStorage.apiKey
      axios.post('http://172.20.10.2:8080/verify/aadhaar/', otpPostData)
      .then((res)=> {
        console.log(res);
        // console.log("token is: "+res.data.data)
        // createToken(res.data.data)
        if(checkAuthentication()){
          window.location.reload();
          // navigate('/dashboard', {replace: true})
        }
      })
    }
  }, [isSubmit, isOtpSubmit])

  console.log(postData)

  
const handleLogout=()=>{
  clearToken()
  navigate(0)
}
  // console.log(paginatedData);

  
  return (
    <div id="hero">
      <div className="navbar">
        <img src={logo} className="logo" />
        <div className="user">
          <img src="" />
        </div>
      </div>
      <div className="container">
        <div className="info">
          <h1>KnowMe</h1>
          <button type="button" onClick={handleLogout }>Logout</button>
          <br /><br />
          <button onClick={()=>setShown(true)}>Add an ID</button>
        </div>
      </div>
      {
        isShown && (
          <div className='form-1 form-2'>
            {console.log(getData['aadhaar'])}
            Number : {getData['aadhaar'].number} <br/>
            Name : {getData['aadhaar'].name} <br/>
            Gender : {getData['aadhaar'].gender} <br/>
            Verified : {getData['aadhaar'].isVerified ? '✔' : '❌'} <br/>
            {!getData['aadhaar'].isVerified && (<span id="verify" onClick={()=>setShows(true)}>Verify</span>)}
          </div>
        )
      }
      {shows && (
        <Formik
        initialValues={{otp:""}}
        validationSchema = {
          Yup.object({
            otp : Yup.string()
                  .required("Required")
                  .matches(
                    /^[0-9]{4}$/ ,
                    "Must Contain 4 digits"
                  )
                  
              })}
              onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setShown(false);
                    setSubmitting(false);
                    setOtpPostData(values);
                    setIsOtpSubmit(true);
                  }, 400);
                }}
              >
              <div className='form-1'>
              <Form id='form'> 
              <div className='form-group mt-2'>
                        <Field name="otp" className="form-control red" placeholder="Enter OTP"></Field>
                        <div className='errormessage' style={{ color: "red" }} >
                        <ErrorMessage name="aadhaarNumber" className='error' /></div>
                      </div>
                      <button className="button" type='submit'><span>Submit</span></button>
        </Form>
        </div>
        </Formik>
      )}
      {shown && (
      <Formik
      initialValues={{aadhaarNumber:""}}
      validationSchema = {
        Yup.object({
          aadhaarNumber : Yup.string()
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
                      <Field name="aadhaarNumber" className="form-control red" placeholder="Enter aadhaarNumber"></Field>
                      <div className='errormessage' style={{ color: "red" }} >
                      <ErrorMessage name="aadhaarNumber" className='error' /></div>
                    </div>
                    <button className="button" type='submit'><span>Submit</span></button>
      </Form>
      </div>
      </Formik>)}
    </div>

  )
}

export default Dashboard

