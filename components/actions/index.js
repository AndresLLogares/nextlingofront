import axios from "axios";
import setAuthToken from "../utils/utils";
let URL = "http://localhost:5000/";

export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const SET_CURRENT_USER = "SETCURRENTUSER";

export const GETCURRENTUSER = (info) => {
  return async (dispatch) => {
    return await axios
      .post(URL + "currentuser", {
        email: info,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_CURRENT_USER, payload: data });
      });
  };
};

export const SETCURRENTUSER = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const LOGOUTUSER = () => {
  return async (dispatch) => {
    await localStorage.removeItem("jwtToken");
    await localStorage.removeItem("UserName");
    await localStorage.removeItem("Email");
    setAuthToken(false);
    dispatch(SETCURRENTUSER({}));
  };
};
