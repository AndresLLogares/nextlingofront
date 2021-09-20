import React, { useState, useEffect } from "react";
import { Bounce } from "react-awesome-reveal";
import styles from "../../styles/lessons/lessons.module.scss";
import Aeroplane from "../../images/Lesson1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { GETCURRENTUSER } from "../actions/index";
import Storage from "../utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
const LessonOne = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.NextLingo.currentuser.user);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(GETCURRENTUSER(Storage("Email")));
    };
    fetchUsers();
  }, []);
  return (
    <main className={styles.main}>
      <Bounce className={styles.bounce}>
        <div className={styles.sortTitle}>
          <p className={styles.title}>Lesson One</p>
        </div>
      </Bounce>
      <Bounce className={styles.bounce}>
        {user?.lessonone ? (
          <div className={styles.eachLessonCompleted}>
            <p className={styles.completed}>Lesson One Completed</p>
          </div>
        ) : (
          <div
            onClick={() => router.push("/lessononetest")}
            className={styles.eachLesson}
          >
            <Image src={Aeroplane} alt="" width={120} height={120} />
            <p className={styles.titleLesson}>Lesson 1-1 Travel</p>
          </div>
        )}
      </Bounce>
    </main>
  );
};

export default LessonOne;
