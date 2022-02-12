import React, { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch,connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import M from 'materialize-css'
// import { resetpassword } from '../../actions/auth';
import {Formik,Form} from "formik";
import { TextField, Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {resetPassword} from '../../actions/auth';



const PasswordReset = ({resetPassword}) => {
    const {userId,resetString} = useParams();
    let newPw = '';
    let confirmNewPw = '';
    const navigate = useNavigate();

    return (
      <div>
        <h2> Password Reset </h2>
        <Formik
        initialValues={{
         
          newPassword:'',
          confirmNewPassword:'',
          userId,
          resetString
        }}
        onSubmit = { (values, {setSubmitting,setFieldError})=>{
          values.newPassword = newPw;
          values.confirmNewPassword = confirmNewPw;
          resetPassword(values,navigate,setFieldError,setSubmitting);
          values.newPassword = '';
          values.confirmNewPassword = '';

        }}
         
        >
          {({isSubmitting})=>(
            <Form>
            <TextField
                name="newPassword"
                type = "password"
                placeholder = "********"
                onChange = {(e)=>{newPw = e.target.value}}
                
              />
              <br/>
              <TextField
                name="confirmNewPassword"
                type = "password"

                placeholder = "Confirm new password"
                onChange = {(e)=>{confirmNewPw = e.target.value}}

              />
              <br/>
              <ButtonGroup>
                {!isSubmitting && (
                  <Button type="submit">Submit</Button>
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </div>
    )
  // const [formData, setFormData] = useState({
  //   email: '',
  //   redirectUrl: 'http://localhost:3000/passwordReset',
  //   textChange: 'Submit'
  // });
  // const { email,redirectUrl, textChange } = formData;
  // const handleChange = text => e => {
  //   setFormData({ ...formData, [text]: e.target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email) {
  //     setFormData({ ...formData, textChange: 'Submitting' });
      
  //     axios
  //       .post('http://localhost:3000/user/passwordReset', {
  //         email,redirectUrl
  //       })
  //       .then(res => {
  //         //console.log("res")
  //           setFormData({
  //             ...formData,
  //             email: '',
  //             redirectUrl:''
  //           });
            
  //           toast.success(`Please check your email`);
  //           alert("Reset password link has been sent to your email.")
          
  //       })
  //       .catch(err => {
  //       console.log(err)
  //         toast.error(err.response.data.error);
  //       });
  //   } else {
  //     toast.error('Please fill all fields');
  //   }
  // };

  //   return ( <form onSubmit = { handleSubmit } >
  //       <input 
  //       type = "text"
  //       placeholder = "Enter your email address"
  //       value = { email }
  //       onChange={handleChange('email')}
  //       /> 
        
  //       <button type = "submit" >
  //       reset password 
  //       </button>  
  //       </form>
        
  //   )
}

export default connect(null,{resetPassword})(PasswordReset);
