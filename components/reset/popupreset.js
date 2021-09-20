import Image from "next/image";
import Dog from "../../images/Reset.gif";
import styles from "../../styles/login/login.module.scss";
import { Fade } from "react-awesome-reveal";
import { Email } from "@styled-icons/evaicons-solid/Email";
import toast from "react-hot-toast";
import { CancelPresentation } from "@styled-icons/material/CancelPresentation";
import React, { useState } from "react";
import axios from "axios";
const PopUp = (props) => {
  let url = "https://nextlingoapp.herokuapp.com/";
  const [user, setUser] = useState({
    password: "",
  });
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "sendemail", {
        email: user.email.toLowerCase(),
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.success) {
          toast.success(response.data.message);
          props.handle(false);
        } else {
          toast.error(response.data.message);
        }
      });
  };
  return (
    <main className={styles.popup}>
      <Fade className={styles.bounce}>
        <div className={styles.sortMiniButton}>
          <button
            onClick={() => props.handle(false)}
            className={styles.miniButton}
          >
            <CancelPresentation className={styles.icons} />
          </button>
        </div>
        <div className={styles.sortPopUp}>
          <p className={styles.titlePopUp}>Fill the information</p>
          <Image src={Dog} alt="" width={150} height={150} />
        </div>
        <div className={styles.sortPopUp}>
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
            <div className={styles.sortButton}>
              <button className={styles.buttonPopUp}>Reset Password</button>
            </div>
          </form>
        </div>
      </Fade>
    </main>
  );
};

export default PopUp;
