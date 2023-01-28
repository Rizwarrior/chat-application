import React, { useState } from 'react'

import styled from 'styled-components'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { useNavigate, Link } from 'react-router-dom';

import Add from "../img/addAvatar.png"

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
        <StyledWrapper>
            <StyledLogo> Chat App </StyledLogo>
            <StyledTitle> Register </StyledTitle >
            <StyledForm onSubmit={ handleSubmit }>
                <StyledInput type="text" placeholder='display name'/>
                <StyledInput type="email" placeholder='email'/>
                <StyledInput type="password" placeholder='password'/>
                <StyledInput style={{display: "none"}} type="file" id="file"/>
                <StyledLabel htmlFor='file'>
                  <StyledImage src={Add} />
                  <span> Add an avatar</span>
                </StyledLabel>
                <StyledButton> Sign Up</StyledButton>
                {err && <span> Something went wrong </span>}
            </StyledForm>
            <StyledP> Already have an account? <Link to="/login"> Login </Link></StyledP>
        </StyledWrapper>
    </StyledContainer>
  )
}

export default Register

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

const StyledLabel= styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8da4f1;
  font-size: 12px;
  cursor: pointer;
`

const StyledImage= styled.img`
  width: 32px;
`