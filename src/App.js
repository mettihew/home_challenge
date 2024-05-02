import Body from "./components/Body"
import Search from "./pages/Search"
import Header from "./components/Header"
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return(
    <div className="app">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<Body />} />
        <Route path={'/:id'} element={<Search />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App