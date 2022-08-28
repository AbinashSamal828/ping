import React from "react";
import styled from "styled-components";
import hii from "../assets/hi.gif"


export default function Welcome(props) {
  const { currentUser } = props;
  return <Container>
    <img src={hii} alt="hii" />
    {currentUser&&<h1>Welcome ,<span>{currentUser.username}!</span></h1>}
    <h3>Please select a chat to start messeging</h3>
  </Container>;
}

const Container=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;

    }
    span{
        color:#4e00ff
    }
`;