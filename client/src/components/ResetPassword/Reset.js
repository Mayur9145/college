import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import M from 'materialize-css'
import { resetpassword } from '../../actions/auth';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    string:'',
    password: '',
    textChange: 'Submit'
  });
  const { email,string,password, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      
      axios
        .post('http://localhost:3000/user/resetPassword', {
          email,string,password
        })
        .then(res => {
          //console.log("res")
            setFormData({
              ...formData,
              email: '',
            });
            
            toast.success(`Please check your email`);
            alert("Reset password link has been sent to your email.")
          
        })
        .catch(err => {
        console.log(err)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

    return ( <form onSubmit = { handleSubmit } >
        <input 
        type = "text"
        placeholder = "email"
        value = { email }
        onChange={handleChange('email')}
        /> 
        <input 
        type = "text"
        placeholder = "string"
        value = { string }
        onChange={handleChange('string')}
        /> 
        <input 
        type = "password"
        placeholder = "password"
        value = { password }
        onChange={handleChange('password')}
        />
        <button type = "submit" >
        reset password 
        </button>  
        </form>
        
    )
}


export default ResetPassword;
