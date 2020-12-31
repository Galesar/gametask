import NewsCard from "../../../components/newsCard/newsCard";
import ObjectContainer from "../../../components/objectContainer/objectContainer";
import SettingsButton from "../../../components/settingsButton/settingsButton";
import SquareCard from "../../../components/squareCard/squareCard";
import styles from './index.module.css';
import { Router, useRouter } from 'next/router'
import StatContainer from "../../../components/statContainer/statContainer";
import { useEffect, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import useAuth from "../../../hooks/useAuth";

export default function Project() {

    const router = useRouter();
    const { project } = router.query

    const [projectData, setProjectData] = useState({});
    const {loading, request} = useHttp();
    const {token} = useAuth();
    const tempToken = JSON.stringify(token);

    const [boardsData, setBoardsData] = useState();
    const [teamsData, setTeamsData] = useState();

    const newBoard = async () => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/boards/createBoard', 'POST', {projectOwner: projectData._id}, {
                access_token: tempToken
            })
            Router.push(`/project/${project}/${data}`);
        } catch (error) {console.log(error)}
    }

    const tempObject = {
        url: undefined,
        preview: 'https://www.michaelpage.co.uk/sites/michaelpage.co.uk/files/styles/large/public/Image%20600%20x%20387_1.jpg?itok=qX6nf4xW',
        onClick: newBoard
    }

    useEffect(() => {
        getProjectData();
    }, [project])

    useEffect(() => {
        getBoardsData();
        getTeamsData();
    }, [projectData])

    const getProjectData = async () => {
        try {
            const data = await request('http://localhost:8080/api/taskManager/projects/getProject', 'POST', {url: project}, {
                access_token: tempToken
            })
            setProjectData({...data[0]});
        } catch (error) {}
    }

    const arrObjects = (array, type) => {
        const arrObjects = [];
        if(array) {
            array.map((item, index) => {
            if(!item.url) {
                arrObjects.push(<SquareCard image={item.preview} url={''} action={item.onClick} />)
            }
            else if(type === 'boards') {
            arrObjects.push(<SquareCard image={item.preview} url={`/project/${project}/${item.url}`} action={item.onClick} />)
            }
            else if (type === 'teams') {
                arrObjects.push(<SquareCard image={item.preview} url={`/team/${item.url}`} />)
            }
        })
        }
        return arrObjects;
    }

    const getBoardsData = async () => {
        try {
            if(projectData) {
            const data = await request('http://localhost:8080/api/taskManager/boards/getBoardByProject', 'POST', {projectUrl: projectData.url}, {
                access_token: tempToken
            })
            setBoardsData(() => {
                data.push(tempObject);
                return [...data]
            })
        }
        } catch (error) {console.log(error)}
    }

    const getTeamsData = async () => {
        try {
            if(projectData) {
                const data = await request('http://localhost:8080/api/taskManager/teams/getTeam', 'POST', {projects: projectData._id}, {
                    access_token: tempToken
                })
                setTeamsData(() => {
                    const tempData = [];
                    tempData.push(...data);
                    tempData.push(tempObject);
                    return [...tempData]
                })
            }
        } catch (error) {console.log(error)}
    }

    const newTeam = async () => {
        try {
            const data = await request('url', 'post', undefined, {
                access_token: tempToken
            })
            console.log(data);
            Router.push(`/team/${data}`);
        } catch (error) {console.log(error)}
    }

    if(!loading) 
    return (
        <div>
            <SettingsButton url={`/project/${project}/settings`}/>
            <div className={styles.statContainer}>
            <StatContainer />
            </div>
            <div className={styles.projectName}>
                <h1>{projectData.name}</h1>
            </div>
            
            <div className={styles.news}>
            <h2>News</h2>
            <ObjectContainer objects={[
                <NewsCard />
            ]}/>
            </div>

            <div className={styles.cardContainer}>
            <h2>Teams</h2>
            <ObjectContainer objects={arrObjects(teamsData, 'teams')}/>

            <h2>Boards</h2>
            <ObjectContainer  objects={arrObjects(boardsData, 'boards')}/>
            </div>

            <style jsx global>
                {`
                body{
                    background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${projectData.background}') no-repeat !important;
                    -webkit-background-size: cover;
                    -moz-background-size:  cover;
                    -o-background-size: cover;
                    background-size: cover!important;
                    overflow: hidden;
                }
                `}
            </style>
        </div>
    )

    else return (<div>
        loading
    </div>)
}