import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useShows } from "../context/ShowContext";

const Movies: React.FC = () => {
    const providerValues = useShows();

    const queryHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        providerValues?.setQuery(e.target.value);
    };

    return (
        <Nav>
            <Logo>
                <StyledLink to="/">Logo</StyledLink>
            </Logo>

            <Form>
                <Input type="text" value={providerValues?.query} placeholder="Search..." onChange={queryHandle} />
            </Form>

            <Links>
                <StyledLink
                    to="/series"
                    onClick={() => {
                        providerValues?.setShow("tv");
                        providerValues?.setPage(1);
                        window.scrollTo(0, 0);
                    }}
                >
                    Series
                </StyledLink>
                <StyledLink
                    to="/movies"
                    onClick={() => {
                        providerValues?.setShow("movie");
                        providerValues?.setPage(1);
                        window.scrollTo(0, 0);
                    }}
                >
                    Movies
                </StyledLink>
                <p style={{fontSize: "1.5rem"}}>Username</p>
            </Links>
        </Nav>
    );
};

const Nav = styled.nav`
    background: black;
    color: white;
    height: 70px;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    z-index: 10;
`;

const Logo = styled.div`
    width: 250px;
`;

const StyledLink = styled(Link)`
    color: white;
    margin: 20px;
    text-decoration: none;
    font-size: 1.5rem;
`;

const Form = styled.form``;

const Input = styled.input`
    color: white;
    background: black;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.1rem;
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
`;

export default Movies;
