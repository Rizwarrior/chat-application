import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };

    };

    currentUser.uid && getChats();

  }, [currentUser.uid]);

  console.log(Object.entries(chats))


  return (
    <Container>
      {Object.entries(chats)?.map(chat => (
        <UserChat key={ chat[0]}>
          <UserImage src={chat[1].userInfo.photoURL} />
          <UserInfo>
            <StyledSpan> {chat[1].userInfo.displayName} </StyledSpan>
            <StyledP> {chat[1].userInfo.lastMessage?.text} </StyledP>
          </UserInfo>
        </UserChat>
      ))}
    </Container>
  )
}

export default Chats

const Container = styled.div`
  
`

const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #2f2d52
  }
`

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const UserInfo = styled.div`
  
`

const StyledSpan = styled.span`
  font-size: 18px;
  font-weight: 500;
`

const StyledP = styled.p`
  font-size: 14px;
  color: lightgray;
`