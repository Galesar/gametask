import AuthForm from '../components/authForm/authForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import styles from '../static/styles/authFormPage.module.css';

export default function SignUp() {

    return (
        <div className='container'>
            <div className={styles.timesButton}>
                <a href="/"><FontAwesomeIcon icon={faTimes} size='2x' /></a>
            </div>
            <div className={styles.gmContainer}>
            <div className={styles.form}>
                <center><h1>Log In</h1></center>
                <AuthForm />
                <a className={styles.formLeft} href="/signUp">Sign Up</a>
                <a className={styles.formRight} href="/passwordRestore">I'm forgot password</a>
                </div>
            </div>
        </div>
    )
}