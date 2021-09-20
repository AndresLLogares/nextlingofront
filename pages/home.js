import Image from "next/image";
import styles from "../styles/home/home.module.scss";
import Dog from "../images/DogHome.gif";
import NavBar from "../components/navbar/navbar";
import { Bounce } from "react-awesome-reveal";
import LessonOne from "../components/lessons/lessonOne";
import LessonTwo from "../components/lessons/lessonTwo";
import LessonThree from "../components/lessons/lessonThree";
const Home = () => {
  return (
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
  );
};

export default Home;
