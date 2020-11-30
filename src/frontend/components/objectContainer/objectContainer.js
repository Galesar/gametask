import styles from './objectContainer.module.css'

export default function ObjectContainer({objects}) {
    return(
        <div className={styles.cardContainer}>
            {objects}
        </div>
    )
}