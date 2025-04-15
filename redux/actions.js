export const SAVE_LANGUAGE = "SAVE_LANGUAGE";
export const saveLanguage = (language) => {
  return {
    type: SAVE_LANGUAGE,
    payload: language,
  };
};
