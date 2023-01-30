import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  
  return (
    <Container>
      <SearchForm>
        <StyledInput 
          type="text" 
          placeholder='Find a user...' 
          onKeyDown={ handleKey } 
          onChange={ e=> setUsername( e.target.value )} 
          value= {username}
          />
      </SearchForm>
      {err && <span> User not found...</span>}
      {user && <UserChat onClick={ handleSelect }>
        <UserImage src={ user.photoURL} />
        <UserInfo>
          <span> { user.displayName } </span>
        </UserInfo>
      </UserChat>}
    </Container>
  )
}

export default Search

const Container= styled.div`
  border-bottom: 1px solid gray;
`

const SearchForm= styled.div`
  padding: 10px
`

const StyledInput= styled.input`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  width: 100%;;
  &::placeholder{
    color: lightgray;
  }
`

const UserChat= styled.div`
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

const UserImage= styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const UserInfo= styled.div`
  font-size: 18px;
`