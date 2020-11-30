import styles from './statContainer.module.css';

export default function StatContainer(props) {

    let title;
    if (props.title) {
        title = props.title;
    }
    else title = "Statistics";

    return (
        <div className={styles.statContainer}>
            <h3>{title}:</h3>
            {/* <h2>Created Tasks: 162</h2>
            <h2>Achievments unlocked: 4</h2>
            <h2>Complited Tasks: 160</h2>
            <h2>Level: 2</h2>
            <h2>Exp: 1034/2000</h2>
            <h2>MVP: Naruto</h2> */}
            <h2>Coming Soon...</h2>
        </div>
    )
}