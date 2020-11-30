
export default function SquareCard({image, url}) {
    return(
        <a href={url}><div className='card'>
        <style jsx>
            {`
            .card {
                background: url(${image});
                background-size: cover;
                border-width: 0px;
                border-color: rgb(0, 0, 0);
                border-style: solid;
                border-radius: 10px;
                width: 130px;
                height: 130px;
                margin: 10px;
            }

            `}
        </style>
        </div></a>
    ) 
}