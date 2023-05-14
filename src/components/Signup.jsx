import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../GQL/queries";
import { Alert } from "@mui/material";

const Signup = () => {
  const [userSignUpData, setUserSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [submitUserForm, { data, error, loading }] = useMutation(REGISTER_USER);

  const navigate = useNavigate();

  const updateUserSignUpData = (event) => {
    const { name, value } = event.target;

    const data = { [name]: value };

    setUserSignUpData({
      ...userSignUpData,
      ...data,
    });
  };

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    const user = submitUserForm({
      variables: { input: userSignUpData },
    });
  };


  useEffect(()=>{
    const isLoggedIn = !!localStorage.getItem("jwt");
    if(isLoggedIn) {
      navigate("/");
    }
  },[]);

  return (
    <div className="flex flex-col">
      {data && !loading && (
        <Alert severity="success">User Registered Succesfully !</Alert>
      )}
      {error && <Alert severity="error">{error.message}!</Alert>}
      <div className="flex justify-center">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="flex flex-col content-center mweb:w-[90%] p-4 dweb:w-auto"
        >
          <div className="text-2xl font-extrabold text-blue-400">
            SignUp Form
          </div>
          <div className="pt-[30px]">
            <TextField
              value={userSignUpData.email}
              name="email"
              onChange={updateUserSignUpData}
              type="email"
              label="Email"
              focused
            />
            <div className="mt-4">
              <TextField
                value={userSignUpData.username}
                name="username"
                onChange={updateUserSignUpData}
                type="text"
                label="Username"
                focused
              />
            </div>
            <div className="mt-4">
              <TextField
                value={userSignUpData.password}
                name="password"
                onChange={updateUserSignUpData}
                type="password"
                label="Password"
                focused
              />
            </div>
            <div className="my-4">
              <Button
                onClick={onSignUpFormSubmit}
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
            </div>
            <Link to="/login" className="underline text-blue-300">
              already user , signIn
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
