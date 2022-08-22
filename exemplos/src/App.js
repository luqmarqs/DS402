//estrutura básica de um componente criado por função

import React from 'react';
import Exemplo01 from './components/Exemplo01';
import Exercicio from './components/Exercicio';
import NumeroAleatorio from './components/NumeroAleatorio';
import Card from './components/Card/Card';
import "./App.css"

function App() {
  return (
    <div className="App">
      <h1>Exemplos com React</h1>
      <div className="cards">
      <Card titulo="Exemplo01">
        <Exemplo01 nome="Lucas" idade={28}/>
      </Card>
      <br></br>
      <Card titulo="Exercício">
        <Exercicio nome="Lucas" nota={7} />
      </Card>
      <br></br>
      <Card titulo="Número Aleatório">
        <NumeroAleatorio min={ 20 } max={ 40 }/> 
      </Card>
      <br></br>
      </div>
      

    </div>
  );
}

export default App;
