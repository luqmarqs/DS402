//estrutura básica de um componente criado por função

import React from 'react';
import Exemplo01 from './components/Exemplo01';
import Exercicio from './components/Exercicio';
import NumeroAleatorio from './components/NumeroAleatorio';

function App() {
  return (
    <div className="App">
      <h1>Teste.......</h1>
      <Exemplo01 nome="Lucas"/>
      <br></br>
      <Exercicio nome="Lucas" nota={7} />
      <br></br>
      <NumeroAleatorio min={ 20 } max={ 40 }/> 

    </div>
  );
}

export default App;
