const initialState = "nft"; // Default to NFT type

const typeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default typeReducer;
