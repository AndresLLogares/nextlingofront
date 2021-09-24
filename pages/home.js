import Image from "next/image";
import styles from "../styles/home/home.module.scss";
import Dog from "../images/DogHome.gif";
import NavBar from "../components/navbar/navbar";
import { Bounce } from "react-awesome-reveal";
import LessonOne from "../components/lessons/lessonOne";
import LessonTwo from "../components/lessons/lessonTwo";
import LessonThree from "../components/lessons/lessonThree";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import Storage from "../components/utils/localstorage";
const Home = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      await setToken(Storage("Email"));
    };
    fetchUsers();
  }, []);
  return (
    <Fragment>
      {!token ? (
        <main className={styles.container}>
          <div className={styles.home}>
            <button
              className={styles.buttonNoToken}
              onClick={() => router.push("/")}
            >
              You are not authorized to be here
            </button>
          </div>
        </main>
      ) : (
        <main className={styles.container}>
          <div className="box">
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
          <div className={styles.home}>
            <Bounce>
              <div className={styles.sortTitleHome}>
                <h6 className={styles.title}>NextLingo</h6>
                <Image src={Dog} alt="" width={150} height={150} />
              </div>
            </Bounce>
            <div>
              <NavBar />
            </div>
            <div className={styles.sortLessons}>
              <LessonOne />
              <LessonTwo />
              <LessonThree />
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default Home;
