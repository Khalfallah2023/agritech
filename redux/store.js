import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import languageReducer from "./reducers";
import typeReducer from "./reducers/typeReducer";
import authReducer from "./reducers/authReducer";
import userPlantsReducer from './reducers/userPlantsReducer';
import metricsReducer from './reducers/metricsReducer';
import weatherReducer from './reducers/weatherReducer';

// Combine the reducers
const rootReducer = combineReducers({
  language: languageReducer,
  typeS: typeReducer,
  auth: authReducer,
  userPlants: userPlantsReducer,
  metrics: metricsReducer,
  weather: weatherReducer
});

// Ajouter le middleware thunk
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;