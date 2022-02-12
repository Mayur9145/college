import { useNavigate, useParams } from 'react-router-dom';
import {Formik,Form} from "formik";
import {  Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const EmailSent = () => {
    const navigate = useNavigate();
    const { userEmail, reset } = useParams();

    return (
        <div>
            <div>
                {reset && userEmail && (
                    <Formik>
                        <h2>Password reset</h2>
                        <p>An email with a password link has been sent to your email: <b>{userEmail}</b>.</p>
                        <p>Please check your email and click on the link to proceed.</p>
                    </Formik>
                )}

                {!reset && userEmail && (
                    <Formik>
                        <h2>Password reset</h2>
                        <p>An email with a password link has been sent to your email: <b>{userEmail}</b>.</p>
                        <p>Please check your email and click on the link to proceed.</p>

                        <ButtonGroup>
                            <Button to={`/login/${userEmail}`}> Proceed</Button>
                        </ButtonGroup>
                    </Formik>
                )}

                {!reset && !userEmail && (
                    <Formik>
                        <h2>Password reset</h2>
                        <p>Your password has been reset successfully.</p>
                        <p>You may login now.</p>

                        <ButtonGroup>
                            <Button to={'/login'}> Login</Button>
                        </ButtonGroup>
                    </Formik>
                )}
            </div>
        </div>
    )
}

export default EmailSent;
