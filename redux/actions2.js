export const SAVE_TYPE = "SAVE_TYPE";
export const saveType = (typpe) => {
  return {
    type: SAVE_TYPE,
    payload: typpe,
  };
};
