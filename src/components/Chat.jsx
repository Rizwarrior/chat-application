import React from 'react'
import styled from 'styled-components'

import Cam from "../img/cam.png"
import Add from "../img/add.png"
import More from "../img/more.png"
import Messages from './Messages'
import Input from "./Input"

const Chat = () => {
  return (
    <StyledChat>
      <ChatInfo>
        <span> Jane </span>
        <ChatIcons>
          <StyledImage src={Cam} />
          <StyledImage src={Add} />
          <StyledImage src={More} />
        </ChatIcons>
      </ChatInfo>
      <Messages />
      <Input />
    </StyledChat>
  )
}

export default Chat

const StyledChat= styled.div`
  flex: 2;
`

const ChatInfo= styled.div`
  height: 50px;
  background-color: #5d5b8d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: lightgray;
`

const ChatIcons= styled.div`
  display: flex;
  gap: 10px;
`

const StyledImage= styled.img`
  height: 24px;
  cursor: pointer;
`