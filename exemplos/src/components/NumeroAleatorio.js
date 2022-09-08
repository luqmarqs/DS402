import React from "react";

export default function NumeroAleatorio(props) {
    const { min, max } = props;
    let num = Math.floor(Math.random() * (max - min)) + min;
    console.log("num" + num);
    return(
        
        <div>
            <h1>Número Aleatório: { num }</h1>
        </div>

    );
}