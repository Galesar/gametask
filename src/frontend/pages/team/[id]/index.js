import { useRouter } from 'next/router'
import AvatarCircle from '../../../components/avatarCircle/avatarCircle';
import ObjectContainer from '../../../components/objectContainer/objectContainer';
import SettingsButton from '../../../components/settingsButton/settingsButton';
import SquareCard from '../../../components/squareCard/squareCard';
import StatContainer from '../../../components/statContainer/statContainer';
import styles from './index.module.css'

export default function Team() {
    const router = useRouter();
    const { id } = router.query

    const data = {
        name: 'SRE',
        background: 'https://cdna.artstation.com/p/assets/images/images/001/063/820/4k/nicolas-chacin-albireopantalla.jpg?1439252405'
    }

    const boardCard = () => {
        return (
            <div className={styles.boardCard}>
                <SquareCard image={'https://www.noupe.com/wp-content/uploads/2020/03/undeaddk-819x1024.jpg'} />
                <div className={styles.boardCardTasks}>
                    <span>
                        Emergency: 1
                    </span>
                    <span>
                        In Progress: 5
                    </span>
                    <span>
                        Ready To Dev: 3
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <style jsx global>
                {`
                body{
                    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8) ), url('${data.background}') no-repeat !important;
                    -webkit-background-size: cover;
                    -moz-background-size:  cover;
                    -o-background-size: cover;
                    background-size: cover!important;
                    overflow: hidden;
                }
                `}
            </style>
            <div>
                <SettingsButton url={`/team/${id}/settings`}/>
            </div>

            <div className={styles.teamContainer}>
                <AvatarCircle avatar={"https://i.pinimg.com/originals/4d/f6/20/4df6204f4c9b9b722bd2c45917147d88.jpg"}/>
                <h2>{data.name}</h2>
            </div>


            <div className={styles.topMembers}>
                <StatContainer title={"MVP"}/>
            </div>
            
            <div className={styles.statContainer}>
                <StatContainer />
            </div>

            <div className={styles.achievmentsContainer}>
                <span>Achievments:</span>
                <ObjectContainer objects={[
                    <h2>Coming soon...</h2>
                ]}/>
            </div>

            <div className={styles.boardContainer}>
                <h2>Active tasks:</h2>
                <ObjectContainer objects={[
                    boardCard(), boardCard(), boardCard()
                ]} />
            </div>
        </div>
    )

}