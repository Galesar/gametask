import { useState } from 'react'
import TaskCard from '../taskCard/taskCard'
import styles from './list.module.css'

export default function List({list, tasks, action, newItem}) {

    const [active, setActive] = useState(false);

    const changeActiveStatus = () => {
        if(active) {
            setActive(false)
        }
        else setActive(true);
    }


    const renderTasks = () => {
        if(active && tasks) { 
       return tasks.map((item, index) => {
            return (
                <TaskCard ownerImg={item.img} taskData={item} />
            )
        })}
    }

    if(!newItem)
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
    else return (
        <div>
        <button className={styles.button} onClick={e => {action()}}>
            <span className={styles.listTitle}>{list.name}</span>
            <span className={styles.newButton}>	&#10133;</span>
        </button>
        </div>
    )
}