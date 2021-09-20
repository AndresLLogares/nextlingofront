import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/landpage/landpage.module.scss";
import Dog from "../images/Dog.png";
import Login from "../components/login/login";
import SignUp from "../components/signup/signup";
import PopUp from "../components/reset/popupreset";
import { Bounce } from "react-awesome-reveal";
import { Toaster } from "react-hot-toast";

export default function Home(props) {
  const [swapLogin, setSwapLogin] = useState(true);
  const [swapPopUp, setsSwapPopUp] = useState(false);
  const swap = () => {
    setSwapLogin(!swapLogin);
  };
  console.log(process.env.CLOUDINARY_URL);
  const handlePopUp = (state) => {
    setsSwapPopUp(state);
  };

  return (
    <main className={styles.container}>
      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <Head>
        <title>NextLingo</title>
        <meta name="description" content="Created by Andres Logares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sort}>
        <Toaster />
        <div className={styles.divTitle}>
          <Bounce>
            <p className={styles.title}>NextLingo</p>
            <Image src={Dog} alt="" width={150} height={150} />
          </Bounce>
        </div>
        <div className={styles.divTitle}>
          <button onClick={() => handlePopUp(true)} className={styles.button}>
            Do you forget your password?
          </button>
        </div>
        <div className={styles.divSwitch}>
          <Bounce>
            <p className={styles.swap}>Login</p>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span onClick={swap} className={styles.slider} />
            </label>
            <p className={styles.swap}>Signup</p>
          </Bounce>
        </div>
        <div className={styles.components}>
          {swapPopUp ? <PopUp handle={handlePopUp} /> : null}
          {swapLogin ? <Login /> : <SignUp />}
        </div>
      </div>
    </main>
  );
}
