import { pairThree } from "./pairsthreeutils";
import React, { useState, useEffect } from "react";
import styles from "/styles/pairs/pairs.module.scss";
import Right from "/sounds/Right.ogg";
import Wrong from "/sounds/Wrong.ogg";
import toast from "react-hot-toast";
const PairThree = ({ completed }) => {
  const [pairs, setPairs] = useState(pairThree);
  const [pairsMaked, setPairsMaked] = useState([]);
  const [RightAudio, setRightAudio] = useState(null);
  const [WrongAudio, setWrongAudio] = useState(null);
  const [current, setCurrent] = useState("");

  const everyTrue = (state) => {
    return state.state === false;
  };

  const handleClick = (content, state) => {
    if (state === false) {
      return null;
    }
    if (pairsMaked.length === 0) {
      setPairsMaked([...pairsMaked, content]);
      setCurrent(content);
    } else {
      setPairsMaked([...pairsMaked, content]);
      setCurrent("");
    }
  };
  useEffect(() => {
    setRightAudio(new Audio(Right));
    setWrongAudio(new Audio(Wrong));
    if (pairsMaked.length === 2) {
      if (
        pairsMaked.includes("is walking") === true &&
        pairsMaked.includes("va caminando") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "va caminando") {
              item.state = false;
            }
            if (item.content === "is walking") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("wait") === true &&
        pairsMaked.includes("espera") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "wait") {
              item.state = false;
            }
            if (item.content === "espera") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("edificio") === true &&
        pairsMaked.includes("building") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "edificio") {
              item.state = false;
            }
            if (item.content === "building") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("entra") === true &&
        pairsMaked.includes("enters") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "entra") {
              item.state = false;
            }
            if (item.content === "enters") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("inside") === true &&
        pairsMaked.includes("adentro") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "inside") {
              item.state = false;
            }
            if (item.content === "adentro") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else {
        WrongAudio?.play();
      }
      pairs.every(everyTrue) ? completed(true) : null;
      setPairsMaked([]);
    }
  }, [pairsMaked]);

  return (
    <main className={styles.main}>
      <div className={styles.sortTitle}>
        <p className={styles.title}>Complete the pairs</p>
      </div>
      <div className={styles.sortTitle}>
        {current ? <button className={styles.current}>{current}</button> : null}
      </div>
      <div className={styles.sortbuttons}>
        {pairs &&
          pairs.map((item, index) => (
            <button
              onClick={() => handleClick(item.content, item.state)}
              className={item.state ? styles.button : styles.buttonUsed}
              key={index}
            >
              {item.content}
            </button>
          ))}
      </div>
    </main>
  );
};

export default PairThree;
