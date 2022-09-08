export default function Exercicio(props) {
    let result;
    if(props.nota >= 5)
        result = "Aprovado";
    else
        result = "Reprovado";

    return (

        <div style={{border: 'solid'}}>
            <h1>Seja bem vindo(a) {props.nome}</h1>
            <p>
                Sua média final é: {props.nota}
            </p>
            <p>
                Situação: {result}
            </p>
        </div>
    );
}