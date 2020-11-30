import { useEffect, useState } from 'react';
import AvatarCircle from '../../components/avatarCircle/avatarCircle';
import ProjectCarousel from '../../components/carousel/Carousel';
import styles from './index.module.css';

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [background, setBackground] = useState('');


    useEffect(() => {
        items.map((item, index) => {
            if(item.active == true) {
                setBackground(item.pageBackground)
            }
        })
        console.log(background)
    }, [items])


    const initItems = (array) => {
        setItems(array)
    }

    return(
        <div>
            <style jsx>
             {`
             .background-Page {
                height: 100vh;
                background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8) ), url('${background}') no-repeat !important;
                -webkit-background-size: cover;
                -moz-background-size:  cover;
                -o-background-size: cover;
                background-size: cover!important;
                overflow: hidden;
                z-index: 0;
                opacity: 0%;
                display: none!important;
                }
             .background-Page-Active {
                height: 100vh;
                background: linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9) ), url('${background}') no-repeat !important;
                -webkit-background-size: cover;
                -moz-background-size:  cover;
                -o-background-size: cover;
                background-size: cover!important;
                overflow: hidden;
                z-index: 0;
                opacity: 100%;
                animation: myfadeIn 0.5s; 
             }
             @keyframes myfadeIn {
                0%   { opacity: 0; }
                100% { opacity: 1; }
              }
             `}
            </style>
            {
                items.map((item, index) => {
                    if(item.active == true) {
                        return(
                            <div className="background-Page-Active"> </div>
                        )
                    }
                    else return (
                        <div className="background-Page"> </div>
                    )
                })
            }
        <div className={styles.profile}>
        <AvatarCircle avatar="https://www.nihilist.li/wp-content/uploads/2019/06/Naruto_Part_1.png" name="Alkes" url="/profile/1" />
        </div>
        <div className={styles.carouselContainer}>
        <ProjectCarousel updateBackground={initItems}/>
        </div>
    </div>
    )
}