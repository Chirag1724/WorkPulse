import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dasboard'
import Graph from './monthlygraph'
import WeeklyGraph from './weeklygraph';
import Login from './Login';
import TeacherTimeTracking from './stats';
import TeacherSchedule from './schedule';
 

function App() {
  const [count, setCount] = useState(0)

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/weekly-graph" element={<WeeklyGraph/>}/>
        <Route path="/monthly-graph" element={<Graph />} />
        <Route path='/stats' element={<TeacherTimeTracking />}/>
        <Route path='/schedule' element={<TeacherSchedule />}/>
      </Routes>
    </Router>
  )

  } 
  
export default App
