import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AvatarCircle from "../../../../../components/avatarCircle/avatarCircle";
import TimesButton from "../../../../../components/timesButton/timesButton";
import styles from './index.module.css'

export default function Task () {
    
    const router = useRouter();
    const {task, board, project} = router.query;

    const [boardData, setBoardData] = useState({
        background: 'https://i.pinimg.com/originals/9a/1d/17/9a1d17bac520a63e10ca9e58c73d0c80.jpg'    
    })

    const [data, setData] = useState({
        name: "Test task",
        description: `Some trouble description`,
        status: "In progress",
        assignee: "id21313115",
        priority: "10",
        tags: ['development', 'rc0.1']
    })

    useEffect(() => {
        console.log(data.tags)
    }, [data.tags])

    const handleChangeDesc = (event) => {
        const newObject = new Object(data);
        newObject.description = event.target.value;
        setData(newObject);
    }

    const handleChangeTags = (event) => {
        if(['Enter', 'Tab', ','].includes(event.key)) {
            event.preventDefault();
            let tag = event.target.value.trim();
            if(tag) {
                const newObject = new Object(data);
                newObject.tags = [...newObject.tags, tag];
                setData({...newObject});
                event.target.value = "";
            }
        }
    }

    const handleTagDelete = toBeRemoved => {
        setData( prevstate => {return {
            tags: prevstate.tags.filter(tag => tag !== toBeRemoved)
        }});
    }

    return (
        <div>
            <style jsx global>{`
                body {
                overflow: hidden;
                background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${boardData.background}') no-repeat !important;
                -webkit-background-size: cover!important;
                -moz-background-size:  cover!important;
                -o-background-size: cover!important;
                }
            `}</style>

            <TimesButton url={`/project/${project}/${board}`} />

            
            <div className={styles.taskForm}>
                <form>

                    <div className={styles.taskNameContainer}>
                    <AvatarCircle avatar={"https://media.timeout.com/images/62555/630/472/image.jpg"} />
                    <input type='text' defaultValue={data.name} />
                    </div>

                    <div className={styles.formBody}>
                        <label>
                        <textarea placeholder="Enter your description" defaultValue={data.description} onChange={event => handleChangeDesc(event)}/>
                        </label>
                        <div className={styles.additionalOptions}> 
                            <div>
                            <span>Status:</span>
                            <label>
                                <select> 
                                    <option value="Backlog">Backlog</option>
                                    <option value="Ready to start">Ready to start</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Done">development</option>
                                </select>
                            </label>
                            </div>

                            <div>
                            <span>Assignee:</span>
                            <label>
                                <select> 
                                    <option value="1">Alkes</option>
                                    <option value="2">Dizefool</option>
                                    <option value="3">Miturel</option>
                                    <option value="4">Who?</option>
                                </select>
                            </label>
                            </div>

                            <div className={styles.priority}>
                                <span>Priority:</span>
                                <label>
                                <input type="number" defaultValue={data.priority} />
                                </label>
                            </div>


                            <div className={styles.tagContainer}>
                            <span>Tags:</span>
                            <label>
                                {data.tags.map(item => {
                                    return (
                                        <div className={styles.tagChip} key={item}>{item}
                                        
                                        <a type='button' onClick={() => {
                                            handleTagDelete(item)
                                        }}>&times;</a>
                                        
                                        </div>
                                    )
                                })}
                                <input placeholder="Input tag" onKeyDown={event => handleChangeTags(event)} /> 
                            </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonsContainer}>
                    <a href="#">Done</a>
                    <a href="#">Remove</a>
                    </div>
                </form>
            </div>
        </div>
    )
}