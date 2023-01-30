import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { doc, onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

import Message from './Message'

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  
  return (
    <Container>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Container>
  )
}

export default Messages

const Container= styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 160px);
  overflow-x: hidden;
  overflow-y: scroll;
  .example::-webkit-scrollbar {
  display: none;
  }
`