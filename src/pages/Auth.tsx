import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import api from '@/utils/api';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const handleLogin = async(email: string, password: string) => {
    // Handle login logic here
    console.log('Login:', { email, password });
    try{
    const response= await api.post('/api/v1/user/login', { email, password })
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userId', response.data.data.user.id);
    console.log('Login successful:', response.data);
    console.log('isAdmin:', response.data.data.user.isAdmin);
      if(response.data.data.user.isAdmin) {
        navigate('/admin');
      }else{
        navigate('/dashboard');
      }
    } catch(err) {
      console.error("Error during login:", err);
    }
  };

  const handleSignup = async(name: string, email: string, password: string) => {
    // Handle signup logic here
    console.log('Signup:', { name, email, password });
    try{
      const response=await api.post('/api/v1/user/signup', {
        name,
        email,
        password,
        confirmPassword: password,
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    localStorage.setItem('isAdmin', response.data.user.isAdmin);
    console.log('Signup successful:', response.data);
    }catch(err){
      console.error("Error during signup:", err);
    }
    setIsLogin(true);
  };

  return (
    <>
      {isLogin ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </>
  );
};

export default Auth;