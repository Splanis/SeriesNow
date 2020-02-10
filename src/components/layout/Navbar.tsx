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
            <StyledLink to="/">Logo</StyledLink>

            <form action="">
                <input type="text" value={providerValues?.query} placeholder="search" onChange={queryHandle} />
            </form>

            <div>
                <StyledLink to="/series" onClick={() => {providerValues?.setShow('tv')}}>
                    Series
                </StyledLink>
                <StyledLink to="/movies" onClick={() => {providerValues?.setShow('movie')}}>
                    Movies
                </StyledLink>
            </div>
        </Nav>
    );
};

const Nav = styled.nav`
    background: black;
    color: white;
    height: 60px;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
`;

const StyledLink = styled(Link)`
    color: white;
    margin: 20px;
    text-decoration: none;
    font-size: 1.5rem;
`;

export default Movies;
