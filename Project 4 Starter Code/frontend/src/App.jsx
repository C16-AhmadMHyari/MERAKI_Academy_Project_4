import React from 'react'
import "./App.css";
import Navbar from "./components/shared components/Navbar"
import Login from './components/shared components/Login';
import { Route, Routes,Link } from 'react-router-dom';
const App = () => {
  return (
   <div className="App">
      <h1>OneHand</h1>
      <Navbar/>
      <Routes >
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App
