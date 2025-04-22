import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Dasboard'
import Graph from './monthlygraph'
import WeeklyGraph from './weeklygraph';
import Login from './Login';
<<<<<<< HEAD
=======
import TeacherTimeTracking from './stats';
 
>>>>>>> 1b41b3a4aa4097625bce724ebcc8b2877825984b

function App() {
  const [count, setCount] = useState(0)

  return(
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
=======
        {/* <Route path="/" element={<Login />} /> */}
        <Route path='/' element={<Dashboard/>} />
>>>>>>> 1b41b3a4aa4097625bce724ebcc8b2877825984b
        <Route path="/weekly-graph" element={<WeeklyGraph/>}/>
        <Route path="/monthly-graph" element={<Graph />} />
        <Route path='/stats' element={<TeacherTimeTracking />}/>
      </Routes>
    </Router>
  )

  } 
  
export default App
