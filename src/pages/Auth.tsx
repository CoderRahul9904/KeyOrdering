import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (email: string, password: string) => {
    // Handle login logic here
    console.log('Login:', { email, password });
    // You can redirect to dashboard or show success message
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Handle signup logic here
    console.log('Signup:', { name, email, password });
    // You can redirect to dashboard or show success message
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