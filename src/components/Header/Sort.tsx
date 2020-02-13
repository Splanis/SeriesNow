import React, { useState } from "react";
import styled from "styled-components";
import { useShows } from "../context/ShowContext";
import { Button } from "../sharedStyles/Button";

const Sort: React.FC = () => {
    const { setSort } = useShows();
    const [activeSort, setActiveSort] = useState<"popularity" | "newest" | "rating">("popularity");

    const handleSort = (e: any) => {
        switch (e.target.value) {
            case "newest":
                setSort("primary_release_date.desc");
                setActiveSort("newest");
                break;
            case "rating":
                setSort("vote_average.desc");
                setActiveSort("rating");
                break;
            default:
                setSort("popularity.desc");
                setActiveSort("popularity");
                break;
        }
    };

    return (
        <Buttons>
            Sort by
            <Button style={{ background: activeSort === "popularity" ? "#333333" : "black" }} value="popularity" onClick={handleSort}>
                Popularity
            </Button>
            <Button style={{ background: activeSort === "rating" ? "#333333" : "black" }} value="rating" onClick={handleSort}>
                Rating
            </Button>
            <Button style={{ background: activeSort === "newest" ? "#333333" : "black" }} value="newest" onClick={handleSort}>
                Released: Newest
            </Button>
        </Buttons>
    );
};

const Buttons = styled.div``;

export default Sort;
