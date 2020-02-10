import React from "react";
import styled from "styled-components";
import { useShows } from "../context/ShowContext";
import Slider, { Range }from "rc-slider";
import "rc-slider/assets/index.css";

const Filter: React.FC = () => {
    const providerValues = useShows();
    const wrapperStyle = { width: 400, margin: 50 };

    return (
        <FilterContainer>
            {/* <Buttons>
              <Button></Button>
              <Button></Button>
          </Buttons> */}
            <div style={wrapperStyle}>
                <Range min={1900} max={2020} defaultValue={[1900, 2020]} tipFormatter={value => `${value}%`} />{" "}
            </div>
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
