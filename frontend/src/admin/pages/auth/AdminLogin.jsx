import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const apiURL = `${process.env.BASE_URL}/api/v1/admin/login`;
console.log('apiURL', apiURL)
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login";

    const token = Cookies.get("adminToken");

    if (token) {
      navigate("/admin/dashboard");
    } else {
      toast.success("Logout Successfully");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email == "" || password == "") {
      toast.error("Please provide both email & password !");
      return;
    }

    try {
      const response = await axios.post(apiURL, {
        email: email,
        password: password,
      });

      if (response.data.success) {
        Cookies.set("adminToken", response.data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        navigate("/admin/dashboard");
        setLoading(false);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again!"); // Fallback message
      }
      console.error("Login error:", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <ToastContainer />
      <div className="h-[100vh] flex items-center justify-center" id="adminBg">
        <div
          className="w-[500px] h-[400px] flex-column items-center justify-center py-3 px-5 rounded-lg"
          id="white-bg"
          style={{
            backdropFilter: "blur(30px)",
          }}
        >
          <h2 className="text-center text-3xl mt-4">Admin Login</h2>
          <h5 className="text-center text-sm pt-3">
            Welcome back! Unlock the power of administrative controls.
          </h5>

          <form className="mt-10">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email address*"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    color="secondary"
                  >
                    Password*
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    color="secondary"
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    marginTop: "8px",
                    padding: "10px",
                    textTransform: "none",
                  }}
                >
                  {loading ? (
                    <CircularProgress size="30px" sx={{ color: "white" }} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};
