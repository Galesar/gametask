import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import styles from './settingsButton.module.css';

export default function SettingsButton(props) {
    return (
        <div className={styles.settingsButton}>
        <a href={props.url}><FontAwesomeIcon icon={faCog} size='2x' /></a>
        </div>
    )
}