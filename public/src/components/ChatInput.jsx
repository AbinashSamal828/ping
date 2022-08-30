import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
export default function ChatInput(props) {
  const { sendMsgHandler } = props;
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [msg, setMsg] = useState("");

  const emojiMenuHandler = () => {
    setShowEmojiMenu((prev) => {
      return !prev;
    });
  };
  const emojiClickHandler = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      sendMsgHandler(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={emojiMenuHandler} />
          <div className={`${showEmojiMenu ? "vis" : "novis"}`}>
            {showEmojiMenu && <Picker onEmojiClick={emojiClickHandler} />}
          </div>
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  height: 85%;
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding-left: 1rem;
  background-color: #0a0e4683;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: #ffffff;
    gap: 1rem;

    .emoji {
      position: relative;
      .vis {
        opacity: 1;
        transition: 0.5s ease-out;
      }
      .novis {
        transition: 0.5s ease-in;
        opacity: 0;
      }
      svg {
        font-size: 1.5rem;
        color: #ffff00c5;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: rgb(145, 134, 243);
        box-shadow: 3px white;
        border: none;
        .emoji-categories {
          button {
            filter: contrast(100);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: black;
        }
        .emoji-group:before {
          background-color: rgb(145, 134, 243);
          color: black;
        }
      }
      .emoji-scroll-wrapper::-webkit-scrollbar {
        width: 0.3rem;
        &-thumb {
          background-color: black;
          width: 0.3rem;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    background-color: #ffffff34;
    gap: 2rem;
    align-content: center;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-top: 0.7rem;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9186f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg{
            font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
