import React, { useState } from 'react'
import styled from 'styled-components'

import { useNavigate, Link } from 'react-router-dom';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <StyledContainer>
        <StyledWrapper>
            <StyledLogo> Chat App </StyledLogo>
            <StyledTitle> Login </StyledTitle >
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput type="email" placeholder='email'/>
                <StyledInput type="password" placeholder='password'/>
                <StyledButton> Sign In</StyledButton>
                {err && <span> Something went wrong </span>}
            </StyledForm>
            <StyledP> Don't have an account? <Link to="/register"> Register </Link></StyledP>
        </StyledWrapper>
    </StyledContainer>
  )
}

export default Login

const StyledContainer = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
`

const StyledWrapper = styled.div`
  background-color: white;
  padding: 20px 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

const StyledForm= styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const StyledLogo= styled.span`
  color: #5d5b8d;
  font-weight: bold;
  font-size: 24px;
`

const StyledTitle= styled.span`
  color: #5d5b8d;
  font-size: 12px;
`

const StyledInput= styled.input`
  padding: 15px;
  border: none;
  border-bottom: 1px solid #a7bcff;
  width: 250px;
  &::placeholder{
    color: rgb(175, 175, 175)
  }
`

const StyledButton= styled.button`
  background-color: #7b96ec;
  color: white;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
`

const StyledP= styled.p`
  color: #5d5b8d;
  font-size: 12px;
  margin-top: 10px;
`