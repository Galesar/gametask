import Button from './Buttons/button';
import styles from './container.module.css';

export default function ButtonContainer() {
    return(
        <div className={styles.buttonContainer}>
            <Button text='Log In' style="Empty" link='/login'/>
            <Button text='Sign Up' link='signUp'/>
        </div>
    )
}