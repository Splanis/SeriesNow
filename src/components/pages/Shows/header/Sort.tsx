import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useShows } from "../../../context/ShowContext";
import { Button } from "../../../sharedStyles/Button";

const Sort: React.FC = () => {
    const { setSort } = useShows();
    const [activeSort, setActiveSort] = useState<"popularity" | "newest" | "rating">("popularity");

    return (
        <Buttons>
            Sort by
            <Button
                style={{ background: activeSort === "popularity" ? "#333333" : "black" }}
                onClick={() => {
                    setSort("popularity.desc");
                    setActiveSort("popularity");
                }}
            >
                Popularity
            </Button>
            <Button
                style={{ background: activeSort === "rating" ? "#333333" : "black" }}
                onClick={() => {
                    setSort("vote_average.desc");
                    setActiveSort("rating");
                }}
            >
                Rating
            </Button>
            <Button
                style={{ background: activeSort === "newest" ? "#333333" : "black" }}
                onClick={() => {
                    setSort("primary_release_date.desc");
                    setActiveSort("newest");
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
