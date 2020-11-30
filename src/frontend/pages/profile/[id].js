import { useEffect, useState } from "react"
import { useInput } from "../../hooks/useInput";
import styles from './settings.module.css';
import TimesButton from '../../components/timesButton/timesButton'
import { useRouter } from 'next/router'


export default function Settings() {

    const router = useRouter();
    const { id } = router.query

    const data = [{
        name: 'Account Settings',
        fields: {
            nickname: 'Your name',
            avatar: 'defaultAvatar.png'
        },
        active: true
    }, {
        name: 'Security',
        fields: {
            email: 'Input your email'
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
        resetAvatar();
        resetEmail();
        resetNickname();
        resetPassword();
        console.log(`
        Email: ${email}
        Password: ${password}
        Avatar: ${avatar}
        Nickname: ${nickname}`)
    }, [sections])


    const initSections = () => {
        setSections(data);
    }

// ACCOUNT SETTINGS
const {value: avatar, bind: bindAvatar, reset: resetAvatar} = useInput('');
const {value: nickname, bind: bindNickname, reset: resetNickname} = useInput('');
const accountSettings = (item) => {
    return (
        <div>
            <label className={styles.settingsLabel}>
                <span>Avatar:</span>
                <input type='file' placeholder={item.placeholder} title={item.avatar}{...bindAvatar}/>
            </label>
            <label className={styles.settingsLabel}>
                <span>Nickname:</span>
                <input type='text' placeholder={item.nickname} {...bindNickname}/>
            </label>
        </div>
    )
}


// END ACCOUNT SETTINGS

// DASHBOARD SETTINGS
// TODO
// END DASHBOARD SETTINGS

// SECURITY SETTINGS
    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');
    const securitySettings = (item) => {
        return (
        <div>
            <label className={styles.settingsLabel}>
                <span>Email:</span>
                <input type='email' placeholder={item.email} defaultValue={item.email} {...bindEmail} />
            </label>
            <label className={styles.settingsLabel}>
                <span>Password:</span>
                <input type='password' placeholder='Password' {...bindPassword} />
            </label>
        </div>
        )
    }
// END SECURITY SETTINGS

// RENDER SETTINGS
const renderSettings = (item) => {
    if(item.active && item.name == "Account Settings") {
        return accountSettings(item.fields);
    }
    else if (item.active && item.name == "Security") {
        return securitySettings(item.fields);
    }
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
        <TimesButton url="/dashboard"/>
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