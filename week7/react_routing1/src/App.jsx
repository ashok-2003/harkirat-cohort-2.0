import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Landing = lazy(() => import('./pages/Landing'));

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => { navigate('/') }}>Landing page</button>
      <button onClick={() => { navigate('/dashboard') }}>Dashboard page</button>
    </div>
  );
}

export default App;

