import { useRouter } from "next/router";
import { useState } from "react";
import AvatarCircle from "../../../../components/avatarCircle/avatarCircle";
import List from "../../../../components/list/list";
import SettingsButton from "../../../../components/settingsButton/settingsButton";

import styles from './index.module.css';

export default function Board() {
    const router = useRouter();
    const {project, board} = router.query;

    const [data, setData] = useState({
        name: "Shrek reloaded by emergency",
        background: "https://i.pinimg.com/originals/9a/1d/17/9a1d17bac520a63e10ca9e58c73d0c80.jpg",
        lists: [{}],
        tasks: [{}]
    });

    return (
        <div>
            <SettingsButton url={`/${project}/${board}/settings`} />
            <style jsx global>
                {`
                body {
                    overflow-y:auto;
                    background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${data.background}') no-repeat !important;
                    -webkit-background-size: cover!important;
                    -moz-background-size:  cover!important;
                    -o-background-size: cover!important;
                }
                `}
            </style>
            <div className={styles.boardNameContainer}>
                <AvatarCircle avatar={"https://media.timeout.com/images/62555/630/472/image.jpg"} />
                <h2>{data.name}</h2>
            </div>

            <div className={styles.taskContainer}>
                <List list={{name: 'TEST LIST'}} tasks={[{
                    name: '[DEVELOPMENT] testing',
                    img: "https://pm1.narvii.com/7340/182046ee88b075a8997b33e22124e97ceec62ffbr1-600-814v2_uhq.jpg"
                }, {
                    name: '[DEVELOPMENT] Hello world',
                    img: "https://geekhero.ru/wp-content/uploads/2014/07/x_c7e8676b-550x356.jpg"
                }, {
                    name: '[DEVELOPMENT] NANI??',
                    img: "https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/Sasuke-Feature.jpg"
                }, {
                    name: '[DEVELOPMENT] NANI??',
                    img: "https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/Sasuke-Feature.jpg"
                }]} />

                <List list={{name: 'TEST LIST'}} tasks={[{
                    name: '[DEVELOPMENT] testing',
                    img: "https://pm1.narvii.com/7340/182046ee88b075a8997b33e22124e97ceec62ffbr1-600-814v2_uhq.jpg"
                }, {
                    name: '[DEVELOPMENT] Hello world',
                    img: "https://geekhero.ru/wp-content/uploads/2014/07/x_c7e8676b-550x356.jpg"
                }, {
                    name: '[DEVELOPMENT] NANI??',
                    img: "https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/Sasuke-Feature.jpg"
                }, {
                    name: '[DEVELOPMENT] NANI??',
                    img: "https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/Sasuke-Feature.jpg"
                }]} />
                
                
            </div>
        </div>
    )
}