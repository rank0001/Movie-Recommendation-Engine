import { useEffect, useState } from "react";
import { readRemoteFile } from "react-papaparse";
const useMovieSource = () => {
  const [movie, setMovies] = useState([]);
  useEffect(() => {
    const movies = [];
    //reading the csv file 
    readRemoteFile("tmdb.csv", {
      complete: (results) => {
        results.data.map((vl) => {
          if (vl[1] !== "title")
            movies.push({
              id: vl[0],
              title: vl[1],
            });
        });
        setMovies(movies);
      },
    });
  }, []);
  if (movie.length > 1) return movie;
};
export default useMovieSource;
