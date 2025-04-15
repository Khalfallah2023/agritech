import { SAVE_LANGUAGE } from "./actions";

const initialState = {
  language: "en",
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
