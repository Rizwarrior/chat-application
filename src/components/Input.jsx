import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'

import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  
  return (
    <Container>
      <StyledInput type="text" 
                   placeholder='Type something...' 
                   onChange={(e) => setText(e.target.value)}
                   value={text}              
      />
      <Send>
        <StyledImage src={Attach} />
        <StyledInput type="file" 
                     style={{display: "none"}} id="file"
                     onChange={(e) => setImg(e.target.files[0])}
        />
        <StyledLabel htmlFor='file'>
          <StyledImage src={Img} />
        </StyledLabel>
        <StyledButton onClick={handleSend}> Send </StyledButton>
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