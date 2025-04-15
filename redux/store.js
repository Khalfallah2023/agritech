import { createStore } from "redux";
import languageReducer from "./reducers";

const store = createStore(languageReducer);

export default store;
