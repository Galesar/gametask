import styles from './link.module.css'

export default function Link(props) {
    return(
        <a href={props.link} className={styles.link}>
            {props.text}
        </a> 
    )
}