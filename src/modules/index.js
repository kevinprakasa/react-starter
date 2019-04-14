/* eslint-disable */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import globalReducer from "./../globalReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    global: globalReducer
  });
