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
    const {loading, error, request} = useHttp()
    const [boardData, setBoardData] = useState({});
    const [listsData, setListsData] = useState([{}]);
    
    /**
     * @param {string} name
     * @param {string} ownerPreview - imageUrl
     * @param {array} taskData: {name, ownerPreview}
     */
    const [tasksData, setTasksData] = useState([{}]);
    const tempToken = JSON.stringify(token);

    useEffect(() => {
        getBoardData();
    }, [board])

    useEffect(() => {
        getLists();
    }, [boardData])

    const newList = async () => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/lists/createList', 'POST', {
                boardUrl: board
            }, {
                access_token: tempToken
            });
            console.log(data);
        } catch (error) {}
    }

    const tempObject = {
        name: 'New list',
        new: true,
        action: newList
    }

    const getLists = async () => { 
        try {
            const data = await request('http://localhost:8080/api/taskManager/lists/returnListsByBoard', 'POST', {
                boardUrl: board
            }, {
                access_token: tempToken
            })
            setListsData(() => {
                data.push(tempObject);
                console.log(data)
                return [...data];
            });
        } catch (error) {}
    }

    const getBoardData = async () => {
        try {
            console.log(board)
            const data = await request('http://localhost:8080/api/taskManager/boards/getBoardById', 'POST', { 
                boardUrl: board,
                projectUrl: project
            }, {
                access_token: tempToken
            });
            setBoardData({...data[0]});
        } catch (error) {}
    }

    const listRender = () => {
        if(listsData){
        return listsData.map(item => {
            if(item.new) { 
                return <List list={{name: item.name}} action={item.action} newItem={item.new} />
            }
            else return <List list={{name: item.name}} />
        })}
    }

    if(!loading)
    return (
        <div>
            <SettingsButton url={`/${project}/${board}/settings`} />
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