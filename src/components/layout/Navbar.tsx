import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Movies = () => {
    return (
        <Nav>
            <StyledLink to="/">Logo</StyledLink>
            <div>
                <StyledLink to="/series">Series</StyledLink>
                <StyledLink to="/movies">Movies</StyledLink>
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
    margin: 10px;
`;

export default Movies;
