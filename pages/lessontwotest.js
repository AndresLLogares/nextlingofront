import React, { useState, useEffect, Fragment } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Fade } from "react-awesome-reveal";
import styles from "../styles/lessonstest/lessonstests.module.scss";
import PairOne from "../components/pairs/two/pairstwo";
import GameOne from "../components/games/two/gamestwo";
import { Toaster } from "react-hot-toast";
import DogGood from "../images/DogGood.gif";
import Image from "next/image";
import { useRouter } from "next/router";
import Storage from "../components/utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { GETCURRENTUSER } from "../components/actions/index";
import axios from "axios";

const LessonTwoTest = () => {
  const [progress, setProgress] = useState(0);
  const [exerciseOne, setExerciseOne] = useState(false);
  const [exerciseTwo, setExerciseTwo] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const user = useSelector((state) => state.NextLingo.currentuser.user);

  const dispatch = useDispatch();

  let url = "https://nextlingoapp.herokuapp.com/";

  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      await setToken(Storage("jwtToken"));
      await dispatch(GETCURRENTUSER(Storage("Email")));
    };
    fetchUsers();
  }, []);

  const oneCompleted = (state) => {
    setExerciseOne(state);
    setProgress(50);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    setTimeout(() => {
      setExerciseTwo(false);
    }, 3000);
  };

  const TwoCompleted = async (state) => {
    setExerciseTwo(state);
    setProgress(100);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    await axios
      .post(url + "userlevel", {
        email: user.email,
        experience: 50,
        lesson: "two",
      })
      .then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            router.push("/home");
          }, 3000);
        }
      });
  };
  return (
    <Fragment>
      {!token ? (
        <main className={styles.containerNo}>
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
        <main className={styles.main}>
          <div className="box">
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
          {success ? (
            <div className={styles.success}>
              <Image src={DogGood} alt="" width={300} height={300} />
            </div>
          ) : null}
          <Toaster />
          <div className={styles.sort}>
            <Fade className={styles.bounce}>
              <div className={styles.sortTitle}>
                <p className={styles.title}>Lesson Two</p>
              </div>
            </Fade>
            <Fade className={styles.bounce}>
              <div className={styles.sortProgress}>
                <ProgressBar
                  labelColor="#4361ee"
                  labelSize="5vh"
                  labelAlignment="inside"
                  borderRadius="10px 10px 10px 10px"
                  baseBgColor="#faf9f9"
                  height="3rem"
                  width="20rem"
                  bgColor="#f72585"
                  completed={progress}
                />
              </div>
            </Fade>
            {exerciseOne ? null : (
              <div className={styles.containerGames}>
                <Fade className={styles.bounce}>
                  <PairOne completed={oneCompleted} />
                </Fade>
              </div>
            )}
            {exerciseTwo ? null : (
              <div className={styles.containerGames}>
                <Fade className={styles.bounce}>
                  <GameOne completed={TwoCompleted} />
                </Fade>
              </div>
            )}
          </div>
        </main>
      )}
    </Fragment>
  );
};
export default LessonTwoTest;
