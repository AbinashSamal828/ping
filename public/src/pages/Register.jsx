import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/chat.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const Navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      Navigate("/");
    }
  },[Navigate]);
  const validationHandler = () => {
    const { password, confirmPassword, username, email } = value;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username length should be greater than 3", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password should be greater than 8 chars", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOptions);
      return false;
    }
    return true;
  };
  const changeHandler = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (validationHandler()) {
      const { password, username, email } = value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("chat app user", JSON.stringify(data.user));
        Navigate("/");
      }
    }
  };
  return (
    <Fragment>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>ping</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => changeHandler(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => changeHandler(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => changeHandler(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => changeHandler(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </Fragment>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000000;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3.5rem;
    }
    h1 {
      color: #58a1f3;
      font-family: "Lilita One", cursive;
      font-size: 3rem;
      letter-spacing: 13px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0f2b4876;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 0.9rem;
      border: 0.1rem solid #58a1f3;
      border-radius: 1rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #e0eefd;
        background-color: #00000076;
        outline: none;
      }
    }
    button {
      background-color: #9d51f5;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 1rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-out;
      &:hover {
        background-color: #2d7bd4;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #58a1f3;
        text-transform: none;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default Register;
