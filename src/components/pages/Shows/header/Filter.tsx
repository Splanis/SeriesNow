import React, { useState, useEffect } from "react";
import { useShows } from "../../../context/ShowContext";
import Genres from "./Genres";
import { Button } from "../../../shared/Buttons";
import styled from "styled-components";

export interface IGenre {
    id: number;
    name: string;
}

const Filter: React.FC = () => {
    const [fetchedGenres, setFetchedGenres] = useState<IGenre[]>([]);
    const { genres, setGenres, showType } = useShows();
    let FETCH_GENRES_URL: string;

    useEffect(() => {
        const fetchGenres = async () => {
            if (showType === "tv") {
                FETCH_GENRES_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDb_API_KEY}&language=en-US`;
            } else {
                FETCH_GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDb_API_KEY}&language=en-US`;
            }

            const response = await fetch(FETCH_GENRES_URL);
            const fetchedGenres = await response.json();
            setFetchedGenres([...fetchedGenres.genres]);
        };
        fetchGenres();
    }, []);

    return (
        <FilterContainer>
            {fetchedGenres.map(genre => (
                <Genres key={genre.id} id={genre.id} name={genre.name} />
            ))}
            <Button onClick={() => setGenres([])}>Clear</Button>
        </FilterContainer>
    );
};

const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export default Filter;
