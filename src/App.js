import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {

  const [tarefas, setTarefas] = useState([]);
  
  const [input, setInput] = useState('');
  
  //SUBSTITUI COMPONENTE O COMPONENTE DID MOUNT
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas');
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, []);

  //SUBSTITUI COMPONENTE DID UPDATE 
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  /*
  function handlerAdd(){
    setTarefas([...tarefas, input]);
    setInput('');
  }*/

  // REACRIADO APENAS QUANDO PRECISAMOS UTILIZAR
  const handlerAdd = useCallback(() => {
    setTarefas([...tarefas, input]);
    setInput('');
  }, [tarefas, input]);

  // RETORNA CALCULO QUANDO EU QUISER
  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);
  
  return (
    <div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul><br />
      <strong> Você tem { totalTarefas } tarefas!</strong><br/>
      <input type="text" value={input}
        onChange={(e) => setInput(e.target.value)} />
     <button type="button" onClick={handlerAdd}>Adicionar</button>
    </div>
  );
}

export default App;
