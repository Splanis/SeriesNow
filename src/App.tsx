import React from "react";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Shows from "./components/pages/Shows/Shows";
import Error404 from "./components/pages/Error404";
import styled from "styled-components";
import GlobalStyles from "./components/sharedStyles/GlobalStyles";
import { ShowProvider } from "./components/context/ShowContext";

const App: React.FC = () => {
    return (
        <div>
            <ShowProvider>
                <Router>
                    <GlobalStyles />
                    <Navbar />
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/series" component={Shows} />
                            <Route exact path="/movies" component={Shows} />
                            <Route component={Error404} />
                        </Switch>
                    </Container>
                    <Footer />
                </Router>
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
    width: 100;
`;

export default App;
