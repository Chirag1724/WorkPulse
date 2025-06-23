import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Graph from './pages/monthlygraph'
import WeeklyGraph from './pages/weeklygraph';
import TeacherSchedule from './pages/schedule';
import TeacherTimeTracking from './pages/stats';
import PunchIn from './pages/punch-in';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/weekly-graph" element={<WeeklyGraph/>}/>
        <Route path="/monthly-graph" element={<Graph />} />
        <Route path='/schedule' element={<TeacherSchedule />}/>
        <Route path='/punch-in' element={<PunchIn/>}/>
        <Route path='/stats' element={<TeacherTimeTracking />}/>
      </Routes>
    </Router>
  );
}
