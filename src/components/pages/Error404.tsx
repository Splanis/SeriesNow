import React from "react";
import styled from "styled-components";

const Error404: React.FC = () => {
    return (
        <Section>
            <h1>Error 404 :(</h1>
            <p>Page not found.</p>
        </Section>
    );
};

const Section = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1,p {
        font-size:3rem;
    }
`;

export default Error404;
