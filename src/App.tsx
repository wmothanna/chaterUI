import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router'
import Landing from './Pages/Landing'
import NotFound from './Pages/NotFound'
import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
