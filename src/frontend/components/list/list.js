import { useState } from 'react'
import TaskCard from '../taskCard/taskCard'
import styles from './list.module.css'

export default function List({list, tasks}) {

    const [active, setActive] = useState(false);

    const changeActiveStatus = () => {
        if(active) {
            setActive(false)
        }
        else setActive(true);
    }


    const renderTasks = () => {
        if(active) { 
       return tasks.map((item, index) => {
            return (
                <TaskCard ownerImg={item.img} taskData={item} />
            )
        })}
    }


    return (
        <div>
        <button className={styles.button} onClick={changeActiveStatus}>
            <span className={styles.listTitle}>{list.name}</span>
            <div className={styles.showButtonActive}></div>
        </button>
        <div className={styles.listContainer}>
            {renderTasks()}
        </div>
        </div>
    )
}