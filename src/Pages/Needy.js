import React from 'react';
import { Formik, Form, ErrorMessage, Field, FieldArray} from 'formik';
import * as Yup from 'yup';
import './CSS/Needy.css'
import AddField from '../Components/AddField';
import RemoveField from '../Components/RemoveField';

function Needy() {
  return (
    <div>
      <Formik
      initialValues={{fullName:'', mobileNo: '', email: '', country: '', state: '', city: '', preferedLanguage: '', 
                        demo: '', time:[''], startTime: [''], endTime: [''], technology: [''] }}
      validationSchema={
        Yup.object({
          fullName : Yup.string().min(4).max(12).matches('[A-Za-z]', 'Only alphabets are valid').required('Required'),
          mobileNo : Yup.string().min(4).max(12).matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Only 10 digit numbers are valid').required('Required'),
          email : Yup.string().required('Required').email('Invalid email address'),
          country : Yup.string().required('Required'),
          state : Yup.string().required(' State name is required'),
          city : Yup.string().required('City name is required'),
          preferedLanguage : Yup.string().required('Prefered language is required'),
          demo : Yup.string().required('Please select required type'),
          startTime : Yup.string().required("Please select the Starting time"),
          endTime : Yup.string().required("Please select the Starting time"),
          technology : Yup.string().required('Technology is required')
        })
      }
      onSubmit={(values, { setSubmitting}) => {
        setTimeout(()=> {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400)
      }}
      >
        <div className='needyForm mt-5'>
          <div className='header d-flex justify-content-center'>Needy form</div>
          <Form>
            <div className='row'>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='fullName'>Full Name</label>
                <Field name = 'fullName' className='form-control'  type= 'text' placeholder="FIRST-NAME LAST-NAME"/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="fullName" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12' >
                <label htmlFor='mobileNo'>Mobile no.</label>
                <Field name = 'mobileNo' className='form-control' placeholder='MOBILE NUMBER' type= 'text'/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="mobileNo" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='email'>Email</label>
                <Field name = 'email' className='form-control' type= 'text' placeholder='EMAIL'/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="email" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='country'>Country</label>
                <Field name = 'country' className='form-control' type= 'text' placeholder='COUNTRY'/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="country" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='state'>State</label>
                <Field name = 'state' className='form-control' type= 'text' placeholder='STATE'/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="state" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='city'>City</label>
                <Field name = 'city' className='form-control' type= 'city' placeholder='CITY'/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="city" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='preferedLanguage'>Prefered Language</label>
                <Field name = 'preferedLanguage' className='form-control' type= 'text' placeholder='PREFERED LANGUAGE'/>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="preferedLanguage" className='error' /></div>
              </div>
              <div className='form-group col-md-6 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                <label htmlFor='demo'>Demo Required (in days)</label>
                <Field name = 'demo' as='select' id='demo' className='form-control my-select' type= 'text' placeholder='DEMO REQUIRED'>
                  <option id='demoDay1'></option>
                  <option id='demoDay1'>1 Day</option>
                  <option id='demoDay2'>2 Days</option>
                  <option id='demoDay3'>3 Days</option>
                </Field>
                <div className='errormessage' style={{ color: "red" }} ><ErrorMessage name="demo" className='error' /></div>
              </div>
              <div className='form-group'>
                <label className='col-md-4 col-sm-12 col-12'>Start time</label>
                <label className='col-md-4 col-sm-12 col-12 ms-3'>End time</label>
                <FieldArray name='time'>
                  {
                    (fieldArrayProps)=> {
                      console.log('fieldArrayProps' , fieldArrayProps)
                      const {push, remove, form} = fieldArrayProps;
                      const {values} = form;
                      const {time} = values;
                      return(
                        <div>
                          {time.map((times, index)=>{
                            console.log(time, "this is time");
                            return(
                            <div key={index}>
                              {/* <div className='fields d-flex'> */}
                                {/* <label name='startTime'>Start Time</label> */}
                                <Field className='col-md-4 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12' name={`startTime[${index}]`} type='time'/>
                                {/* <label name='endTime'>End Time</label> */}
                                <Field className='col-md-4 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12 ms-3' name={`endTime[${index}]`} type='time'/>
                                <div className='edit-field ms-3 d-inline-block' onClick={()=> push('')}><AddField/></div>
                                {time.length===1 ?<></> : <div className='edit-field ms-3 d-inline-block' onClick={()=> {remove(index)} }><RemoveField/></div>}
                              {/* </div> */}
                            </div>)
                          })}
                        </div>
                      )
                    }
                  }
                </FieldArray>
              </div>
              <div className='form-group'>
                <label name='technology'>Technology</label>
                <FieldArray name='technology'>
                  {
                    (fieldArrayProps)=>{
                      const {push, remove, form} = fieldArrayProps;
                      const {values} = form;
                      const {technology} = values;
                      return(<div>
                        {
                          technology.map((techs, index)=>{
                            return(
                              <div key={index}>
                                <Field className='col-md-4 mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12' name={`technology[${index}]`} placeholder='Language'/>
                                <div className='edit-field ms-3 d-inline-block' onClick={()=> push('')}><AddField/></div>
                                {technology.length===1 ? <></> : <div className='edit-field ms-3 d-inline-block' onClick={()=> {remove(index)} }><RemoveField/></div>}
                              </div>
                            )
                          })
                        }
                      </div>)
                    }
                  }
                </FieldArray>
              </div>
              <div className='form-group'>
                <label name='jobDescription' className='jobDes'>Job description</label>
                <textarea name='jobDescription' className="jobDes col-md-12 mb-2 mb-sm-3 mb-lg-12 col-sm-12 col-12 mt-2" type='textArea' id="textArea" placeholder="Please paste or type JOB DESCRIPTION only"/>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <div className='my-4'>WE WILL CONNECT YOU ON:</div>
            </div>
            <div className='d-flex justify-content-center'>
              <button className='btn btn-needy text-light mt-3 mx-auto' id='submit' type='submit'>Submit</button>
            </div>
          </Form>
        </div>
      </Formik>
      <div className='needyFooter mt-5'></div>
    </div>
  )
}

export default Needy