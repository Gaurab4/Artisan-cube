// Login.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie , parseCookies } from 'nookies';

const Login = () => {
  const [email, setEmail] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [password, setPassword] = useState('');
  const [isInvalid , setIsInvalid] = useState(false);



  const router = useRouter();


    // Check if token exists in cookies

  useEffect(() => {
      const { token } = parseCookies();
      // If token exists, redirect user to the workspace page
      if (token) {
        router.push('/workspace');
      }
  }, []);

  const handleSignup =() =>{
      router.push('/auth/signup');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const response = await axios.get(`${apiUrl}/users`);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      setCookie(null, 'token', response.data.token, {
        maxAge: 60 * 60 * 24 * 1, // 1 week
        path: '/',
      });
      router.push('/workspace');
    } catch (error) {
      setIsInvalid(true);
      console.error('Login failed:');

      setTimeout(() => {
        setIsInvalid(false);
      }, 1000);
      // Handle login failure (e.g., display error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8">
      { isInvalid && <div role="alert" className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Warning: Invalid email address!</span>
        </div>}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button className="font-medium text-indigo-600 hover:text-indigo-500" type="button">Forgot your password?</button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M6 5H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v1z" clipRule="evenodd" />
                </svg>
              </span>
              Login
            </button>
          </div>
        </form>
        <div>
      <p className="text-center text-sm text-gray-600">Don&rsquo;t have an account? <button onClick={handleSignup} className="font-medium text-indigo-600 hover:text-indigo-500" type="button">Sign up</button></p> 

        </div>
      </div>
    </div>
  );
};

export default Login;
