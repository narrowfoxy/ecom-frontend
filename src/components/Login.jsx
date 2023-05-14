import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_FORM_SUBMIT } from "../GQL/queries";
import { useNavigate } from "react-router-dom";

import Progress from "./Progress";

export default function Login() {
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [submitLoginForm, { data, loading, error }] =
    useMutation(LOGIN_FORM_SUBMIT);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const loginData = await submitLoginForm({
      variables: {
        input: {
          identifier: formState.username,
          password: formState.password,
          provider: "local",
        },
      },
    });
  };

  React.useEffect(() => {
    if (data && !error) {
      localStorage.setItem("jwt", data.login.jwt);
      navigate("/");
    }
  }, [data]);

  React.useEffect(()=>{
    const isLoggedIn = !!localStorage.getItem("jwt");
    if(isLoggedIn) {
      navigate("/");
    }
  },[]);

  if (loading) {
    return (
      <div className="mt-[200px] flex justify-center">
        <Progress />
      </div>
    );
  }

  return (
    <>
      {data && !loading && <Alert severity="success">Logged In !</Alert>}
      {error && <Alert severity="error">{error.message}!</Alert>}
      <div className="flex justify-center">
        <Box
          component="form"
          autoComplete="off"
          className="flex flex-col content-center m-4 mweb:w-[90%] dweb:w-[45%] flex-wrap p-4"
        >
          <div className="flex justify-center w-[100%]">
            <div className="flex flex-col content-center flex-wrap mr-4">
              <div className="text-2xl font-extrabold text-blue-400">
                Login Form
              </div>
              <div className="pt-[30px]">
                <TextField
                  value={formState.username}
                  onChange={(e) => {
                    setFormState({ ...formState, username: e.target.value });
                  }}
                  required
                  type="text"
                  label="UserName/Email"
                  focused
                />
                <div className="mt-5">
                  <TextField
                    value={formState.password}
                    onChange={(e) => {
                      setFormState({ ...formState, password: e.target.value });
                    }}
                    required
                    type="password"
                    label="Password"
                    focused
                  />
                </div>
                <div className="my-4">
                  <Button
                    onClick={onFormSubmit}
                    type="submit"
                    variant="contained"
                  >
                    Login In
                  </Button>
                </div>
                <Link to="/signup" className="underline text-blue-300">
                  not a user, SignUp
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
