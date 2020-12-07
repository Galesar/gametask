import SquareCard from '../squareCard/squareCard'
import styles from './taskCard.module.css'

export default function TaskCard({taskData, ownerImg}) {

    return (
        <div className={styles.taskCard}>
            <SquareCard size={{width: '50px', height: "50px"}} background={`linear-gradient( rgba(208, 231, 255, 0.5), rgba(208, 231, 255, 0.5) ), url('${ownerImg}') no-repeat!important `}/>
            <span>
                {taskData.name}
            </span>
        </div>
    )
}