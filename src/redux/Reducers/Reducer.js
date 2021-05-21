const Reducer = (state = null, action) => {
  switch (action.type) {
    case "VIEW":
      state = action.payload.data;
      return state;

    case "ADD_NEW":
      state = action.payload.data;
      return state;

    case "UPDATE":
      state = action.payload.data;
      return state;

    case "DELETE":
      state = action.payload.data;
      return state;

    default:
      return state;
  }
};

export default Reducer;
