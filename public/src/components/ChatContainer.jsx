import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
export default function ChatContainer(props) {
  const { currentChat, currentUser, socket } = props;
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    const fetch = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetch();
  }, [currentChat]);
  const sendMsgHandler = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput sendMsgHandler={sendMsgHandler} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  background-color: #0a0e4683;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 1080px) and (max-width: 1080px) {
    grid-template-columns: 15% 70% 15%;
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
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
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
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #a6b1c71f;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #4e6ec11f;
    }
  }
`;
