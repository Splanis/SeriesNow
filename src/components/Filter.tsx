import React from "react";
import styled from "styled-components";
import { useShows } from "./context/ShowContext";

const Filter: React.FC = () => {
    const providerValues = useShows();

    return (
        <FilterContainer>
          <Buttons>
              <Button></Button>
              <Button></Button>
          </Buttons>
        </FilterContainer>
    );
};

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Buttons = styled.div``;

const Button = styled.button`
    padding: 5px;
    margin: 5px;
`;

export default Filter;
