import React from "react";
import styled from "styled-components";
import Filter from "./Filter";
import Sort from "./Sort";

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <h1>Header</h1>
            <Sort />
            <Filter />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default Header;
