import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Movies from "./components/Movies";
import Series from "./components/Series";
import styled from "styled-components";
import GlobalStyles from "./components/sharedStyles/GlobalStyles";
import { MoviesProvider } from "./components/context/MoviesContext";

const App: React.FC = () => {
    return (
        <div>
            <MoviesProvider>
                <Router>
                    <GlobalStyles />
                    <Navbar />
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/series" component={Series} />
                            <Route exact path="/movies" component={Movies} />
                        </Switch>
                    </Container>
                    <Footer />
                </Router>
            </MoviesProvider>
        </div>
    );
};

const Container = styled.div`
    padding-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100;
`;

export default App;
