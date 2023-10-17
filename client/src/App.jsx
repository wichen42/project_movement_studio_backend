import './App.css'
import AppRoutes from './features/AppRoutes'
import Navbar from './features/navbar/Navbar'
import { BrowserRouter as Router} from 'react-router-dom'

function App() {
 
  return (
    <Router>
      <div className="app">
        <h1>React on Rails Posts</h1>
        <Navbar />
        <AppRoutes />
      </div> 
   </Router>
  )
}

export default App
