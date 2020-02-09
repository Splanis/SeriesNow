import React, { useContext } from "react";
import { IMovie } from "./context/MoviesContext";
import styled from "styled-components";

const Movie: React.FC<IMovie> = ({ title, poster_path, overview, release_date, vote_average })  => {
    return (
        <MovieCard>
            <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt=""/>
            <h1>{title}</h1>
            <p>{overview}</p>
            <p>{release_date}</p>
            <p>Rating:{vote_average}</p>
        </MovieCard>
    );
};

const MovieCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 10px;
    border: 1px solid black;
`;

export default Movie;
