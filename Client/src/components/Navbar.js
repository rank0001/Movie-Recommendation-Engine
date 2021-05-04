import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "black",
    margin: 0,
  },
  arrow: {
    color: "tomato",
    fontSize: 30,
    [theme.breakpoints.down("sm")]: {
      marginRight: "50px",
      fontSize: 60,
    },
  },
  title: {
    color: "white",
    marginLeft: "100px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20px",
    },
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();

  return (
    <React.Fragment>
      <Box component="nav">
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ flexGrow: "1", color: "tan", marginLeft: "10px" }}
            ></Typography>

            {location.pathname === "/" ? (
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className={classes.title}
                style={{
                  borderBottom: "2px solid tomato",
                  textDecoration: "none",
                }}
                onClick={() => history.push("/")}
              >
                Home
              </Typography>
            ) : (
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className={classes.title}
                onClick={() => history.push("/")}
                style={{ textDecoration: "none" }}
              >
                Home
              </Typography>
            )}
            {location.pathname === "/recommend" ? (
              <Typography
                component={Link}
                to="/recommend"
                variant="h6"
                className={classes.title}
                style={{
                  borderBottom: "2px solid tomato",
                  textDecoration: "none",
                }}
                onClick={() => history.push("/recommend")}
              >
                Search
              </Typography>
            ) : (
              <Typography
                component={Link}
                to="/recommend"
                variant="h6"
                className={classes.title}
                onClick={() => history.push("/recommend")}
                style={{ textDecoration: "none" }}
              >
                Search
              </Typography>
            )}
            {location.pathname === "/movies" ? (
              <Typography
                component={Link}
                to="/movies"
                variant="h6"
                className={classes.title}
                style={{
                  borderBottom: "2px solid tomato",
                  textDecoration: "none",
                }}
                onClick={() => history.push("/movies")}
              >
                My Movies
              </Typography>
            ) : (
              <Typography
                component={Link}
                to="/movies"
                variant="h6"
                className={classes.title}
                onClick={() => history.push("/movies")}
                style={{ textDecoration: "none" }}
              >
                My Movies
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default Navbar;
