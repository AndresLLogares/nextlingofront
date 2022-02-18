import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, Fragment } from "react";
import { GETCURRENTUSER } from "../actions/index";
import Storage from "../utils/localstorage";
import styles from "../../styles/navbar/navbar.module.scss";
import NoUser from "../../images/NoUser.png";
import { Bounce } from "react-awesome-reveal";
import { useRouter } from "next/router";
import { Medal } from "@styled-icons/boxicons-regular/Medal";
import { Cancel } from "@styled-icons/material-rounded/Cancel";
import { ThMenuOutline } from "@styled-icons/typicons/ThMenuOutline";
const NavBar = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  const router = useRouter();

  const user = useSelector((state) => state.NextLingo.currentuser.user);

  const [width, setWidth] = useState("");
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    updateWidthAndHeight();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(GETCURRENTUSER(Storage("Email")));
    };
    fetchUsers();
  }, []);
  return (
    <Fragment>
      {width < 900 && !show ? (
          <div className={styles.sortResponsive}>
                    <Bounce className={styles.bounce}>
            <button
              className={styles.miniButtonHome}
              onClick={() => setShow(true)}
            >
              <ThMenuOutline className={styles.miniIcon} />
            </button>
            </Bounce>
          </div>
      ) : null}
      <main className={show ? styles.container : styles.none}>
        <Bounce className={styles.bounce}>
          {width < 900 ? (
            <div className={styles.sortInsideButton}>
              <button
                className={styles.miniButton}
                onClick={() => setShow(false)}
              >
                <Cancel className={styles.miniIcon} />
              </button>
            </div>
          ) : null}
        </Bounce>
        <Bounce className={styles.bounce}>
          <div className={styles.sortUp}>
            <h6 className={styles.up}>Welcome back {user?.username}</h6>
          </div>
        </Bounce>
        <Bounce className={styles.bounce}>
          <div className={styles.sortProfile}>
            {user?.photo_profile ? (
              <Image src={user.photo_profile} alt="" width={150} height={150} />
            ) : (
              <Image src={NoUser} alt="" width={150} height={150} />
            )}
          </div>
        </Bounce>
        <Bounce className={styles.bounce}>
          <div className={styles.sortButton}>
            <button
              onClick={() => router.push("/editprofile")}
              className={styles.button}
            >
              Edit Profile
            </button>
          </div>
        </Bounce>
        <Bounce className={styles.bounce}>
          <div className={styles.information}>
            <p className={styles.eachInformation}>Level: {user?.level}</p>
            <p className={styles.eachInformation}>
              Experience: {user?.experience}
            </p>
          </div>
        </Bounce>
        <Bounce className={styles.bounce}>
          {user?.lessonone ? (
            <div className={styles.sortMedals}>
              <p className={styles.eachInformation}>Lesson One Completed</p>
              <Medal className={styles.medal} />
            </div>
          ) : (
            <div className={styles.sortMedals}>
              <p className={styles.eachInformation}>Lesson One Incompleted</p>
            </div>
          )}
          {user?.lessontwo ? (
            <div className={styles.sortMedals}>
              <p className={styles.eachInformation}>Lesson Two Completed</p>
              <Medal className={styles.medal} />
            </div>
          ) : (
            <div className={styles.sortMedals}>
              <p className={styles.eachInformation}>Lesson Two Incompleted</p>
            </div>
          )}
          {user?.lessonthree ? (
            <div className={styles.sortMedals}>
              <p className={styles.eachInformation}>Lesson Three Completed</p>
              <Medal className={styles.medal} />
            </div>
          ) : (
            <div className={styles.sortMedals}>
              <p className={styles.eachInformation}>Lesson Three Incompleted</p>
            </div>
          )}
        </Bounce>
      </main>
    </Fragment>
  );
};

export default NavBar;
