import React, { useState, useEffect } from "react";
import { Bounce } from "react-awesome-reveal";
import styles from "../../styles/lessons/lessons.module.scss";
import Shopping from "../../images/Lesson3.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { GETCURRENTUSER } from "../actions/index";
import Storage from "../utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
const LessonThree = () => {
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
          <p className={styles.title}>Lesson Three</p>
        </div>
      </Bounce>
      <Bounce className={styles.bounce}>
        {user?.lessonthree ? (
          <div className={styles.eachLessonCompleted}>
            <p className={styles.completed}>Lesson Three Completed</p>
          </div>
        ) : (
          <div
            onClick={() => router.push("/lessonthreetest")}
            className={styles.eachLesson}
          >
            <Image src={Shopping} alt="" width={120} height={120} />
            <p className={styles.titleLesson}>Lesson 3-1 Travel</p>
          </div>
        )}
      </Bounce>
    </main>
  );
};

export default LessonThree;
