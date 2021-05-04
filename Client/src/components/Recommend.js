import React, { useState } from "react";
import backgroundPic from "../images/movie.jpg";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import ShowMovies from "./ShowMovies";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(4),
    marginLeft: theme.spacing(80),
    width: "200px",
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(50),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(20),
    },
  },
  progress: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(15),
      backgroundColor: "yellow",
    },
  },
  error: {
    color: "red",
    marginLeft: theme.spacing(75),
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(46),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(15),
    },
  },
  search: {
    width: 500,
    marginTop: "100px",
    background: "white",
    marginLeft: "500px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "250px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "100px",
      width: 350,
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const Recommend = ({ user, moviePosters }) => {
  const classes = useStyles();
  const movies = user.movies;
  const [display, setDisplay] = useState(true);
  const [buttonState, setButtonState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [poster, setPoster] = useState([]);
  const [userInfo, setUser] = useState({
    title: "",
  });
  const [errorMessage, setMessage] = React.useState("");
  const handleSubmit = () => {
    if (inputValue) {
      setDisplay(!display);
      setButtonState(true);
      userInfo.title = inputValue;
      setUser(userInfo);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };
      //fetching recommendations from the backend api 
      fetch(
        "https://recommendation-engine123.herokuapp.com/recommend",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          let posters = [];
          data.name.map((vl) => {
            return movies.map((value) => {
              if (value.title === vl) {
                //fetching movie information from the tmdb api
                return fetch(
                  `https://api.themoviedb.org/3/movie/${value.id}?api_key=4aefc1a7eea88f85c674d3fdfae1ad78&language=en-US`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    let a = data.poster_path;
                    posters.push({
                      url: a,
                    });
                    if (posters.length === 30) {
                      moviePosters.movies.push(posters);
                      setDisplay(true);
                      setPoster(posters);
                      setButtonState(false);
                    }
                  });
              }
            });
          });
        });
    } else {
      const error = "You need to input a value";
      setMessage(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundPic})`,
        height: "100vh",
        overflowX: "hidden",
        backgroundSize: "cover",
      }}
    >
      {movies.length ? (
        <>
          <Autocomplete
            className={classes.search}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="auto"
            options={movies}
            getOptionLabel={(option) => `${option.title}`}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for movies"
                variant="outlined"
              />
            )}
          />

          <ThemeProvider theme={theme}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              color="primary"
              className={classes.margin}
              disabled={buttonState}
            >
              Submit
            </Button>
          </ThemeProvider>
        </>
      ) : (
        <div className={classes.progress}>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </div>
      )}
      <Typography variant="h5" className={classes.error}>
        {errorMessage}
      </Typography>

      {display ? (
        <div>
          <Grid
            container
            spacing={2}
            style={{ marginTop: "20px" }}
            alignItems="center"
            justify="center"
          >
            {poster.map((movies) => {
              if (movies.url)
                return <ShowMovies data={movies} key={Math.random()} />;
            })}
          </Grid>
        </div>
      ) : (
        <div className={classes.progress}>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.movie, moviePosters: state.poster };
};
export default connect(mapStateToProps)(Recommend);
