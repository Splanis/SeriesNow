import React, { useState } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import { Button, Buttons } from "../../../shared/Buttons";
import styled from "styled-components";

const Header: React.FC = () => {
    const [filters, setFilters] = useState<boolean>(false);

    return (
        <HeaderContainer>
            <Buttons>
                <Sort />
                <FilterButton
                    onClick={() => {
                        setFilters(filters => !filters);
                    }}
                >
                    Filters
                </FilterButton>
            </Buttons>
            {filters && <Filter />}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FilterButton = styled(Button)`
    background: red;

    &:hover {
        background: red;
    }
`;

export default Header;
