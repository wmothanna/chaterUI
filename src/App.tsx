import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router'
import Landing from './Pages/Landing'
import NotFound from './Pages/NotFound'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
