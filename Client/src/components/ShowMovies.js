import React from "react";
import { CardMedia, Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  media: {
    height: "400px",
    paddingTop: "56.25%", 
  },
  cardRoot: {
    width: "300px",
  },
}));
export default function ShowMovies({ data }) {
  const classes = useStyles();
  return (
    <Grid item lg={3} md sm xs>
      <Card className={classes.cardRoot} style={{marginLeft: "5px"}}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w500${data.url}`}
        />
      </Card>
    </Grid>
  );
}
