import { useEffect, useState } from "react"
import { useInput } from "../../../hooks/useInput";
import styles from './settings.module.css';
import TimesButton from '../../../components/timesButton/timesButton'
import { useRouter } from 'next/router'


export default function Settings() {

    const router = useRouter()
    const { id } = router.query

    const data = [{
        name: 'Project Settings',
        fields: {
            background: 'none',
            cardImage: 'defaultCardImage.png',
            projectName: 'Project 1'
        },
        active: true
    }, {
        name: 'Teams',
        fields: {
            activeTeams: '',
            addTeam: 'Input team id'
        },
        active: false
    }, {
        name: "Security",
        fields: {
            moderators: 'users',
            owner: 'email',
            members: 'members'
        },
        active: false
    }, {
        name: 'Billing',
        fields: {
            premium: false,
        },
        active: false
    }]

    const [init, setInit] = useState(false);

    const [sections, setSections] = useState([{}])
    useEffect(() => {
        if(!init) {
            setInit(true);
            initSections();
        }
    }, [sections])


    const initSections = () => {
        setSections(data);
    }


// PROJECT SETTINGS

//

// TEAMS

//

// SECURITY

//

// BILLING

//

// RENDER SETTINGS
const renderSettings = (item) => {
}
// END RENDER SETTINGS

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`test form success ${email}, ${password}, ${nickname}, ${avatar}`);
    }
    
    const changeActiveSection = (index) => {
        setSections(prevState => {
            for(let i = 0; i < prevState.length; i++) {
                if(prevState[i].active == true) {
                    prevState[i].active = false;
                    prevState[index].active = true;
                    break;
                } 
            }
            const newArr = [...prevState];
            return newArr
        })
    }

    return(
        <div className='container'>
        <style jsx>{`
            .active {
                -moz-text-shadow:0 0 10px #cce3fa;
                -webkit-text-shadow:0 0 10px #cce3fa;
                text-shadow:0 0 10px #cce3fa;
            }
        `}</style>
        <TimesButton url={`/project/${id}`}/>
        <div className={`${styles.settingsContainter} container`}>

                <div className={styles.leftContainer}>
                    <div className={styles.leftPosition}>
                        {
                            sections.map((item, index) => {
                                if(item.active) return <div className={`${styles.Section} active`} tabIndex='0' onMouseDown={e => changeActiveSection(index)}><a href="#">{item.name}</a></div>
                                else return <div className={styles.Section} tabIndex='0' onMouseDown={e => changeActiveSection(index)}><a href="#">{item.name}</a></div>
                            })
                        }
                    </div>
                </div> 
                <form className={styles.settings} onSubmit={handleSubmit}>
                    <div className={styles.rightContainer}>
                        <div className={styles.rightPostion}>
                        {
                            sections.map((item, index) => {
                                return (
                                    <div className={styles.rightContainer}>
                                        {
                                            renderSettings(item)
                                        }
                                    </div>
                                )
                            })
                        }
                        </div>
                    {/* <input type='submit' value='Confirm' /> */}
                    </div>
                </form>
        </div>
        </div>
    )
}