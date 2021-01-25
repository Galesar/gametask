import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AvatarCircle from "../../../../../components/avatarCircle/avatarCircle";
import TimesButton from "../../../../../components/timesButton/timesButton";
import useAuth from "../../../../../hooks/useAuth";
import { useHttp } from "../../../../../hooks/useHttp";
import { useInput } from "../../../../../hooks/useInput";
import styles from './index.module.css'

export default function Task () {
    
    const router = useRouter();
    const {task, board, project} = router.query;
    const {loading, error, request} = useHttp();
    const {token} = useAuth();
    const [boardData, setBoardData] = useState({});
    const [taskData, setTaskData] = useState({});

    const tempToken = JSON.stringify(token);

    const {value: name, bind: bindName, reset: resetName} = useInput('');
    const {value: description, bind: bindDescription, reset: resetDescription} = useInput('');

    useEffect(() => {
        getBoardData();
        getTaskData();
    }, [board])


    const getBoardData = async () => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/boards/getBoardByUrl', 'POST', { 
                boardUrl: board,
                projectUrl: project
            }, {
                access_token: tempToken
            });
            setBoardData({...data[0]});
        } catch (error) {}
    };

    const getTaskData = async () => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/tasks/getTaskByUrl', 'POST', {
                boardUrl: board,
                taskUrl: task
            }, {
                access_token: tempToken
            });
            console.log(data[0]);
            setTaskData({...data[0]});
        } catch (error) {}
    }

    const changeTaskData = async () => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/tasks/changeTask', 'POST', {
                boardUrl: board,
                taskUrl: task,
                data: {
                    name: name,
                    description: description
                }
            }, {
                access_token: tempToken
            })
            console.log(data);
        } catch (error) {}
    }

    const [data, setData] = useState({
        status: "In progress",
        assignee: "id21313115",
        priority: "10"
    })

    const handleChangeTags = (event) => {
        if(['Enter', 'Tab', ','].includes(event.key)) {
            event.preventDefault();
            let tag = event.target.value.trim();
            if(tag) {
                // let temptags = [...tags];
                // tempTags.push(tag);
                // console.log(tempTags)
                // setTags([...temptags]);
                // event.target.value = "";
            }
        }
    }

    const handleTagDelete = toBeRemoved => {
        setData( prevstate => {return {
            tags: prevstate.tags.filter(tag => tag !== toBeRemoved)
        }});
    }

    if(!loading && taskData.tags)
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
                    <AvatarCircle avatar={`${boardData.preview}`} />
                    <input type='text' placeholder={taskData.name} defaultValue={taskData.name} {...bindName} />
                    </div>

                    <div className={styles.formBody}>
                        <label>
                        <textarea placeholder={taskData.description} {...bindDescription} defaultvalue={taskData.description} />
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
                                {taskData.tags.map(item => {
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
                    <a onMouseDown={e => {changeTaskData()}} href="#">Done</a>
                    <a href="#">Remove</a>
                    </div>
                </form>
            </div>
        </div>
    )
    else return (<center>Loading...</center>)
}