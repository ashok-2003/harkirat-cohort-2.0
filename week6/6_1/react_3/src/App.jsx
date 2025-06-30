import { useMemo } from 'react';
import { useState } from 'react'
// we will use the use memo as the counter is change then again re-render happen then expensive for loop gets called that's 
// the main issue here so to fix that 
// use memo function here 
function App() {
  const [count , setcount] = useState(0);
  const [inputvalue , setinputvalue] = useState(0);
  // as the app get re render when the setinput get called here so now for that 
  let ans = useMemo(()=>{
    let finalans = 0
    console.log("this has run ")
    for(let i = 1; i <= inputvalue; i++){
      finalans += i;
    }
    return finalans;
  },[inputvalue]);

  return (
    <div>
      <input onChange={function(e){
        setinputvalue(e.target.value)
      }} placeholder='enter the number for the sum from 1 to n' /> <br />

      <div> the sum is {ans}</div>

      <button onClick={function(){
        setcount(count+1)
      }}>counter({count})</button>

    </div>
  )
}

export default App
