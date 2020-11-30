import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import styles from './timesButton.module.css';

export default function TimesButton(props) {
    return (
        <div className={styles.timesButton}>
        <a href={props.url}><FontAwesomeIcon icon={faTimes} size='2x' /></a>
        </div>
    )
}