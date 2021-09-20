import { pairOne } from "./paironeutils";
import React, { useState, useEffect, useRef } from "react";
import styles from "/styles/pairs/pairs.module.scss";
import Right from "/sounds/Right.ogg";
import Wrong from "/sounds/Wrong.ogg";
import toast from "react-hot-toast";
const PairOne = ({ completed }) => {
  const [pairs, setPairs] = useState(pairOne);
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
        pairsMaked.includes("porque") === true &&
        pairsMaked.includes("because") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "porque") {
              item.state = false;
            }
            if (item.content === "because") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("moved") === true &&
        pairsMaked.includes("se mudó") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "moved") {
              item.state = false;
            }
            if (item.content === "se mudó") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("abuelo") === true &&
        pairsMaked.includes("grandfather") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "abuelo") {
              item.state = false;
            }
            if (item.content === "grandfather") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("cantante") === true &&
        pairsMaked.includes("singer") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "cantante") {
              item.state = false;
            }
            if (item.content === "singer") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("están pescando") === true &&
        pairsMaked.includes("they are fishing") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "están pescando") {
              item.state = false;
            }
            if (item.content === "they are fishing") {
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

export default PairOne;
