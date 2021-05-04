import React from "react";
import Typography from "@material-ui/core/Typography";
import Typed from "react-typed";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import pic1 from "../images/36.jpg";
import pic2 from "../images/147.jpg";
import pic3 from "../images/216.jpg";
import pic4 from "../images/586.jpg";
import pic5 from "../images/670.jpg";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  title: {
    position: "absolute",
    top: "20%",
    width: "40%",
    left: "5%",
    color: "white",
    marginBottom: "5px",
    fontSize: "35px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      width: "80%",
    },
  },
  root: {
    flexGrow: 1,
    background: "black",
    height: "100vh",
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btn: {
    background: "yellow",
    color: "black",
    marginTop: "370px",
    marginLeft: "200px",
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(27),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(20),
      marginTop: theme.spacing(35),
    },
  },
}));
//Settings for the carousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
  ],
};

function Home() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6} md={6}>
          <Typography className={classes.title} variant="h5">
            <span style={{ fontSize: "55px", color: "rosybrown" }}>
              Welcome
            </span>
            <Typed
              style={{ marginLeft: "15px",fontSize:'30px' }}
              strings={[
                "to the movie recommendation app." +
                  "Let's recommend some movies for you",
              ]}
              typeSpeed={50}
            />
          </Typography>

          <Button
            size="large"
            variant="contained"
            className={classes.btn}
            onClick={() => history.push("/recommend")}
          >
            Get Started
          </Button>
        </Grid>
        <Grid item lg={6} md={6}>
          <Slider
            {...settings}
            style={{
              marginTop: "100px",
              marginRight: "60px",
            }}
          >
            <div>
              <img
                alt="movie poster"
                src={pic1}
                style={{ width: "720px", height: "534.7px" }}
              />
            </div>
            <div>
              <img
                src={pic2}
                alt="movie poster"
                style={{ width: "720px", height: "534.7px" }}
              />
            </div>
            <div>
              <img
                src={pic3}
                alt="movie poster"
                style={{ width: "720px", height: "534.7px" }}
              />
            </div>
            <div>
              <img
                src={pic4}
                alt="movie poster"
                style={{ width: "720px", height: "534.7px" }}
              />
            </div>
            <div>
              <img
                src={pic5}
                alt="movie poster"
                style={{ width: "720px", height: "534.7px" }}
              />
            </div>
          </Slider>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
