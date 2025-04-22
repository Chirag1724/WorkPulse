import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dasboard'
import Graph from './monthlygraph'
 

function App() {
  const [count, setCount] = useState(0)

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monthly-graph" element={<Graph />} />
      </Routes>
    </Router>
  )

  } 

export default App
