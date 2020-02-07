import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <Foot>Footer</Foot>
    );
}

const Foot = styled.nav`
    background: black;
    color: white;
    height: 60px;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
`;

export default Footer;