import { GET_CURRENT_USER } from "../actions/index";

const initialState = {
  currentuser: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentuser: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducers;
