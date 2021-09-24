import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { GETCURRENTUSER } from "../components/actions/index";
import Storage from "../components/utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/edit/edit.module.scss";
import { Fade } from "react-awesome-reveal";
import { VectorPen } from "@styled-icons/bootstrap/VectorPen";
import { Profile } from "@styled-icons/icomoon/Profile";
import toast, { Toaster } from "react-hot-toast";
import NoUser from "../images/NoUser.png";
const EditProfile = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const CLOUDINARY_PRESET = process.env.CLOUDINARY_PRESET;
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
  let url = "https://nextlingoapp.herokuapp.com/";

  const [token, setToken] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.NextLingo.currentuser.user);

  useEffect(() => {
    const fetchUsers = async () => {
      await setToken(Storage("jwtToken"));
      await dispatch(GETCURRENTUSER(Storage("Email")));
    };
    fetchUsers();
  }, []);
  const HandleImage = async (event) => {
    const file = event?.currentTarget?.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    axios
      .post(url + "changephoto", {
        email: user?.email,
        photo: res.data.url,
      })
      .then(async (response) => {
        toast.success("Updated Photo");
        await dispatch(GETCURRENTUSER(Storage("Email")));
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "changeusername", {
        email: user?.email,
        username: username,
      })
      .then(async (response) => {
        toast.success("Updated Photo");
        await dispatch(GETCURRENTUSER(Storage("Email")));
      });
  };
  const handleInputFile = () => {
    document.getElementById("file").click();
  };
  const handleInputChange = (event) => {
    setUsername(event.target.value);
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
          <Fade className={styles.bounce}>
            <div className={styles.sortTitle}>
              <p className={styles.title}>Edit Profile</p>
            </div>
          </Fade>
          <Toaster />
          <div className={styles.boxEdit}>
            <Fade className={styles.bounce}>
              <div className={styles.sortEdit}>
                <p className={styles.miniTitles}> Username: {user?.username}</p>
              </div>
            </Fade>
            <div className={styles.sortEdit}>
              <Fade className={styles.bounce}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.eachInput}>
                    <label className={styles.label}>
                      <Profile className={styles.icons} />
                      Change User Name
                    </label>
                    <input
                      className={styles.input}
                      required={true}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <button type="submit" className={styles.buttonPopUp}>
                    Change
                  </button>
                </form>
              </Fade>
            </div>
            <div className={styles.sortEdit}>
              <Fade className={styles.bounce}>
                <div className={styles.image}>
                  {user?.photo_profile ? (
                    <Image
                      src={user?.photo_profile}
                      alt=""
                      width={240}
                      height={240}
                    />
                  ) : (
                    <Image src={NoUser} alt="" width={240} height={240} />
                  )}
                </div>
              </Fade>
            </div>
            <div className={styles.sortEdit}>
              <Fade className={styles.bounce}>
                <button
                  className={styles.buttonPopUp}
                  onClick={handleInputFile}
                >
                  <VectorPen className={styles.icons} />
                  Change Profile Picture
                </button>
              </Fade>
              <input
                onChange={HandleImage}
                type="file"
                style={{ display: "none" }}
                id="file"
                name="file"
              />
            </div>
            <div className={styles.sortEdit}>
              <Fade className={styles.bounce}>
                <button
                  onClick={() => router.push("/reset")}
                  className={styles.buttonPopUp}
                >
                  Change Password
                </button>
              </Fade>
            </div>
            <div className={styles.sortEdit}>
              <Fade className={styles.bounce}>
                <button
                  onClick={() => router.push("/home")}
                  className={styles.buttonPopUp}
                >
                  Come back to Home
                </button>
              </Fade>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default EditProfile;
