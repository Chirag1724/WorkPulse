import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dasboard'
import Graph from './monthlygraph'
import WeeklyGraph from './weeklygraph';
 

function App() {
  const [count, setCount] = useState(0)

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weekly-graph" element={<WeeklyGraph/>}/>
        <Route path="/monthly-graph" element={<Graph />} />
      </Routes>
    </Router>
  )

  } 

export default App
