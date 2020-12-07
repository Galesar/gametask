import NewsCard from "../../../components/newsCard/newsCard";
import ObjectContainer from "../../../components/objectContainer/objectContainer";
import SettingsButton from "../../../components/settingsButton/settingsButton";
import SquareCard from "../../../components/squareCard/squareCard";
import styles from './index.module.css';
import { useRouter } from 'next/router'
import StatContainer from "../../../components/statContainer/statContainer";

export default function Project() {

    const router = useRouter();
    const { project } = router.query

    const data = {
        projectName: 'Game Task',
        background: 'https://cdna.artstation.com/p/assets/images/images/001/708/712/medium/emmanuel-shiu-xwing-eshiu-2k.jpg?1451414006',
        boards: [
            {
                id: '26232020',
                background: 'https://www.frontendarts.com/service/images/cloud-adopt.jpg'
            },
            {
                id: '26151120',
                background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzWS3tgeURxWKt95thgsT3V7NUJKvJBrqqw&usqp=CAU'
            },
            {
                id: '12311200',
                background: 'https://render.fineartamerica.com/images/rendered/default/print/7/8/break/images/artworkimages/medium/1/burning-money-reuven-gayle.jpg'
            }
        ],
        teams: [
            {
                id: '123456',
                background: 'https://i.pinimg.com/originals/03/38/0c/03380cf66fd8aa8f55bb3476648e54ca.jpg'
            },
            {
                id: '542552',
                background: 'https://www.dragonspears.com/hubfs/images/blog/the-sre-model-and-its-business-implications-1260x630px.png'
            },
        ]        
    }

    const arrObjects = (array) => {
        const arrObjects = [];
        array.map((item, index) => {
            arrObjects.push(<SquareCard image={item.background} url={`/board/${item.id}`} />)
        })
        return arrObjects;
    }

    return (
        <div>
            <SettingsButton url={`/project/${project}/settings`}/>
            <div className={styles.statContainer}>
            <StatContainer />
            </div>
            <div className={styles.projectName}>
                <h1>{data.projectName}</h1>
            </div>
            
            <div className={styles.news}>
            <h2>News</h2>
            <ObjectContainer objects={[
                <NewsCard />
            ]}/>
            </div>

            <div className={styles.cardContainer}>
            <h2>Teams</h2>
            <ObjectContainer objects={arrObjects(data.teams)}/>

            <h2>Boards</h2>
            <ObjectContainer  objects={arrObjects(data.boards)}/>
            </div>

            <style jsx global>
                {`
                body{
                    background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${data.background}') no-repeat !important;
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
}