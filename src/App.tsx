import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/pages/Homepage/Homepage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Shows from "./components/pages/Shows/Shows";
import Error404 from "./components/pages/Error404/Error404";
import ShowDetail from "./components/pages/ShowDetail/ShowDetail";
import styled from "styled-components";
import GlobalStyles from "./components/sharedStyles/GlobalStyles";
import { ShowProvider } from "./components/context/ShowContext";
import { TrendingShowProvider } from "./components/context/TrendingShowContext";

const App: React.FC = () => {
    return (
        <div>
            <ShowProvider>
                <TrendingShowProvider>
                    <Router>
                        <GlobalStyles />
                        <Navbar />
                        <Container>
                            <Switch>
                                <Route exact path="/" component={Homepage} />
                                <Route exact path="/tv" component={Shows} />
                                <Route exact path="/movie" component={Shows} />
                                <Route exact path="/:showType/:id" component={ShowDetail} />
                                <Route exact path="/:showType/:id" component={ShowDetail} />
                                <Route component={Error404} />
                            </Switch>
                        </Container>
                        <Footer />
                    </Router>
                </TrendingShowProvider>
            </ShowProvider>
        </div>
    );
};

const Container = styled.div`
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
`;

export default App;
