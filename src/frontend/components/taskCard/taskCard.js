import SquareCard from '../squareCard/squareCard'
import styles from './taskCard.module.css'

export default function TaskCard({taskData, ownerImg}) {

    if(!ownerImg) {
        ownerImg = 'https://gbatemp.net/attachments/adidastoad-jpg.177857/'
    }

    return (
        <div className={styles.taskCard}>
            <SquareCard size={{width: '30px', height: "30px"}} background={`linear-gradient( rgba(208, 231, 255, 0.5), rgba(208, 231, 255, 0.5) ), url('${ownerImg}') no-repeat!important `}/>
            <span>
                {taskData.name}
            </span>
        </div>
    )
}