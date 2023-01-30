import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ( { message } ) => {

  const { currentUser }= useContext(AuthContext);
  const { data }= useContext(ChatContext);  

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Container  ref={ref} 
                className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
        <MessageInfo>
            <UserImage src={ message.senderId === currentUser.uid
                             ? currentUser.photoURL
                             : data.user.photoURL
            }/>
            <span> just now</span>
        </MessageInfo>
        <MessageContent>
            <StyledP> {message.text} </StyledP>
            {message.img && <SentImage src={message.img} alt="" />}
        </MessageContent>
    </Container>
  )
}

export default Message

const Container= styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    &.owner{
        flex-direction: row-reverse;
        p{
        background-color: #8da4f1;
        color: white;
        border-radius: 10px 0px 10px 10px;
        max-width: max-content;
    }
    }
    
`

const MessageInfo= styled.div`
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;
`

const MessageContent= styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &.owner{
        align-items: flex-end;
    }
`

const StyledP= styled.p`
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
`

const UserImage= styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

const SentImage= styled.img`
    width: 50%;
`