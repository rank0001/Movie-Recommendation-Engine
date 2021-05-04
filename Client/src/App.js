import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Error from "./components/Error";
import Recommend from "./components/Recommend";
import Movies from "./components/Movies";
import { movieInfo } from "./actions";
import { connect } from "react-redux";
import movies from "./components/useMovieSource";
const App = (props) => {
  //calling the useMovies custom Hook to fetch content from csv
  const movs = movies();
  if (movs) props.user.movies = movs;
  return (
    <React.Fragment>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recommend" component={Recommend} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { user: state.movie };
};
export default connect(mapStateToProps, { movieInfo })(App);
