// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './components/pages/Index'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';

function App() {
  return (
   <Routes >
      <Route path="/" element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
   </Routes>
  )
}

export default App;
