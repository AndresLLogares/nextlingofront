import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers/index.js";
import { createWrapper } from "next-redux-wrapper"

const middleware = [thunk]

const makeStore = () => createStore(rootReducers, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)

