import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useLocation, Link } from "react-router-dom"; 
import UseAuth from "../Hooks/UseAuth";
import "./Login.css";

const Login = () => {

    const [loginData, setLoginData] = useState("");
    const { error, user, loginUser, loading, googleLogin } = UseAuth();

    const location = useLocation(); 
    const history = useHistory();

    const handleOnSubmit = (e) => {
      loginUser(loginData?.email, loginData?.password, location, history);
      e.preventDefault();
    };

    const handleOnChange = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newLoginData = { ...loginData };
      newLoginData[field] = value;
      setLoginData(newLoginData);
    };

    const handleGoogleLogin = () => {
      googleLogin(location, history);
  };
  
   
  return (
    <div>
      {/* <>
        <Box>
          {!loading && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <form className="inputForm" onSubmit={handleOnSubmit}>
                  <Typography variant="h4">Login</Typography>
                  <TextField
                    required
                    id="standard-required"
                    label="Email"
                    variant="standard"
                    className="inputField"
                    onChange={handleOnChange}
                    name="email"
                  />
                  <TextField
                    required
                    id="standard-required"
                    label="Password"
                    variant="standard"
                    className="inputField"
                    onChange={handleOnChange}
                    name="password"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    className="inputField"
                  >
                    Login
                  </Button>
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <Button>
                      <Typography>New User ? Please Register </Typography>
                    </Button>
                  </Link>
                </form>
                <Button variant="contained" onClick={handleGoogleLogin}>
                  Google Login
                </Button>
                {error && (
                  <Alert severity="error">
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                {user?.email && (
                  <Alert severity="success">
                    <AlertTitle>Congrate's User Added successfully </AlertTitle>
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <img src={login} alt="" width={"100%"} srcSet="" />
              </Grid>
            </Grid>
          )}
          {loading && <CircularProgress style={loginStyle} color="success" />}
        </Box>
      </> */}
      <div className="btn-style login-style row">
        <Col lg={12}>
          <div className="input">
            <h2>Login</h2>
            <form onSubmit={handleOnSubmit}>
              <label htmlFor="email"></label>
              <input
                type="text"
                placeholder="Enter your email"
                id="email" 
                onChange={handleOnChange}
                name="email"
              />
              <input
                type="email"
                placeholder="Enter your email"
                id="email"  
                onChange={handleOnChange}
                name="password"
              />
              <br />
              <br />

             
              <input type="submit" value="Submit" />
              <br />
            </form>
            <p>
              haven't any account?<Link to="/register">Create Account</Link>
            </p>
            <button className="button-style" onClick={handleGoogleLogin}>
              <i class="fab fa-google"></i> Google Sign In
            </button>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Login;
