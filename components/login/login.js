import React, { useState } from "react";
import styles from "../../styles/login/login.module.scss";
import { Fade } from "react-awesome-reveal";
import { Email } from "@styled-icons/evaicons-solid/Email";
import { Password } from "@styled-icons/material-twotone/Password";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/utils";
import { useDispatch } from "react-redux";
import { SETCURRENTUSER } from "../actions/index";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const Login = () => {
  const GoogleId = process.env.GoogleId;
  console.log("Clave", GoogleId)
  const router = useRouter();
  const dispatch = useDispatch();
  let url = "https://nextlingoapp.herokuapp.com/";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "login", {
        email: user.email.toLocaleLowerCase(),
        password: user.password,
        date: Date.now(),
      })
      .then(async (response) => {
        if (response.data.message !== "Welcome Back") {
          return toast.error(response.data.message);
        } else {
          await setUser({
            password: "",
            email: "",
          });
          toast.success(
            response.data.message + " " + response.data.username + "!"
          );
          const { token } = response.data;
          const { firstname } = response.data;
          const { email } = response.data;
          await localStorage.setItem("jwtToken", token);
          await localStorage.setItem("UserName", firstname);
          await localStorage.setItem("Email", email);
          setAuthToken(token);
          const decoded = jwt_decode(token);
          dispatch(SETCURRENTUSER(decoded));
          setTimeout(() => router.push("/home"), 1000);
        }
      });
  };
  const handleGoogleSucces = async (response) => {
    let name = response.profileObj.givenName;

    let email = response.profileObj.email;

    let googleId = response.profileObj.googleId;

    let tokenId = response.tokenId;

    await axios
      .post(url + "google", {
        email: email,
        username: name,
        date: Date.now(),
        uuid: uuidv4(),
        googleId: googleId,
        tokenId: tokenId,
      })
      .then(async (response) => {
        console.log(response.data);
        if (!response.data.token) {
          return toast.error("Error Login");
        } else {
          toast.success(`Welcome back ${response.data.username}!`);
          setTimeout(() => router.push("/home"), 1000);
        }
        const { token } = response.data;
        const { username } = response.data;
        const { email } = response.data;
        const { googleId } = response.data;
        await localStorage.setItem("jwtToken", token);
        await localStorage.setItem("UserName", username);
        await localStorage.setItem("Email", email);
        await localStorage.setItem("googleId", googleId);
      });
  };

  const handleGoogleError = (response) => {
    console.log("falla", response)
  };

  return (
    <main className={styles.boxLogin}>
      <Fade className={styles.bounce}>
        <div className={styles.box}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.eachInput}>
              <label className={styles.label}>
                <Email className={styles.icons} /> E-Mail
              </label>
              <input
                name="email"
                type="email"
                required={true}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.eachInput}>
              <label className={styles.label}>
                <Password className={styles.icons} />
                Password
              </label>
              <input
                name="password"
                type="password"
                required={true}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.sortButton}>
              <button type="submit" className={styles.button}>
                Send
              </button>
            </div>
          </form>
          <div className={styles.boxGoogle}>
            <GoogleLogin
              clientId={GoogleId}
              className={styles.google}
              buttonText="Login with Google"
              onSuccess={handleGoogleSucces}
              onFailure={handleGoogleError}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </Fade>
    </main>
  );
};

export default Login;
