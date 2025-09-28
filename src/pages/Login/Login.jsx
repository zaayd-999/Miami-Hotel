import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectPath = location.state?.redirect || '/booking';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name: 'User', email };
    const token = 'fake-jwt-token';
    
    login(userData, token);
    navigate(redirectPath);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login & Continue Booking</button>
    </form>
  );
};

export default Login