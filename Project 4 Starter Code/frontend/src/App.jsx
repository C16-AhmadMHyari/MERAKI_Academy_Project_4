import React, {useState,useEffect,useContext} from 'react'
import "./App.css";
import Navbar from "./components/shared components/Navbar"
import Login from './components/shared components/Login';
import Categories from './components/shared components/Categories';
import Register from './components/shared components/Register';
import { Route, Routes,Link } from 'react-router-dom';
import Home from './components/shared components/Home';
import About from './components/shared components/About';


const App = () => {
  return (
   <div className="App">
      <h1>OneHand</h1>
      <Navbar/>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      
    </div>
  )
}

export default App
