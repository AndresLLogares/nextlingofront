import React, { useState } from "react";
import styles from "../../styles/login/login.module.scss";
import { Fade } from "react-awesome-reveal";
import { Email } from "@styled-icons/evaicons-solid/Email";
import { Password } from "@styled-icons/material-twotone/Password";
import { UserCircle } from "@styled-icons/boxicons-regular/UserCircle";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  let url = "https://nextlingoapp.herokuapp.com/";
  const [user, setUser] = useState({
    email: "",
    controlPassword: "",
    password: "",
    username: "",
  });
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.password !== user.controlPassword) {
      return toast.error("Passwords does not match");
    }
    await axios
      .post(url + "signup", {
        email: user.email.toLocaleLowerCase(),
        password: user.password,
        username: user.username,
        uuid: uuidv4(),
      })
      .then(async (response) => {
        if (response.data.message !== "Thanks for registering") {
          return toast.error(response.data.message);
        } else {
          await setUser({
            password: "",
            controlpassword: "",
            username: "",
            email: "",
          });
          toast.success(response.data.message);
        }
      });
  };
  return (
    <main className={styles.boxLogin}>
      <Fade className={styles.bounce}>
        <div className={styles.box}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.eachInput}>
              <label className={styles.label}>
                <Email className={styles.icons} /> E-Mail
              </label>{" "}
              <input
                name="email"
                type="email"
                onChange={handleInputChange}
                required={true}
                className={styles.input}
              />
            </div>
            <div className={styles.eachInput}>
              <label className={styles.label}>
                <UserCircle className={styles.icons} /> Username
              </label>{" "}
              <input
                name="username"
                type="text"
                onChange={handleInputChange}
                required={true}
                className={styles.input}
              />
            </div>
            <div className={styles.eachInput}>
              <label className={styles.label}>
                <Password className={styles.icons} />
                Password
              </label>{" "}
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                required={true}
                className={styles.input}
              />
            </div>
            <div className={styles.eachInput}>
              <label className={styles.label}>
                <Password className={styles.icons} />
                Repeat Password
              </label>{" "}
              <input
                type="password"
                name="controlPassword"
                onChange={handleInputChange}
                required={true}
                className={styles.input}
              />
            </div>
            <div className={styles.sortButton}>
              <button type="submit" className={styles.button}>Send</button>
            </div>
          </form>
        </div>
      </Fade>
    </main>
  );
};

export default SignUp;
