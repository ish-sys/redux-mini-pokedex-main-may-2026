import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import View from './Pages/View'
import CreateTrainer from './Pages/CreateTrainer'
import Arena from './Pages/Arena'
import MyTeam from './Pages/MyTeam'
import PnF from './Pages/PnF'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1'>
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='view/:id' element={<View />} />
            <Route path='create' element={<CreateTrainer />} />
            <Route path='battle' element={<Arena />} />
            <Route path='myteam' element={<MyTeam />} />
            <Route path='/*' element={<PnF />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
