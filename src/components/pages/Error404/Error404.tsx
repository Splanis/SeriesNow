import React from "react";
import { Container } from "../../sharedStyles/Container";
import styled from "styled-components";

const Error404: React.FC = () => {
    return (
        <StyledContainer>
            <h1>Error 404 :(</h1>
            <p>Page not found</p>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
    h1,
    p {
        font-size: 3rem;
    }
`;

export default Error404;
