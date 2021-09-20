import { pairTwo } from "./pairtwoutils";
import React, { useState, useEffect } from "react";
import styles from "/styles/pairs/pairs.module.scss";
import Right from "/sounds/Right.ogg";
import Wrong from "/sounds/Wrong.ogg";
import toast from "react-hot-toast";
const PairTwo = ({ completed }) => {
  const [pairs, setPairs] = useState(pairTwo);
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
        pairsMaked.includes("de repente") === true &&
        pairsMaked.includes("suddenly") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "suddenly") {
              item.state = false;
            }
            if (item.content === "de repente") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("mar") === true &&
        pairsMaked.includes("sea") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "mar") {
              item.state = false;
            }
            if (item.content === "sea") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("llevan") === true &&
        pairsMaked.includes("take") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "llevan") {
              item.state = false;
            }
            if (item.content === "take") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("joven") === true &&
        pairsMaked.includes("young") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "joven") {
              item.state = false;
            }
            if (item.content === "young") {
              item.state = false;
            }
            return item;
          })
        );
        toast.success("Correct!!");
        RightAudio?.play();
      } else if (
        pairsMaked.includes("ve") === true &&
        pairsMaked.includes("sees") === true
      ) {
        setPairs(
          pairs.map((item) => {
            if (item.content === "ve") {
              item.state = false;
            }
            if (item.content === "sees") {
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

export default PairTwo;
