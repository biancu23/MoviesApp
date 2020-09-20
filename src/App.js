import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Context
import SeriesProvider from "./context/SeriesContext";
import MoviesProvider from "./context/MoviesContext";
import SearchProvider from "./context/SearchContext";
import InfoProvider from "./context/InfoContext";
import DiscoverProvider from "./context/DiscoverContext";
//Bootstrap
import Container from "react-bootstrap/Container";
import Bar from "./layout/Bar";
//Componentes locales
import Principal from "./layout/Principal";
import Footer from "./layout/Footer";
import Grid from "./components/Grid";
import Info from "./components/Info";
import MoviesTrend from "./components/MoviesTrend";
import SeriesTrend from "./components/SeriesTrend";
import Discover from "./components/Discover";


function App() {
  return (
    <DiscoverProvider>
    <InfoProvider>
    <SearchProvider>
      <MoviesProvider>
        <SeriesProvider>
          <Container fluid className="p-0">
            <Router>
            <Bar />
              <Switch>
                <Route exact path="/" component={Principal} />
                <Route exact path="/results" component={Grid} />
                <Route exact path="/info" component={Info} />
                <Route exact path="/movies-trend" component={MoviesTrend} />
                <Route exact path="/series-trend" component={SeriesTrend} />
                <Route exact path="/discover" component={Discover} />
              </Switch>
            </Router>
            <Footer />
          </Container>
        </SeriesProvider>
      </MoviesProvider>
    </SearchProvider>
    </InfoProvider>
    </DiscoverProvider>
  );
}

export default App;
