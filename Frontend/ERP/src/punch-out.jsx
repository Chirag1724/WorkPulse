// import React, { useState, useEffect } from 'react';

// function FacultyERPSystem() {
//   // State management
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentUser, setCurrentUser] = useState(null);
//   const [clockedIn, setClockedIn] = useState(false);
//   const [clockInTime, setClockInTime] = useState(null);
//   const [selectedTask, setSelectedTask] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskHistory, setTaskHistory] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [loginError, setLoginError] = useState('');

//   // Mock faculty data
//   const facultyData = [
//     { id: 1, username: 'professor1', password: 'pass123', name: 'Dr. John Smith', department: 'Computer Science' },
//     { id: 2, username: 'professor2', password: 'pass123', name: 'Dr. Sarah Johnson', department: 'Mathematics' },
//     { id: 3, username: 'professor3', password: 'pass123', name: 'Prof. Michael Chen', department: 'Physics' },
//   ];

//   // Task types
//   const taskTypes = [
//     { id: 'teaching', name: 'Teaching' },
//     { id: 'research', name: 'Research' },
//     { id: 'advising', name: 'Student Advising' },
//     { id: 'admin', name: 'Administrative Work' },
//     { id: 'meeting', name: 'Faculty Meeting' },
//   ];

//   // Update clock every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
    
//     return () => clearInterval(timer);
//   }, []);

//   // Handle login
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const faculty = facultyData.find(f => f.username === username && f.password === password);
    
//     if (faculty) {
//       setCurrentUser(faculty);
//       setIsLoggedIn(true);
//       setLoginError('');
//     } else {
//       setLoginError('Invalid username or password');
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     if (clockedIn) {
//       if (!window.confirm('You are still clocked in. Do you want to clock out and logout?')) {
//         return;
//       }
//       handleClockOut();
//     }
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     setUsername('');
//     setPassword('');
//   };

//   // Handle clock in
//   const handleClockIn = () => {
//     const now = new Date();
//     setClockedIn(true);
//     setClockInTime(now);
    
//     // Add clock-in record to history
//     setTaskHistory(prev => [...prev, {
//       type: 'clock-in',
//       time: now,
//       description: 'Clocked in for the day'
//     }]);
//   };

//   // Handle clock out
//   const handleClockOut = () => {
//     const now = new Date();
//     setClockedIn(false);
    
//     // Calculate hours worked
//     const hoursWorked = ((now - clockInTime) / (1000 * 60 * 60)).toFixed(2);
    
//     // Add clock-out record to history
//     setTaskHistory(prev => [...prev, {
//       type: 'clock-out',
//       time: now,
//       description: `Clocked out after ${hoursWorked} hours`
//     }]);
//   };

//   // Handle task submission
//   const handleTaskSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedTask || !taskDescription) return;
    
//     const now = new Date();
    
//     // Add task record to history
//     setTaskHistory(prev => [...prev, {
//       type: 'task',
//       taskType: selectedTask,
//       time: now,
//       description: taskDescription
//     }]);
    
//     // Reset form
//     setSelectedTask('');
//     setTaskDescription('');
//   };

//   // Format time
//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       second: '2-digit' 
//     });
//   };

//   // Format date
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long',
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   // Login form
//   const LoginForm = () => (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Faculty ERP Login</h2>
//       {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
//       <form onSubmit={handleLogin}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="submit"
//         >
//           Login
//         </button>
//       </form>
//       <div className="mt-4 text-sm text-gray-600">
//         <p>Demo accounts:</p>
//         <ul className="list-disc pl-5">
//           <li>Username: professor1, Password: pass123</li>
//           <li>Username: professor2, Password: pass123</li>
//         </ul>
//       </div>
//     </div>
//   );

//   // Dashboard
//   const Dashboard = () => (
//     <div className="max-w-6xl mx-auto p-4">
//       <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center rounded-lg">
//         <div>
//           <h1 className="text-2xl font-bold">Faculty ERP System</h1>
//           <p className="text-gray-600">{formatDate(currentTime)} | {formatTime(currentTime)}</p>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-6">
//             <p className="font-semibold">{currentUser.name}</p>
//             <p className="text-sm text-gray-600">{currentUser.department}</p>
//           </div>
//           <button
//             className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="grid gap-6 md:grid-cols-3">
//         {/* Clock In/Out Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Time Tracking</h2>
//           <div className="mb-4">
//             <p className="text-gray-700">Status: <span className={`font-bold ${clockedIn ? 'text-green-600' : 'text-red-600'}`}>
//               {clockedIn ? 'Clocked In' : 'Clocked Out'}
//             </span></p>
//             {clockedIn && (
//               <p className="text-gray-700">Clocked in at: {formatTime(clockInTime)}</p>
//             )}
//           </div>
//           {clockedIn ? (
//             <button
//               className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//               onClick={handleClockOut}
//             >
//               Clock Out
//             </button>
//           ) : (
//             <button
//               className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//               onClick={handleClockIn}
//             >
//               Clock In
//             </button>
//           )}
//         </div>

//         {/* Task Recording Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Record Task</h2>
//           {clockedIn ? (
//             <form onSubmit={handleTaskSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2" htmlFor="taskType">Task Type</label>
//                 <select
                
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="taskType"
//                   value={selectedTask}
//                   onChange={(e) => setSelectedTask(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Task Type</option>
//                   {taskTypes.map(task => (
//                     <option key={task.id} value={task.id}>{task.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2" htmlFor="taskDesc">Description</label>
//                 <textarea
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="taskDesc"
//                   rows="3"
//                   value={taskDescription}
//                   onChange={(e) => setTaskDescription(e.target.value)}
//                   required
//                 ></textarea>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                 type="submit"
//               >
//                 Record Task
//               </button>
//             </form>
//           ) : (
//             <div className="text-center p-4 border border-gray-200 rounded-md bg-gray-50">
//               <p className="text-gray-600">Please clock in to record tasks</p>
//             </div>
//           )}
//         </div>

//         {/* Today's Summary Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
//           {taskHistory.length > 0 ? (
//             <div className="max-h-64 overflow-y-auto">
//               {taskHistory.map((entry, index) => (
//                 <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-0">
//                   <div className="flex justify-between">
//                     <p className="font-semibold">
//                       {entry.type === 'task'
//                         ? taskTypes.find(t => t.id === entry.taskType)?.name
//                         : entry.type === 'clock-in'
//                           ? 'Clock In'
//                           : 'Clock Out'}
//                     </p>
//                     <p className="text-sm text-gray-600">{formatTime(entry.time)}</p>
//                   </div>
//                   <p className="text-gray-700 text-sm">{entry.description}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600 text-center">No activity recorded today</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   // Render login form or dashboard based on auth state
//   return isLoggedIn ? <Dashboard /> : <LoginForm />;
// }

// export default FacultyERPSystem;