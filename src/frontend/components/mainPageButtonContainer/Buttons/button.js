import styles from './button.module.css';

export default function Button(props) {
    let buttonStyle = styles.mainPage;
    if(props.style == 'Empty'){
        buttonStyle = styles.mainPageEmpty;
    }

    return(
        <a href={props.link} className={buttonStyle}>
            {props.text}
        </a>
    )
}