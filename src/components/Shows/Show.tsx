import React from "react";
import { IShow } from "../context/ShowContext";
import styled from "styled-components";

const Show: React.FC<IShow> = ({ title, poster_path, overview, release_date, vote_average })  => {
    return (
        <ShowCard>
            <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt=""/>
            <h1>{title}</h1>
            <p>{overview}</p>
            <p>{release_date}</p>
            <p>Rating:{vote_average}</p>
        </ShowCard>
    );
};

const ShowCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 10px;
    border: 1px solid black;
`;

export default Show;
