import { useHttp } from '../../hooks/useHttp';
import {useInput} from '../../hooks/useInput';
import styles from './authForm.module.css';

export default function AuthForm(props) {
    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');

    const {loading, error, request} = useHttp()

    const sendData = async () => {
        if(props.register === true)  {
            try {
                const data = await request(`/api/auth/register`, 'POST', {email: email, password: password});
                console.log(data);
            } catch (error) {
        }}
        if(props.login === true) {
            try {
                const data = await request(`/api/auth/login`, `POST`, {email: email, password: password});
                console.log(data);
            } catch (error) {
                
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetEmail();
        resetPassword();
        sendData();
    }

    if(props.passwordRestore) {
        return(
            <form className={styles.authForm}  onSubmit={handleSubmit}>
            <label>
                <input type='email' placeholder="Enter your email" {...bindEmail} />
            </label>
            <input type='submit' value='Send email' />
        </form>
        )
    }

    return(
        <form className={styles.authForm}  onSubmit={handleSubmit}>
            <label>
                <input type='email' placeholder="Enter your email" {...bindEmail} />
            </label>
            <label>
                <input type='password' placeholder='Password' {...bindPassword} />
            </label>
            <input type='submit' value='Sign Up' />
        </form>
    )
}