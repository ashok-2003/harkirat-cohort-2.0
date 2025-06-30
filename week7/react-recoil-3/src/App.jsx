
import { RecoilRoot, useRecoilValue } from 'recoil'
import './App.css'
import { api_app_atom, appatom, totalcount, } from './Atom/Appatom'

function App() {

  return (
    <>
      <RecoilRoot>
        <Mainapp>

        </Mainapp>
      </RecoilRoot>
    </>
  )
}
function Mainapp(){
  // so now here we will give all the values here 
  const appvalue= useRecoilValue(appatom);
  // so now here we will have all the buttons here 
  const metotal_value = useRecoilValue(totalcount);

  return <div>
    <button>Home</button>
    <button>my Netwrok({appvalue.network})</button>
    <button>Jobs({appvalue.jobs})</button>
    <button>Messaging({appvalue.messaging})</button>
    <button>Notification({appvalue.notification})</button>
    <button>Me({metotal_value})</button>
  </div>
}

export default App
