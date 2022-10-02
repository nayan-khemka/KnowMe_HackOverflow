import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import "./CSS/Login.css";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { createToken, checkAuthentication } from '../util/authentication';
import logo from './logo.png';

function Login(props) {
  const [response, setResponse] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false);
  const [postData, setPostData]= useState()
  let navigate= useNavigate();
  const loggedIn = checkAuthentication();

  useEffect(()=>{
    if (isSubmit){
      axios.post('http://172.20.10.2:8080/user/login', postData)
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
  
  return (
    <div className='text-center mt-5'>
      
      <div className='header' style={{margin: '10px', fontSize: '6rem'}}>KnowMe</div>
      <img src={logo} id='logo'></img>
      <h3 style={{color: '#3A5997'}}>KYC Made easy</h3>
      <div className="login">
  <div className="col-md-8 col-lg-7 col-xl-6">
  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image"></img>
  </div>
      <Formik
        initialValues={{username: "", password : ""}}
        validationSchema = {
            Yup.object({
              username : Yup.string().required("Required"),
                password : Yup.string()
                .required("Required")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/ ,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                )
                .min(8).max(16)
                
            })
        }
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              setPostData(values);
              setIsSubmit(true);
            }, 400);
          }}
        >
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={{paddingTop:"6%"}}>
            <h1 id="heading-user">User Login</h1>
            <Form>
              <div className='row'>
                <div className='mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                  <div className='form-group mt-2'>
                      <Field name="username" className="form-control red" placeholder="Enter username"></Field>
                      <div className='errormessage' style={{ color: "red" }} >
                      <ErrorMessage name="username" className='error' /></div>
                    </div>
                </div>
              </div>
              <div className='row'>
              <div className='mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                  <div className='form-group mt-2'>
                      <Field name="password" type="password" className="form-control red" placeholder="Enter Password"></Field>
                      <div className='errormessage' style={{ color: "red" }} >
                      <ErrorMessage name="password" className='error' /></div>
                  </div>
                  {response ? <></> : <div className='errormessage' style={{ color: "red" }} >
                    <ErrorMessage className='error'>Wrong</ErrorMessage>
                  </div> }  
              </div> 
              </div>
              <div className='row'>
                <div className='mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                  <button className="button" type='submit'><span>SignIn</span></button>
                  <a className="button" href='/register'><span>SignUp</span></a>
                </div>  
              </div>                         
            </Form>
          </div>
        
        </Formik>
        {(!loggedIn && isSubmit && !response)? <div className='loginError'>Wrong Credentials</div>:<></>}
        </div>
        <div className='bg-curve'></div>
    </div>






































































































































































































  )
}

export default Login;