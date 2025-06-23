import { useState } from 'react';
import { User, Lock, Eye, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FacultyLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Hardcoded credentials as specified
  const validUserId = '24041536';
  const validPassword = 'Chirag@24';
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userId === validUserId && password === validPassword) {
      setLoggedIn(true);
      setError('');
      setTimeout(() => {
        navigate('/Dashboard');
      }, 1500);
    } else {
      setError('Invalid user ID or password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center p-4 font-sans">
      <div className="flex w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl">
        {/* Login Form Section */}
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-10 w-full max-w-lg text-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Log In</h1>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-6 text-sm">
              <span>{error}</span>
            </div>
          )}
          
          <div onSubmit={handleSubmit}>      
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="userId" className="block mb-2 text-sm font-medium">
                  Email or User ID
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 flex items-center">
                    <User size={20} />
                  </span>
                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    className="w-full pl-11 pr-4 py-3 rounded-md border-none bg-white text-gray-800 text-base transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/20"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 flex items-center">
                    <Lock size={20} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="w-full pl-11 pr-12 py-3 rounded-md border-none bg-white text-gray-800 text-base transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/20"
                  />
                  <button
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-none text-gray-500 cursor-pointer flex items-center"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-white"
                  />
                  <label htmlFor="remember-me" className="cursor-pointer">
                    Remember me
                  </label>
                </div>
                
                <div>
                  <button 
                    type="button"
                    className="text-white hover:underline transition-all duration-200 bg-transparent border-none cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full mt-4 py-3.5 rounded-md border-none bg-white text-cyan-600 font-semibold text-base cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0"
              >
                Log In
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm">Or With</p>
            <div className="flex justify-center gap-4">
              <button className="bg-white border-none rounded-full p-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#333"/>
                </svg>
              </button>
              <button className="bg-white border-none rounded-full p-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.8055 10.0415H12V14.0415H17.6515C17.2555 15.5715 16.2895 16.3055 14.9435 16.7815C13.9355 17.1205 12.7675 17.2125 11.6505 16.9825C10.0175 16.6535 8.71752 15.6445 8.01352 14.2845C7.74352 13.7485 7.56752 13.1585 7.49952 12.5415C7.41352 11.7965 7.49952 11.0385 7.72352 10.3315C7.87052 9.83149 8.09152 9.36449 8.38752 8.94749C9.11352 7.88649 10.1935 7.12649 11.4325 6.81749C12.3415 6.59349 13.2995 6.61149 14.1995 6.85349C15.0105 7.07749 15.7465 7.54449 16.3055 8.16849C16.4855 7.98849 18.6105 5.86849 18.7835 5.70249C16.7415 3.78149 14.2585 2.70149 11.4905 3.01049C9.20252 3.27249 7.18352 4.45049 5.83752 6.16249C4.94552 7.28649 4.34852 8.62449 4.06252 10.0535C3.76152 11.5315 3.85052 13.0725 4.32252 14.4995C4.84052 16.0675 5.76352 17.4135 7.03352 18.4175C8.41652 19.5055 10.0595 20.1145 11.7815 20.2065C13.3615 20.2905 14.9505 20.0175 16.3685 19.3145C18.2065 18.4175 19.5175 16.7755 20.0895 14.8585C20.5125 13.5245 20.6175 11.9515 20.3095 10.5175C20.2645 10.3595 21.8055 10.0415 21.8055 10.0415Z" fill="#4285F4"/>
                </svg>
              </button>
              <button className="bg-white border-none rounded-full p-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 flex items-center justify-center">
                <Twitter size={24} className="text-blue-400" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="flex-1 bg-white flex items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-lg p-8 relative text-center">
            <img 
              src="/src/assets/Login.jpg" 
              alt="Secure login illustration" 
              className="w-full h-auto max-h-96 object-contain mb-6"
            />
            <div className="mt-6 text-gray-800">
              <h2 className="text-3xl font-bold mb-2 text-cyan-600">Welcome Back!</h2>
              <p className="text-gray-600 text-base max-w-sm mx-auto">
                Sign in to access your account and manage your tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {loggedIn && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-2xl animate-fade-in">
            <svg className="w-14 h-14 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle 
                className="animate-draw-circle" 
                cx="26" 
                cy="26" 
                r="25" 
                fill="none"
                stroke="#00acc1"
                strokeWidth="2"
                strokeDasharray="166"
                strokeDashoffset="166"
              />
              <path 
                className="animate-draw-check" 
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                stroke="#00acc1"
                strokeWidth="3"
                strokeDasharray="48"
                strokeDashoffset="48"
              />
            </svg>
            <p className="text-gray-800 text-xl font-semibold mb-2">Login successful!</p>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes draw-circle {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-draw-circle {
          animation: draw-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .animate-draw-check {
          animation: draw-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
      `}</style>
    </div>
  );
}

export default FacultyLogin;