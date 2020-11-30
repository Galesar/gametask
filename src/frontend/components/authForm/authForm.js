import {useInput} from '../../hooks/useInput';
import styles from './authForm.module.css';

export default function AuthForm(props) {
    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');



    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Register user ${email} with pass ${password}`);
        resetEmail();
        resetPassword();
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