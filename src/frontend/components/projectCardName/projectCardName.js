import styles from './projectCardName.module.css'

export default function ProjectCardName({name, active}) {
    if(active) {
        return <h3 className={styles.cardName}>{name}</h3>
    }
    else return null
}