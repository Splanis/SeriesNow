import React from "react";
import SearchBar from "./SearchBar";
import MainLogo from "./MainLogo";
import Links from "./Links";
import styled from "styled-components";

const Movies: React.FC = () => {
    return (
        <Nav>
            <MainLogo />
            <SearchBar />
            <Links />
        </Nav>
    );
};

const Nav = styled.nav`
    background: rgba(0, 0, 0, 0.8);
    color: white;
    height: 70px;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
`;

export default Movies;
