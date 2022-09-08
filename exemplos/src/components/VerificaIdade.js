import React from "react";

export default function VerificaIdade(props) {
    const situacao = props.idade >= 18 ? "Maior de idade" : "Menor de idade"
    return(
        <div>
            <h2>{ props.nome } é { situacao }</h2>
        </div>
    );
}