export const movieInfo = (user) => {
	return {
		type: "FETCH_MOVIE",
		payload: user,
	};
};
