const userState = {
    movie:{
        movies:[]
    },
    poster:{
      movies:[]
    }
};

const user = (state = userState, action) => {
  switch (action.type) {
    case "FETCH_MOVIE":
      return action.payload;
    default:
      return state;
  }
};

export default user;
