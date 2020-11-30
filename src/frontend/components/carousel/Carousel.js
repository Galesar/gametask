import ProjectCard from '../projectCard/projectCard';
import ProjectCardName from '../projectCardName/projectCardName';
import { useEffect, useState } from "react";
import styles from '../carousel/Carousel.module.css';

export default function ProjectCarousel(props) {

    const [init, setInit] = useState(false);
    const [items, setItems] = useState([{}]);
    useEffect(()=>
    {
        if(!init) {
            initItems();
            setInit(true);
        }
        console.log('refresh items');
    }, [items])

    const data = [
        {
            id: 0,
            name: 'project 1',
            active: true,
            backgroundColor: 'url(https://sun9-39.userapi.com/impf/c840437/v840437350/29fb8/eWTJmaNjDCs.jpg?size=855x685&quality=96&proxy=1&sign=ba2b08367bd2d022a862d90c08f5b213)',
            pageBackground: "https://image.downhdwalls.com/image-sso/toothless-artwork-105880-15.jpg"
        },
        {
            id: 1,
            name: 'project 2',
            active: false,
            backgroundColor: 'url(https://media.comicbook.com/2017/09/naruto-akatsuki-1018641-1280x0.png)',
            pageBackground: "https://i.artfile.me/wallpaper/11-01-2015/1920x1080/anime-naruto-the-last-movie-by-devoiax-s-897926.jpg"
        },
        {
            id: 2,
            name: 'Game Task',
            active: false,
            backgroundColor: "url(gameTask.png)",
            pageBackground: "gameTask.png"
        },
        {
            id: 3,
            name: 'project 4',
            active: false,
            backgroundColor: "url(https://i.pinimg.com/736x/1e/db/8c/1edb8c25511ca6bc436a1faa95aa0a71.jpg)",
            pageBackground: "https://forum.sonicscanf.org/uploads/monthly_2015_08/sky.jpg.133d79587cbb616de3b0f2acfad60a70.jpg"
        },
        {
            id: 4,
            name: 'project 5',
            active: false,
            backgroundColor: "url(https://image.freepik.com/free-vector/ufo-abducts-human-space-ship-ufo-ray-of-light-in-the-night-sky_106421-116.jpg)",
            pageBackground: "https://cdn.fishki.net/upload/post/201511/30/1757673/musicatmosphere-raznoe-the-x-files-ost-663022.jpg"
        },
        {
            id: 5,
            name: 'project 6',
            active: false,
            backgroundColor: "url(https://hdwebbuilder.com/images/15644001815d3eda35874bf9.04592044.jpg)",
            pageBackground: "https://ukit.com/img/logo--with-bg.jpg"
        },
        {
            active: 'new',
        },
    ]


    const changeItemsToRight = (e) => {
        setItems(prevState => {
            for(let i = 0; i < prevState.length; i++) {
                if(prevState[i].active == true) {
                    let counter;
                    if(i + 1 == prevState.length) {counter = 0}
                    else counter = i + 1;
                    if(prevState[counter].active == 'new') {
                        counter = 0;
                    }
                    prevState[i].active = false;
                    prevState[counter].active = true;
                    break;
                }
            }
            const newArr = [...prevState];
            props.updateBackground(newArr);
            return newArr;
        })
    }

    const changeItemsToButton = (e) => {
        if(e.keyCode === 37) changeItemsToLeft();
        else if(e.keyCode === 39) changeItemsToRight();
    }

    const changeItemsToLeft = () => {
        setItems(prevState => {
            for(let i = 0; i < prevState.length; i++) {
                if(prevState[i].active == true) {
                    let counter;
                    if(i == 0) {counter = prevState.length - 1}
                    else counter = i - 1;
                    if(prevState[counter].active == 'new') {
                        counter = prevState.length - 2;
                    }
                    prevState[i].active = false;
                    prevState[counter].active = true;
                    break;
                }
            }
            const newArr = [...prevState];
            props.updateBackground(newArr);
            return newArr;
        })
    }

    const changeItemToId = (index) => {
        setItems(prevState => {
            for(let i = 0; i < prevState.length; i++) {
                if(prevState.length - 1 == index) break;
                if(prevState[i].active === true) {
                    prevState[i].active = false;
                    prevState[index].active = true;
                    break;
                }   
            }
            const newArr = [...prevState];
            props.updateBackground(newArr);
            return newArr;
        })
    }

    const initItems = () => {
        setItems(data);
        props.updateBackground(data)
    }


    return(
        <div className={styles.projectSlider}>
            {
                items.map((item, index) => {
                    return(
                        <div tabIndex="0"
                
                         onMouseDown={e => changeItemToId(index)}
                         onKeyDown={e => changeItemsToButton(e)}
                         className={styles.divWithoutFocus}
                         >
                            <ProjectCardName name={item.name} active={item.active}/>
                            <a href="#"><ProjectCard active={item.active} name={item.name} backgroundStyle={item.backgroundColor}/></a>
                        </div>
                    )
                })
            }
        </div>
    )
} 