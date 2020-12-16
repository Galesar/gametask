import ProjectCard from '../projectCard/projectCard';
import ProjectCardName from '../projectCardName/projectCardName';
import styles from '../carousel/Carousel.module.css';

export default function ProjectCarousel(props) {

    const changeItemsToRight = (e) => {
        props.setUserProjectData(prevState => {
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
        props.setUserProjectData(prevState => {
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
        props.setUserProjectData(prevState => {
            console.log(prevState)
            for(let i = 0; i < prevState.length; i++) {
                if(prevState.length - 1 == index) break;
                if(prevState[i].active === true) {
                    prevState[i].active = false;
                    prevState[index].active = true;
                    console.log(prevState[index])
                    break;
                }   
            }
            const newArr = [...prevState];
            props.updateBackground(newArr);
            return newArr;
        })
    }

    return(
        <div className={styles.projectSlider}>
            {
               props.userProjectData.map((item, index) => {
                    return(
                        <div tabIndex="0"
                
                         onMouseDown={e => changeItemToId(index)}
                         onKeyDown={e => changeItemsToButton(e)}
                         className={styles.divWithoutFocus}
                         >
                            <ProjectCardName name={item.name} active={item.active}/>
                            <a href="#"><ProjectCard active={item.active} name={item.name} backgroundStyle={item.preview}/></a>
                        </div>
                    )
                })
            }
        </div>
    )
} 