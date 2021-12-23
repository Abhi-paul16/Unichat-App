import React from "react"

import {  Routes, Route } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext"

import Chats from "./Chats"
import Login from "./Login"


function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      
        <AuthProvider>
          <Routes>
            <Route path="/chats" element={<Chats/>} /> 
            <Route path="/" element={<Login/>} /> */
          </Routes>
        </AuthProvider>
      
    </div>
  )
}

export default App
