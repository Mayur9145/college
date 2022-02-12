import { AUTH, RESET } from '../constants/actionTypes';

import * as api from '../api';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const currentUrl = "http://localhost/3000/";


export const signin = (formData, navigate) => async(dispatch) => {

    try {
        const { data } = await api.signIn(formData);


        dispatch({ type: AUTH, data });
        navigate("/");
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);

    }


}


export const signup = (formData, navigate) => async(dispatch) => {

    try {
        const { data } = await api.signUp(formData);
        console.log(data);
        alert("Email has been sent to you for account verification.");
        dispatch({ type: AUTH, data });

        // navigate("/");
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);

    }


}



export const forgottenPassword = (
    credentials,
    navigate,
    setFieldError,
    setSubmitting
) => {
    return () => {

        console.log(credentials)
            // console.log(setFieldError)

        axios.post('http://localhost:3000/user/requestPasswordReset', credentials, {
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                }


            })
            .then(response => {
                const { data } = response;
                console.log(data.status)

                if (data.status === "FAILED") {
                    const { message } = data;

                    if (
                        message.toLowerCase().includes("user") ||
                        message.toLowerCase().includes("password") ||
                        message.toLowerCase().includes("email")
                    ) {
                        setFieldError("email", message);
                    }
                } else if (data.status === "PENDING") {
                    alert("Password reset email has been sent to your email.")

                    // const navigate = useNavigate();

                    // const { email } = credentials;
                    // console.log(email)
                    // navigate(`/emailsent/${email}/${true}`)
                }

                setSubmitting(false);
            })
            .catch(err => console.log(err.message))
    };
};


export const resetPassword = (
    credentials,
    navigate,
    setFieldError,
    setSubmitting
) => {
    return () => {


        axios.post(`http://localhost:3000/user/resetPassword`, credentials, {
                headers: {
                    "content-Type": "application/json",
                },
            })
            .then((response) => {
                const { data } = response;
                console.log(data)
                if (data.status === "FAILED") {
                    const { message } = data;

                    if (
                        message.toLowerCase().includes("password")
                    ) {
                        setFieldError("newPassword", message);
                    }
                } else if (data.status === "SUCCESS") {
                    // const navigate = useNavigate();
                    alert("Your password has been reset successfully")

                    // navigate('/emailsent');
                }

                setSubmitting(false);
            })
            .catch(err => console.log(err))
    };
};