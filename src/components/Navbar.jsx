import React, { useContext } from 'react'
import styled from 'styled-components'

import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const { currentUser } = useContext(AuthContext)

  return (
    <StyledNavbar>
      <StyledLogo> Chat App</StyledLogo>
      <User>
        <StyledImage src={ currentUser.photoURL } />
        <span> { currentUser.displayName } </span>
        <StyledButton onClick={() => signOut(auth)}> Logout </StyledButton>
      </User>
    </StyledNavbar>
  )
}

export default Navbar

const StyledNavbar= styled.div`
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 7%;
  padding: 10px;
  justify-content: space-between;
  color: #ddddf7;
`

const StyledLogo= styled.span`
  font-weight: bold;
`

const User= styled.div`
  display: flex;
  gap: 10px;
  align-items:center;
`

const StyledImage= styled.img`
  background-color:#ddddf7;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  object-fit: cover;
`

const StyledButton= styled.button`
  background-color: #5d5b8d;
  color: #ddddf7;
  font-size: 10px;
  border: none;
  height: 25px;
  cursor: pointer;
`