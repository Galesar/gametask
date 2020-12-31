
export default function SquareCard({image, url, size = {width: '130px', height: '130px'}, background = `url(${image})`, action}) {
    return(
        <a href={url}><div onClick={e=> {action()}} className='card'>
        <style jsx>
            {`
            .card {
                background: ${background};
                background-position-x: center;
                border-width: 0px;
                border-color: rgb(0, 0, 0);
                border-style: solid;
                border-radius: 10px;
                width: ${size.width};
                height: ${size.height};
                margin: 10px;
                -webkit-background-size: cover!important;
                -moz-background-size:  cover!important;
                -o-background-size: cover!important;
            }

            `}
        </style>
        </div></a>
    ) 
}