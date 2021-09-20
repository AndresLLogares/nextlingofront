import React, { useState, useEffect } from "react";
import { gameTwo } from "./gametwoutils";
import styles from "/styles/games/games.module.scss";
import Right from "/sounds/Right.ogg";
import Wrong from "/sounds/Wrong.ogg";
import toast from "react-hot-toast";
const GameTwo = ({ completed }) => {
  const [game, setGame] = useState(gameTwo);
  const [gameMaked, setgameMaked] = useState([]);
  const [RightAudio, setRightAudio] = useState(null);
  const [WrongAudio, setWrongAudio] = useState(null);
  console.log(gameMaked);
  useEffect(() => {
    setRightAudio(new Audio(Right));
    setWrongAudio(new Audio(Wrong));
    if (gameMaked.length === 8) {
      if (gameMaked.toString() === "I,go,to,bed,at,eleven,o,clock") {
        toast.success("Correct!!!");
        setgameMaked([]);
        RightAudio?.play();
        completed(true);
      } else {
        WrongAudio?.play();
        toast.error("Wrong!!!");
        let aux = game.map(function (item) {
          item.state = true;
          return item;
        });
        setGame(aux);
        setgameMaked([]);
      }
    }
  }, [gameMaked]);
  const handleClick = (content, state) => {
    if (state === false) {
      return null;
    }
    setgameMaked([...gameMaked, content]);
    let aux = game.map(function (item) {
      if (item.content === content) {
        item.state = false;
      }
      return item;
    });
    setGame(aux);
  };

  return (
    <main className={styles.main}>
      <div className={styles.sortTitle}>
        <p className={styles.title}>Complete the phrase</p>
      </div>
      <div className={styles.sortTitle}>
        <button className={styles.current}>
          "Yo me voy a la cama a las once."
        </button>
      </div>
      <div className={styles.sortbuttons}>
        {gameMaked &&
          gameMaked.map((item, index) => (
            <button className={styles.phrase} key={index}>
              {item}
            </button>
          ))}
      </div>
      <div className={styles.sortbuttons}>
        {game &&
          game.map((item, index) => (
            <button
              onClick={() => handleClick(item.content, item.state)}
              className={item.state ? styles.button : styles.buttonUsed}
              key={index}
            >
              {item.content}
            </button>
          ))}
      </div>{" "}
    </main>
  );
};

export default GameTwo;
