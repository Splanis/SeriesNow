import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/pages/Homepage/Homepage";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer";
import Shows from "./components/pages/Shows/Shows";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Profile from "./components/pages/Profile/Profile";
import Error404 from "./components/pages/Error404/Error404";
import ShowDetail from "./components/pages/ShowDetail/ShowDetail";
import styled from "styled-components";
import GlobalTheme from "./components/sharedStyles/GlobalTheme";
import { Container } from "./components/sharedStyles/Container";
import { ShowProvider } from "./components/context/ShowContext";
import { TrendingShowProvider } from "./components/context/TrendingShowContext";
import { UserProvider } from "./components/context/UserContext";

const App: React.FC = () => {
    return (
        <React.Fragment>
            <UserProvider>
                <ShowProvider>
                    <TrendingShowProvider>
                        <Router>
                            <GlobalTheme />
                            <Navbar />
                            <AppContainer>
                                <Switch>
                                    <Route exact path="/" component={Homepage} />
                                    <Route exact path="/tv" component={Shows} />
                                    <Route exact path="/movie" component={Shows} />
                                    <Route exact path="/search/:q" component={Shows} />
                                    <Route exact path="/showdetails/:showType/:id" component={ShowDetail} />
                                    <Route exact path="/profile/:username" component={Profile} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/error404" component={Error404}></Route>
                                    {/* <Route>
                                        <Redirect to="/error404" />
                                    </Route> */}
                                </Switch>
                            </AppContainer>
                            <Footer />
                        </Router>
                    </TrendingShowProvider>
                </ShowProvider>
            </UserProvider>
        </React.Fragment>
    );
};

const AppContainer = styled(Container)`
    width: 100%;
    min-height: 100vh;
`;

export default App;
