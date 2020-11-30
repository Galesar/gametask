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
                <center><h1>Password Restore</h1></center>
                <AuthForm passwordRestore="True" />
                <a className={styles.formLeft} href="/login">I know the password</a>
                <a className={styles.formRight} href="/signUp">I don't have an account</a>
                </div>
            </div>
        </div>
    )
}