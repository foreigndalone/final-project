import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputWithLabel from './components/userData/InputWithLabel'
import { Routes, Route } from "react-router"

import SignUp from './pages/SignUp'
import Main from './pages/Main'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </>
  )
}

export default App
