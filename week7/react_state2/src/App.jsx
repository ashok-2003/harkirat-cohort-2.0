import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { countAtom, evenSelector } from './store/atom/count'
import { useState , useEffect, useMemo } from 'react'

function App() {
  return (
    <div>
      <Count />
    </div>
  )
}
function Count(){
  //any thiing that uses the recoil logic should be the main parent from where recoil logic started using should be 
  // warapped inside the reciol route as the name say it is the root 


  // used the even renderer here as recoil root is defined here 
  return <div>
    <RecoilRoot>
      <CountRender />  
      <Buttons />
      <Evenrender />  
    </RecoilRoot>
  </div>
}
function CountRender(){
  const count = useRecoilValue(countAtom);  // so as this only need the count value so we are giving this only here 
  return <div>
    <b>
      {count}
    </b>
  </div>
}
function Buttons(){
  console.log("button  re-renders")
  const setcount = useSetRecoilState(countAtom);   // using the set recoil state and as the count in not here so it will make 
  // the re-rendiring of the buttton stop here 
  return <div>
    <button onClick={() =>{
      setcount(count => count +1);
    }}>
      Increase
    </button>
    <button onClick={() =>{
      setcount(count => count-1) // this is just the function that take the count and update it what ever inside it 
    }}>
      Decrease
    </button>
  </div>
}

/*
function Evenrender(){
  console.log("even-render re-renderd")
  // so now this function will give output when the count become even 
  // but this way is not right it should be wrapped inside the use memo and dependicy as count 
  // as whenever the count changes then only it should re-render not in the other case 
  const count = useRecoilValue(countAtom);
  const iseven  = useMemo(() =>{
    return count% 2 == 0;
  }, [count]); // added this as dependicy here 
  
  return <div>{
      iseven ? "is even" : ""}
    </div>
  
}
*/

function Evenrender(){
  // so this is using the even selector function which is the good way when you are using the recoil so we do't
  // want to use the use memo function here 
  const iseven = useRecoilValue(evenSelector)
  return <div>{
    iseven ? "is even" : ""}
  </div>

}


export default App
