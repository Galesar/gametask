import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AvatarCircle from "../../../../components/avatarCircle/avatarCircle";
import List from "../../../../components/list/list";
import SettingsButton from "../../../../components/settingsButton/settingsButton";
import useAuth from "../../../../hooks/useAuth";
import { useHttp } from "../../../../hooks/useHttp";

import styles from './index.module.css';

export default function Board() {
    const router = useRouter();
    const {project, board} = router.query;

    const {token} = useAuth();
    const {loading, error, request} = useHttp();
    const [boardData, setBoardData] = useState({});
    const [listsData, setListsData] = useState([{}]);
    
    /**
     * @param {array} taskData: {name, ownerPreview, url}
     * @param {string} name
     * @param {string} ownerPreview - imageUrl
     */
    const [tasksData, setTasksData] = useState([{}]);
    const tempToken = JSON.stringify(token);

    useEffect(() => {
        getBoardData();
        getLists();
    }, [board])

    const newList = async () => {
        try {
           await request('http://localhost:8080/api/taskManager/lists/createList', 'POST', {
                boardUrl: board
            }, {
                access_token: tempToken
            });
        } catch (error) {}
    };

    const tempListObject = {
        name: 'New list',
        new: true,
        action: newList
    };
    const tempTaskObject = {
        name: "New task",
        new: true
    };

    const getLists = async () => { 
        try {
            const data = await request('http://localhost:8080/api/taskManager/lists/returnListsByBoard', 'POST', {
                boardUrl: board
            }, {
                access_token: tempToken
            })
            data.map(async item => {
                const tempVar = await getTasksData(item);
                item.tasks = [...tempVar];
                item.tasks.push(tempTaskObject);
            })
            data.push(tempListObject);
            setListsData([...data]);
        } catch (error) {}
    };

    const getTasksData = async (item) => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/tasks/getTasksByListOwner', 'POST', {
                boardUrl: board,
                listOwner: item._id
            }, {
                access_token: tempToken
            })
            return data;
        } catch (error) {}
    }

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

    const listRender = () => {
        if(listsData && Array.isArray(listsData[0].tasks)) {
        return listsData.map(item => {
            if(item.new) { 
                return <List action={item.action} newItem={item.new} createTask={createTask} />
            }
            else if(item.tasks) {
            return <List createTask={createTask} item={item}  boardUrl={board}/>
            }
        })}
    };

    const createTask = async (list) => {
        try {
           await request('http://localhost:8080/api/taskManager/tasks/createTask', 'POST', {
                listID: list._id,
                boardUrl: board

            }, {
                access_token: tempToken
            })
        } catch (error) {}
    };

    if(!loading)
    return (
        <div>
            <style jsx global>
            {`
            body {
                overflow-y:auto;
                background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${boardData.background}') no-repeat !important;
                -webkit-background-size: cover!important;
                -moz-background-size:  cover!important;
                -o-background-size: cover!important;
                }
            `}
            </style>
            <SettingsButton url={`/${project}/${board}/settings`} />
            <div className={styles.boardNameContainer}>
                <AvatarCircle avatar={boardData.preview} />
                <h2>{boardData.name}</h2>
            </div>
            <div className={styles.taskContainer}>
                {listRender()}
            </div>
        </div>
    )
    else return (<div>
        <center>Loading...</center>
    </div>)
}