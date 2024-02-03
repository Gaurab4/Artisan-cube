// components/Login.tsx
"use client" 

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 30%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    align-item: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4b7bec;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LinksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Validate credentials (you may want to use a library like Formik or Yup for validation)
      if (!email || !password) {
        setError('Please enter email and password');
        return;
      }
      // Simulate API call to authenticate user
      try {
        // Replace this with your actual authentication logic
        // For demonstration purposes, let's assume authentication is successful
        // Redirect to the dashboard page
        router.push('/dashboard');
      } catch (error) {
        setError('Invalid email or password');
      }
    };

  return (
    <PageContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email"  value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <Button type="submit">Login</Button>
        </form>
        <LinksContainer>
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
          <Link href="/reset-password">
            <Button>Forgot Password?</Button>
          </Link>
        </LinksContainer>
      </FormContainer>
    </PageContainer>
  );
}
