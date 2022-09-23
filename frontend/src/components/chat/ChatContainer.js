import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import { sendMessageRoute, recieveMessageRoute } from "../../utils/APIchat";
import { Avatar } from "@chakra-ui/react";

const ChatContainer = ({currentChat, socket/*, userChat*/}) => {

  const user = JSON.parse(sessionStorage.getItem("userInfo"))

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  /*useEffect(() => {
    const getCurrentChat =  () => {
      console.log(currentChat)
      if (!currentChat) {
        currentChat =  JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
      }
      //lollobeahc
      console.log("currentChat"+currentChat.data.username)
      //michelegitto
      console.log(userChat)
    };
    
    getCurrentChat();
  }, [currentChat]);*/


  useEffect( () => {
    // /getmsg   
    async function getMsg(){  
      const config = {
        params: {
          /*from: currentChat.data.username,
          to: userChat,*/
          from: user.data.username,
          to: currentChat,
        },
        headers: {
        "Content-type":"application/json",
        Authorization: `Bearer ${user.data.token}`
        },
      } 
      const response = await axios.get(recieveMessageRoute, 
        config
      );
      setMessages(response.data);
    }
    getMsg()
  }, [currentChat]);


  const handleSendMsg =  (msg) => {
    if(socket.current){
      socket.current.emit("send-msg", {
      /*to: currentChat.data.id,
      from: userChat,*/
      from: user.data.username,
      to: currentChat,
      msg,
    });}
    const config = {
      headers: {
      "Content-type":"application/json",
      "Authorization": `Bearer ${user.data.token}`
      },
    } 
    // /addmsg
    axios.post(sendMessageRoute, {
      /*from: currentChat.data.username,
      to: userChat,*/
      from: user.data.username,
      to: currentChat,
      message: msg,
    }, config);
    let msgs = { fromSelf: true, message: msg }
    console.log(messages)
    setMessages(oldMessages => [...oldMessages, msgs])
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const chats = messages.map((message) => {
      return(<div ref={scrollRef} key={uuidv4()}>
        <div
          className={`message ${
            message.fromSelf ? "sended" : "recieved"
          }`}
        >
          <div className="content ">
            <p>{message.message}</p>
          </div>
        </div>
      </div>)
  })

  const setPic = () => {
    const config = {
      headers: {
        "Content-type":"application/json",
      },
    }
    const user = axios.get(`/get-user`,
      {
        params: { idUser: {currentChat}},
        config
      })
    return user.pic
  }

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <Avatar size={'sm'} cursor='pointer' src={setPic} />
          <div className="username">
            <h3>{currentChat}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {chats}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;


export default ChatContainer