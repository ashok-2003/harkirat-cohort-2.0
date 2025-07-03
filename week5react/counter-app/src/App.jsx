import { useState } from "react";

function App() {
  const [Todos , setTodos] = useState([{
    Title : "go to market",
    Description : "go to market 7 - 8",
    Completed : "True"
  },{
    Title : "go to gym",
    Description : "go to gym 8 - 9",
    Completed : "True"
  }]);
  function addTodo(){
    setTodos([...Todos, {
      Title : "new Todo",
      Description : "desc of new todo"
    }])
  }
  return (
    <div>
      <button onClick={addTodo}>Add a random todo</button>
      {Todos.map(function(todo){
        return <Todo Title = {todo.Title} Description = {todo.Description}></Todo>
      })}
    </div>
  );
}
function Todo(props){
  return (
    <div>
      <h2>{props.Title}</h2>
      <h4>{props.Description}</h4>
    </div>
  )
}



export default App;

