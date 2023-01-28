import React from 'react'
import styled from 'styled-components'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <StyledHome>
        <Container>
            <Sidebar />
            <Chat />
        </Container>
    </StyledHome>
  )
}

export default Home

const StyledHome= styled.div`
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
`

const Container= styled.div`
    border: 1px solid white;
    border-radius: 10px;
    width: 65%;
    height: 80%;
    display: flex;
    overflow: hidden;
`
