import {Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home/Home"
import ImageUpload from "./pages/ImageUpload/ImageUpload"
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/image" element={<ImageUpload/>}/>
    </Routes>
  )
}

export default App
