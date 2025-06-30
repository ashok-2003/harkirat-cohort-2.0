import React , { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  // this satate and function should be defined within this scope here 
  const[title , setTitle] = useState("ashok");
  function Titlechange(){
      setTitle(Math.random); // call it direction as function can not be called in the div as it is xml file thier 
  }
  return (
      <div>
        <button onClick={Titlechange}>click me to change the title</button>
        <Header title={title}></Header>
        <Header title='sumit'></Header>
        <Header title='sumit'></Header>
        <Header title='sumit'></Header>
        <Header title='sumit'></Header>
      </div>  
  )
  // so now here is the first way in which we will make the re-render less by pushing the state down 

  // return(
  //   <div>
  //     <HeaderwithButton></HeaderwithButton>
  //     <Header title='sumit'></Header>
  //   </div>
  // )


}
const Header = React.memo(function Header({title}){
  return <div>
      {title}
    </div>
})

// making the another component which will have state in this so this will reduce the re-render 
function HeaderwithButton(){
  const[title , setTitle] = useState("ashok");
  function changetitle(){
    setTitle(Math.random);
  }

  // so now this is component so this shoudl return this 
  return <>
  <button onClick={changetitle}>click me to change the title</button>
  <Header title={title}></Header>
  </>

}


export default App
