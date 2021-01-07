import { combineReducers } from "redux";
import { actName } from "./actions";

let reducers = {};

reducers.ui = (state = null, action) => {
  switch (action.type) {
    case actName.SET_UI:
      return action.ui;
    default:
      return state;
  }
};

const reducersCombined = combineReducers(reducers);

export default reducersCombined;
