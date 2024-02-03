"use client" 

// components/Signup.tsx
import Link from 'next/link';
import styled from 'styled-components';


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const FormContainer = styled.div`
  width: 28%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

export default function Signup() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    // Add your form submission logic here
  };

  return (
    <PageContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input type="password" id="confirm-password" name="confirm-password" />
          </FormGroup>
          <Button type="submit">Signup</Button>
        </form>
        <LinksContainer>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/reset-password">
            <Button>Forgot Password?</Button>
          </Link>
        </LinksContainer>
      </FormContainer>
    </PageContainer>
  );
}
