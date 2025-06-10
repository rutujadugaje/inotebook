import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Navbar2 from './Components/Navbar2'
import About from './Components/About'
import NoteState from './context/notes/NoteState';

const App = () => {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar2 />

            <Routes>
              <Route exact path = "/" element={<Home />}/>
              <Route exact path = "/about" element={ <About />} />
            </Routes>

        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App