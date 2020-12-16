import { useEffect, useState } from 'react';
import AvatarCircle from '../../components/avatarCircle/avatarCircle';
import ProjectCarousel from '../../components/carousel/Carousel';
import useAuth from '../../hooks/useAuth';
import { useHttp } from '../../hooks/useHttp';
import styles from './index.module.css';

export default function Dashboard() {
    const [background, setBackground] = useState('');
    const {login, logout, userID, token} = useAuth();
    const {loading, request, error} = useHttp();
    const [userData, setUserData] = useState({});
    const [userProjectData, setUserProjectData] = useState([{
        active: 'new'
    }]);

    const [init, setInit] = useState(false)

    useEffect(() => {
        getUserProjectData();
        getUserData();
        setInit(true);
    }, [init])

    useEffect(() => {
        userProjectData.map((item, index) => {
            if(item.active == true) {
                setBackground(item.background)
            }
        })
    }, [userProjectData])

    const getUserData = async () => {
        try {
            let tempToken = JSON.stringify(token);
            const data = await request('/api/auth/getUserData', `POST`, undefined, {
                access_token: tempToken
            });
            setUserData(data);
        } catch (error) {}
    }

    const getUserProjectData = async () => {
        const defaultData = {
            active: 'new'
        };
        try {
            let tempToken = JSON.stringify(token);
            const data = await request('/api/taskManager/projects/getUserProjects', 'GET', undefined, {
                access_token: tempToken
            })
            setUserProjectData(() => {
                data.push(defaultData);
                console.log(data);
                for(let i = 0; i < data.length; i++) {
                    if(i === 0) {
                        data[i].active = true;
                    }
                    else if(data[i].active !== 'new') {
                        data[i].active = false;
                    }
                    data[i].id = i;
                }
                return data;
            })
        } catch (error) {}
    }

    return(
        <div>
            <style jsx>
             {`
             .background-Page {
                height: 100vh;
                background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${background}') no-repeat !important;
                -webkit-background-size: cover;
                -moz-background-size:  cover;
                -o-background-size: cover;
                background-size: cover!important;
                overflow: hidden;
                z-index: 0;
                opacity: 0%;
                display: none!important;
                }
             .background-Page-Active {
                height: 100vh;
                background: linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9) ), url('${background}') no-repeat !important;
                -webkit-background-size: cover;
                -moz-background-size:  cover;
                -o-background-size: cover;
                background-size: cover!important;
                overflow: hidden;
                z-index: 0;
                opacity: 100%;
                animation: myfadeIn 0.5s; 
             }
             @keyframes myfadeIn {
                0%   { opacity: 0; }
                100% { opacity: 1; }
              }
             `}
            </style>
            {
                userProjectData.map((item, index) => {
                    if(item.active == true) {
                        return(
                            <div className="background-Page-Active"> </div>
                        )
                    }
                    else return (
                        <div className="background-Page"> </div>
                    )
                })
            }
        <div className={styles.profile}>
        <AvatarCircle avatar={userData.avatar} name={userData.email} url="/profile/1" />
        </div>
        <div className={styles.carouselContainer}>
        <ProjectCarousel userToken={token} userProjectData={userProjectData} setUserProjectData={setUserProjectData} updateBackground={setBackground}/>
        </div>
    </div>
    )
}