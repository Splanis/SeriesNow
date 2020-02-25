import React, { useState } from "react";
import styled from "styled-components";
import { useShows } from "../../../context/ShowContext";
import { Button } from "../../../sharedStyles/Buttons";

const Sort: React.FC = () => {
    const { sort, setSort } = useShows();
    const [activeSort, setActiveSort] = useState<string>("popularity.desc");

    return (
        <Buttons>
            Sort by
            <Button
                style={{ background: activeSort === "popularity.desc" ? "#333333" : "black" }}
                onClick={() => {
                    setSort("popularity.desc");
                    setActiveSort("popularity.desc");
                }}
            >
                Popularity
            </Button>
            <Button
                style={{ background: activeSort === "vote_average.desc" ? "#333333" : "black" }}
                onClick={() => {
                    setSort("vote_average.desc");
                    setActiveSort("vote_average.desc");
                }}
            >
                Rating
            </Button>
            <Button
                style={{ background: activeSort === "primary_release_date.desc" ? "#333333" : "black" }}
                onClick={() => {
                    setSort("primary_release_date.desc");
                    setActiveSort("primary_release_date.desc");
                }}
            >
                Released: Newest
            </Button>
        </Buttons>
    );
};

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Sort;
