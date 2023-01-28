import React from 'react'
import styled from 'styled-components'

import Img from "../img/img.png"
import Attach from "../img/attach.png"

const Input = () => {
  return (
    <Container>
      <StyledInput type="text" placeholder='Type something...' />
      <Send>
        <StyledImage src={Attach} />
        <StyledInput type="file" style={{display: "none"}} id="file" />
        <StyledLabel htmlFor='file'>
          <StyledImage src={Img} />
        </StyledLabel>
        <StyledButton> Send </StyledButton>
      </Send>
    </Container>
  )
}

export default Input

const Container= styled.div`
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledInput= styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: #2f2d52;
  font-size: 15px;
  &::placeholder{
    color: lightgray;
  }
`

const Send= styled.div`
  display: flex;
  align-content: center;
  gap: 10px;
`

const StyledImage= styled.img`
  height: 24px;
  cursor: pointer;
`

const StyledLabel= styled.label`
  
`

const StyledButton= styled.button`
  border: none;
  padding: 10px 15px;
  color: white;
  background-color: #8da4f1;
  cursor: pointer;
`