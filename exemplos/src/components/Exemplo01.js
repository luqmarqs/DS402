import VerificaIdade from "./VerificaIdade";

export default function Exemplo01(props) {
    let idadeIdeal = props.idade >= 18 ? props.idade : 18;

    return (
        <div>
            <h1>Primeiro componente!</h1>
            <p>
                Exemplo de componente com React.
                Bem vindo, {props.nome}!
            </p>
            <p>
                Idade ideal para dirigir: { idadeIdeal }
            </p>
            <VerificaIdade nome={ props.nome } idade={ props.idade } />
        </div>

        );
}