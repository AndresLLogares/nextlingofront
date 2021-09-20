import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/login/login.module.scss";
import { Fade } from "react-awesome-reveal";
import { Password } from "@styled-icons/material-twotone/Password";
import { Email } from "@styled-icons/evaicons-solid/Email";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const Reset = () => {
  const router = useRouter();
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
      .post(url + "reset", {
        email: user.email.toLocaleLowerCase(),
        newpassword: user.password,
      })
      .then(async (response) => {
        if (response.data.success === true) {
          toast.success(response.data.message);
          setUser({ email: "", password: "" });
          return setTimeout(() => router.push("/"), 1000);
        } else {
          return toast.error(response.data.message);
        }
      });
  };
  return (
    <main className={styles.mainReset}>
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <Toaster />
      <Fade className={styles.bounce}>
        <div className={styles.sortReset}>
          <div className={styles.sortTitleReset}>
            <p className={styles.titleReset}>Reset your password</p>
          </div>
          <div className={styles.sortFormReset}>
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
                <button type="submit" className={styles.button}>Send</button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </main>
  );
};

export default Reset;
