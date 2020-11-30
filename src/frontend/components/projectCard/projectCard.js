import styles from '../projectCard/projectCard.module.css';

export default function ProjectCard({name, active, backgroundStyle}) {
     if(active == true) {
         return (
             <div>
                <style jsx>{`
                    .projectBackground {
                     background: linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), ${backgroundStyle} no-repeat center;
                     background-size: cover;

                    }
             `}</style>
             <div className={`${styles.projectCard} ${styles.active} projectBackground`}></div></div>
         )
     }
     else if(active == 'new') {
         return(
            <div>
            <style jsx>{`
                .projectBackground {
                 background: #242425;
                 bottom: 12px;
                }
                .text {
                    position: relative;
                    top: 50%;
                    font-size: 20px;
                    -moz-text-shadow:0 0 5px #cce3fa;
                    -webkit-text-shadow:0 0 5px #cce3fa;
                    text-shadow:0 0 5px #cce3fa;
                    -webkit-user-select: none;
                    -moz-user-select: none;   
                    -ms-user-select: none;
                    color: #cce3fa;
                }
         `}</style>
         <div className={`${styles.projectCard} projectBackground`}><span className="text">Create project</span></div></div>
         )
     }
     else
     return(
         <div>
            <style jsx>{`
                .projectBackground {
                background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), ${backgroundStyle} no-repeat center;
                background-size: cover;
                }
            `}</style>
            <div className={`${styles.projectCard} ${styles.background} projectBackground`} ></div>
         </div>
     )
}