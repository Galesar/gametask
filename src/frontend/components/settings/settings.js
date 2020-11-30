import { isValidElement, useState } from "react"
import { useInput } from "../../hooks/useInput";
import styles from './settings.module.css';
    /* 
     props.settings: [{
         name: string,
         fields: {
             [{
             type: string (text/image/number/password/email),
             placeholder: string,
             value: string
             }]
         },
         active: boolean
     }]
    */

export default function Settings(props) {
    const [sections, useSections] = useState([{}]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const Labels = () => {
        return (
            <label>
                {
                sections.fields.map((item, index) => {
                    const {value: text, bind: bindTemp, reset: resetTemp} = useInput('');
                    return (
                        <input type={item.type} placeholder={item.placeholder} {...bindTemp} />
                    )
                })
                }
            </label>
        )
    }

    return(
        <div className={styles.settingsContainter}>
            {
                sections.map((item, index) => {
                    return <span>{item.name}</span>
                })
            }
            <div className={styles.settings}>
                <form onSubmit={handleSubmit}>
                {
                    sections.map((item, index) => {
                        if(item.active == true) {
                            return (
                            {Labels}
                            )
                        }
                    })
                }
                <input type='submit' value='Confirm' />
                </form>
            </div>
        </div>
    )
}