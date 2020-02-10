import React from "react";
import styled from "styled-components";
import { useShows } from "../context/ShowContext";

const Sort: React.FC = () => {
    const providerValues = useShows();

    const handleSort = (e: any) => {
        switch (e.target.value) {
            case "newest":
                providerValues?.setSort("primary_release_date.desc");
                break;
            case "rating":
                providerValues?.setSort("vote_average.desc");
                break;
            default:
                providerValues?.setSort("popularity.desc");
                break;
        }
    };
    
    return (
        <Buttons>
            sort by
            <Button value="popularity" onClick={handleSort}>
                Popularity
            </Button>
            <Button value="rating" onClick={handleSort}>
                Rating
            </Button>
            <Button value="newest" onClick={handleSort}>
                Released: Newest
            </Button>
        </Buttons>
    );
};

const Buttons = styled.div``;

const Button = styled.button`
    padding: 5px;
    margin: 5px;
`;

export default Sort;
