import styles from './avatarCircle.module.css';

export default function AvatarCircle(props) {
    return(
        <div className={styles.profileContainer}>
            <a href={props.url}>
            <span className={styles.name}>{props.name}</span>
            <div className={`${styles.circle} circleBackground`}>
                <style jsx>
                    {`
                        .circleBackground {
                            background: url('${props.avatar}');
                            -webkit-background-size: cover;
                            -moz-background-size:  cover;
                            -o-background-size: cover;
                            background-size: container!important;
                            -moz-box-shadow:0 0 10px #cce3fa;
                            -webkit-box-shadow:0 0 10px #cce3fa;
                            box-shadow:0 0 10px #cce3fa;
                        }
                    `}
                </style>
            </div>
            </a>
        </div>
    )
}