import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IMovie, useMovies } from "../context/MoviesContext";

const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;

// const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

const Movies: React.FC = () => {
    const providerValues = useMovies();
    const [query, setQuery] = useState<string>();

    const queryHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (query) {
            searchFetch();
        }
    };

    const searchFetch = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&region=en`
        );
        const data = await response.json();
        console.log(data.results);
        providerValues?.setMovies(
            data.results.map((movie: IMovie) => ({
                adult: movie.adult,
                backdrop_path: movie.backdrop_path,
                title: movie.title,
                id: movie.id,
                popularity: movie.popularity,
                vote_count: movie.vote_count,
                video: movie.video,
                poster_path: movie.poster_path,
                original_language: movie.original_language,
                original_title: movie.original_title,
                genre_ids: movie.genre_ids,
                vote_average: movie.vote_average,
                overview: movie.overview,
                release_date: movie.release_date
            }))
        );
    };

    return (
        <Nav>
            <StyledLink to="/">Logo</StyledLink>

            <form action="">
                <input type="text" value={query} placeholder="search" onChange={queryHandle} />
            </form>

            <div>
                <StyledLink to="/series">Series</StyledLink>
                <StyledLink to="/movies">Movies</StyledLink>
            </div>
        </Nav>
    );
};

const Nav = styled.nav`
    background: black;
    color: white;
    height: 60px;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
`;

const StyledLink = styled(Link)`
    color: white;
    margin: 10px;
`;

export default Movies;
