import React from 'react'

interface Card {
    id:number;
    name:string;
    email:string;
    password:string;
}

const CardComponent: React.FC<{card:Card}> = ({card}) => {

    return(
        <div className='card'>
            <h1>{card.id}</h1>
            <h3>{card.name}</h3>
            <p>{card.email}</p>
            <p>{card.password}</p>
        </div>
    )
}


export default CardComponent;