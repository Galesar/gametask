import React, {useEffect, useState, useContext} from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/authContext';

const LoginBox = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHadler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    
    const registerHandler = async () => {
        try {
            await request('/api/register', 'POST', {...form});
        } catch (error) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth', 'POST', {...form});
            auth.login(data.token, data.userID);
        } catch (error) {
            
        }
    }

    return (
        <div className='login-box col s12'>
        <form>
            <h1>Login</h1>
            <div className='input-login-box'>
                <FontAwesomeIcon icon={faEnvelopeSquare} />
                <input type='text' placeholder="Email" id="email" name="email" onChange={changeHadler} />
            </div>

            <div className='input-login-box'>
                <FontAwesomeIcon icon={faLock} />
                <input type='password' placeholder="Password" id="password" name="password" onChange={changeHadler}/>
            </div>
            <button onClick={loginHandler} disabled={loading} className="btn-login-box">Sign In</button>
        </form>
        <form>
            <button onClick={registerHandler} disabled={loading} className='btn-login-box'>Register</button>
        </form>
    </div>
    )
}

export default LoginBox;