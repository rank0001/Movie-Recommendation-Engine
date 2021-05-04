import React from "react";
import backgroundPic from "../images/movie.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Card, CardMedia, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(5),
      backgroundColor: "yellow",
    },
  },
  media: {
    height: "400px",
    paddingTop: "56.25%",
  },
  cardRoot: {
    width: "300px",
  },
}));

const Movies = ({ moviePosters }) => {
  let movies = moviePosters.movies;
  let unique = new Set();
  movies.map((movie) => {
    return(
    movie.map((mov) => {
      return unique.add(mov.url);
    }));
  });
  let values = [];
  unique.forEach((val) => {
    values.push(val);
  });

  const classes = useStyles();
  const history = useHistory();
  if (unique.size === 0) history.push("/recommend");
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundPic})`,
        height: "100vh",
        overflowX: "hidden",
        backgroundSize: "cover",
      }}
    >
      {unique.size > 0 ? (
        <Grid
          container
          spacing={2}
          style={{ marginTop: "120px", marginLeft: "10px" }}
          alignItems="center"
          justify="center"
        >
          {values.map((movie) => {
            if (movie) {
              return (
                <Grid item lg={3} md sm xs key={Math.random()}>
                  <Card
                    className={classes.cardRoot}
                    style={{ marginLeft: "5px" }}
                  >
                    <CardMedia
                      className={classes.media}
                      image={`https://image.tmdb.org/t/p/w500${movie}`}
                    />
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { moviePosters: state.poster };
};
export default connect(mapStateToProps)(Movies);
