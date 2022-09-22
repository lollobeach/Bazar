import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIchat";
import Contacts from '../components/chat/Contacts'
import Welcome from "../components/chat/Welcome";
import ChatContainer from '../components/chat/ChatContainer'
import SideDrawer from "../components/miscellanous/SideDrawer";
import ErrorPage from './ErrorPage'


const ChatPage = () => {
  const socket = useRef();
  const location = useLocation()

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [error, setError] = React.useState()

  useEffect( () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      setError(401)
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
      setCurrentChat(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
    if (currentUser) {
      socket.current = io(host);
      if(socket.current){
        
        socket.current.emit("add-user", currentUser._id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //const getUser = () => {
      if (currentUser) {
        axios
          .get(`${allUsersRoute}`)
          .then((res) => {
            const data = res.data
            console.log(data)
            setContacts(data)
          });
        //console.log(data.data)
        //setContacts(data.data);
      }
      console.log(contacts)
    //}
    //getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  
  if(!currentUser){
    return (
      <>
        <SideDrawer />
        <ErrorPage error={error} />
      </>
    )
  }
  else{
    return(
      <>
        <SideDrawer />
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {(currentChat === undefined ) ? (
              <Welcome />
            ) : (                                                       
              <ChatContainer currentChat={currentChat} socket={socket} userChat={location.state.user}/>
            )}
          </div>
        </Container>
      </>
    )
  }

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


export default ChatPage