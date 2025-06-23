import { useState } from 'react';
import { User, Lock, Eye, EyeOff, Mail, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function FacultyLogin() {
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Hardcoded credentials as specified
  const validUserId = 'Sati_536';
  const validEmail = 'mm.sati@erp.edu';
  const validPassword = 'Sati@536';
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // Clear any previous errors
    setError('');
    
    // Debug logging
    console.log('Login attempt:', { userInput: userInput.trim(), password: password.trim() });
    console.log('Expected:', { userId: validUserId, email: validEmail, password: validPassword });
    
    // Validate credentials - check if input matches either user ID or email
    const trimmedInput = userInput.trim();
    const trimmedPassword = password.trim();
    
    if ((trimmedInput === validUserId || trimmedInput === validEmail) && trimmedPassword === validPassword) {
      console.log('Login successful!');
      setLoggedIn(true);
      setTimeout(() => {
        navigate('/Dashboard');
      }, 2000);
    } else {
      console.log('Login failed - credentials do not match');
      setError('Invalid email/user ID or password. Please try again.');
      setLoggedIn(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center p-4 font-sans">
      <div className="flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white">
        {/* Login Form Section */}
        <div className="bg-gradient-to-br from-teal-900 to-teal-600 p-10 w-full max-w-lg text-white relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Faculty Portal</h1>
              <p className="text-teal-100 text-sm">Welcome back! Please sign in to your account</p>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                <span>{error}</span>
              </div>
            )}
            
            <div>      
              <div className="flex flex-col gap-6">
                <div>
                  <label htmlFor="userInput" className="block mb-2 text-sm font-medium text-teal-100">
                    Email or User ID
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-slate-600 flex items-center">
                      <User size={20} />
                    </span>
                    <input
                      id="userInput"
                      name="userInput"
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Enter Email or User ID"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-transparent bg-white text-teal-900 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/20 placeholder-slate-600"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-teal-100">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-slate-600 flex items-center">
                      <Lock size={20} />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Enter your Password"
                      className="w-full pl-11 pr-12 py-3 rounded-lg border-2 border-transparent bg-white text-teal-900 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/20 placeholder-slate-600"
                    />
                    <button
                      type="button" 
                      onClick={togglePasswordVisibility}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-none text-slate-600 cursor-pointer flex items-center hover:text-teal-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-white rounded"
                    />
                    <label htmlFor="remember-me" className="cursor-pointer text-teal-100">
                      Remember me
                    </label>
                  </div>
                  
                  <div>
                    <button 
                      type="button"
                      className="text-teal-100 hover:text-white hover:underline transition-all duration-200 bg-transparent border-none cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="w-full mt-4 py-3.5 rounded-lg border-none bg-white text-teal-900 font-semibold text-base cursor-pointer transition-all duration-200 hover:bg-teal-50 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Sign In
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="px-4 text-teal-100 text-sm">Or continue with</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>
              
              <div className="flex justify-center gap-4">
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center backdrop-blur-sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H12V14.0415H17.6515C17.2555 15.5715 16.2895 16.3055 14.9435 16.7815C13.9355 17.1205 12.7675 17.2125 11.6505 16.9825C10.0175 16.6535 8.71752 15.6445 8.01352 14.2845C7.74352 13.7485 7.56752 13.1585 7.49952 12.5415C7.41352 11.7965 7.49952 11.0385 7.72352 10.3315C7.87052 9.83149 8.09152 9.36449 8.38752 8.94749C9.11352 7.88649 10.1935 7.12649 11.4325 6.81749C12.3415 6.59349 13.2995 6.61149 14.1995 6.85349C15.0105 7.07749 15.7465 7.54449 16.3055 8.16849C16.4855 7.98849 18.6105 5.86849 18.7835 5.70249C16.7415 3.78149 14.2585 2.70149 11.4905 3.01049C9.20252 3.27249 7.18352 4.45049 5.83752 6.16249C4.94552 7.28649 4.34852 8.62449 4.06252 10.0535C3.76152 11.5315 3.85052 13.0725 4.32252 14.4995C4.84052 16.0675 5.76352 17.4135 7.03352 18.4175C8.41652 19.5055 10.0595 20.1145 11.7815 20.2065C13.3615 20.2905 14.9505 20.0175 16.3685 19.3145C18.2065 18.4175 19.5175 16.7755 20.0895 14.8585C20.5125 13.5245 20.6175 11.9515 20.3095 10.5175C20.2645 10.3595 21.8055 10.0415 21.8055 10.0415Z" fill="white"/>
                  </svg>
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center backdrop-blur-sm">
                  <Mail size={24} className="text-white" />
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center backdrop-blur-sm">
                  <Twitter size={24} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="flex-1 bg-gradient-to-br from-cyan-50 to-white flex items-center justify-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-teal-500/10 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-teal-600/10 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-teal-500 rounded-full"></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-teal-600 rounded-full"></div>
          
          <div className="w-full max-w-lg p-8 relative text-center z-10">
            <img 
              src="/src/assets/Login.jpg" 
              alt="Secure login illustration" 
              className="w-full h-auto max-h-96 object-contain mb-6 rounded-2xl shadow-lg"
            />
            <div className="mt-6 text-gray-800">
              <h2 className="text-3xl font-bold mb-2 text-teal-900">Welcome Back!</h2>
              <p className="text-slate-600 text-base max-w-sm mx-auto">
                Sign in to access your account and manage your tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {loggedIn && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-2xl animate-fade-in">
            <svg className="w-14 h-14 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle 
                className="animate-draw-circle" 
                cx="26" 
                cy="26" 
                r="25" 
                fill="none"
                stroke="#0d9488"
                strokeWidth="2"
                strokeDasharray="166"
                strokeDashoffset="166"
              />
              <path 
                className="animate-draw-check" 
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                stroke="#0d9488"
                strokeWidth="3"
                strokeDasharray="48"
                strokeDashoffset="48"
              />
            </svg>
            <p className="text-teal-900 text-xl font-semibold mb-2">Login successful!</p>
            <p className="text-slate-600">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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
        
        @keyframes loading-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-draw-circle {
          animation: draw-circle 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-draw-check {
          animation: draw-check 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
        }
        
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  );
}

export default FacultyLogin;