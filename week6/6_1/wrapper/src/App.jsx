// so now here we have to create an app that use the useeffect to fetch the data here
import axios from "axios";
import { useEffect, useState } from "react"

function App() {
  const [selected , setSelected] = useState(1);
  return (
    <div> 
      <button onClick={()=>{setSelected(1)}}>1</button>
      <button onClick={()=>{setSelected(2)}}>2</button>
      <button onClick={()=>{setSelected(3)}}>3</button>
      <button onClick={()=>{setSelected(4)}}>4</button>
      <button onClick={()=>{setSelected(5)}}>5</button>
      <button onClick={()=>{setSelected(6)}}>6</button>
      <button onClick={()=>{setSelected(7)}}>7</button>
       <Todo id={selected} ></Todo>
    </div>
  )

}
// example of the custom hooks 
function useTodo({id}){
  const [todos , setTodos] = useState({}); // not array we have to get the particualr element here

  useEffect(() =>{
    axios.get("https://jsonplaceholder.typicode.com/todos/"+id)
      .then(function(response){
        setTodos(response.data)
      })
  } , [id]);
}
function Todo({id}){
  const todos = useTodo(id);   // makes the code much cleaner here 
  return <div>
    <h1>{todos.title}</h1>
    <h4>{todos.completed ? 'completed' : 'pending'}</h4>
  </div>
}

export default App
