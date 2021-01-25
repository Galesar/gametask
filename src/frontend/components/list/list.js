import { useState } from 'react'
import TaskCard from '../taskCard/taskCard'
import styles from './list.module.css'

export default function List({action, newItem, item, createTask, boardUrl}) {

    const [active, setActive] = useState(false);

    const changeActiveStatus = () => {
        if(active) {
            setActive(false)
        }
        else setActive(true);
    }


    const renderTasks = () => {
    if(active && item) { 
        if(item.tasks.length === 0 ) return null;
        else return item.tasks.map((task, index) => {
            if(!task.new) {
            return (
                <a href={`${boardUrl}/${task.url}`}>
                <div className={styles.taskContainer}>
                <TaskCard ownerImg={task.img} taskData={task} />
                </div>
                </a>
            )}
            else return (
                <div onClick={e => {createTask(item)}} className={styles.taskContainer}>
                <TaskCard ownerImg={task.img} taskData={task} />
                </div>
            )
        })}
    }

    if(!active && item) {
        return (
            <div>
            <button className={styles.button} onClick={changeActiveStatus}>
                <span className={styles.listTitle}>{item.name}</span>
            </button>
            <div className={styles.listContainer}>
                {renderTasks()}
            </div>
            </div>
        )
    }
    else if(!newItem && item)
    return (
        <div>
        <button className={styles.button} onClick={changeActiveStatus}>
            <span className={styles.listTitle}>{item.name}</span>
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
            <span className={styles.listTitle}>New list</span>
            <span className={styles.newButton}>	&#10133;</span>
        </button>
        </div>
    )
}