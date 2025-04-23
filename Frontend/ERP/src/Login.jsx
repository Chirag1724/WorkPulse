import { useState } from 'react';
import { User, Lock, Eye, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
    <div className="login-container">
      <div className="login-card">
        {/* Login Form Section */}
        <div className="login-form-section">
          <div className="login-header">
            <h1>Log In</h1>
          </div>
          
          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-field">
                <label htmlFor="userId">Email</label>
                <div className="input-group">
                  <span className="input-icon">
                    <User size={20} />
                  </span>
                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    required
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <span className="input-icon">
                    <Lock size={20} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    required
                  />
                  <button
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>
              
              <div className="form-utilities">
                <div className="remember-me">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label htmlFor="remember-me">
                    Remember me
                  </label>
                </div>
                
                <div className="forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
              </div>
              
              <button type="submit" className="signin-button">
                Log In
              </button>
            </div>
          </form>
          
          
          <div className="social-login">
            <p>Or With</p>
            <div className="social-buttons">
              <button className="social-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#333"/>
                </svg>
              </button>
              <button className="social-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.8055 10.0415H12V14.0415H17.6515C17.2555 15.5715 16.2895 16.3055 14.9435 16.7815C13.9355 17.1205 12.7675 17.2125 11.6505 16.9825C10.0175 16.6535 8.71752 15.6445 8.01352 14.2845C7.74352 13.7485 7.56752 13.1585 7.49952 12.5415C7.41352 11.7965 7.49952 11.0385 7.72352 10.3315C7.87052 9.83149 8.09152 9.36449 8.38752 8.94749C9.11352 7.88649 10.1935 7.12649 11.4325 6.81749C12.3415 6.59349 13.2995 6.61149 14.1995 6.85349C15.0105 7.07749 15.7465 7.54449 16.3055 8.16849C16.4855 7.98849 18.6105 5.86849 18.7835 5.70249C16.7415 3.78149 14.2585 2.70149 11.4905 3.01049C9.20252 3.27249 7.18352 4.45049 5.83752 6.16249C4.94552 7.28649 4.34852 8.62449 4.06252 10.0535C3.76152 11.5315 3.85052 13.0725 4.32252 14.4995C4.84052 16.0675 5.76352 17.4135 7.03352 18.4175C8.41652 19.5055 10.0595 20.1145 11.7815 20.2065C13.3615 20.2905 14.9505 20.0175 16.3685 19.3145C18.2065 18.4175 19.5175 16.7755 20.0895 14.8585C20.5125 13.5245 20.6175 11.9515 20.3095 10.5175C20.2645 10.3595 21.8055 10.0415 21.8055 10.0415Z" fill="#4285F4"/>
                </svg>
              </button>
              <button className="social-button">
                <Twitter size={24} className="twitter-icon" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="image-section">
          <div className="image-container">
            <img 
              src="/src/assets/Login.jpg" 
              alt="Secure login illustration" 
              className="login-image"
            />
            <div className="image-overlay">
              <h2>Welcome Back!</h2>
              <p>Sign in to access your account and manage your tasks.</p>
            </div>
          </div>
        </div>
      </div>
      
      {loggedIn && (
        <div className="success-overlay">
          <div className="success-message">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p className="success-text">Login successful!</p>
            <p className="redirect-text">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default FacultyLogin