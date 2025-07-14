import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Sender } from './pages/sender'
import { Reciver } from './pages/reciver'
import { Homepage } from './pages/homePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sender' element={<Sender />} />
        <Route  path='/reciver' element={<Reciver />}/>
        <Route path='/' element={<Homepage />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
