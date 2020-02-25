import React, { useEffect } from "react";
import TrendingShow from "./TrendingShow";
import { useTrendingShows } from "../../context/TrendingShowContext";
import Spinner from "../../shared/Spinner";
import { Container } from "../../shared/Container";

import styled from "styled-components";

const Homepage: React.FC = () => {
    const { TVShows, setTVShows, movies, setMovies, loading, setLoading } = useTrendingShows();

    const API_TVSHOWS_URL = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;
    const API_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;

    const fetchData = async () => {
        const tv_response = await fetch(API_TVSHOWS_URL);
        const tv_data = await tv_response.json();
        const movies_response = await fetch(API_MOVIES_URL);
        const movies_data = await movies_response.json();

        setTVShows(
            tv_data.results
                .map((show: any) => ({
                    adult: show.adult,
                    backdrop_path: show.backdrop_path,
                    title: show.title || show.name,
                    id: show.id,
                    popularity: show.popularity,
                    vote_count: show.vote_count,
                    video: show.video,
                    poster_path: show.poster_path,
                    original_language: show.original_language,
                    genre_ids: show.genre_ids,
                    vote_average: show.vote_average,
                    overview: show.overview,
                    first_air_date: show.release_date || show.first_air_date,
                    type: show.title ? "movie" : "tv"
                }))
                .slice(0, 4)
        );
        setMovies(
            movies_data.results
                .map((show: any) => ({
                    adult: show.adult,
                    backdrop_path: show.backdrop_path,
                    title: show.title || show.name,
                    id: show.id,
                    popularity: show.popularity,
                    vote_count: show.vote_count,
                    video: show.video,
                    poster_path: show.poster_path,
                    original_language: show.original_language,
                    genre_ids: show.genre_ids,
                    vote_average: show.vote_average,
                    overview: show.overview,
                    first_air_date: show.release_date || show.first_air_date,
                    type: show.title ? "movie" : "tv"
                }))
                .slice(0, 4)
        );
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }
    return (
        <Container style={{ padding: 50 }}>
            <Trending>Trending TV shows</Trending>
            <ShowsCards>
                {TVShows.map(show => (
                    <TrendingShow
                        key={show.id}
                        title={show.title}
                        adult={show.adult}
                        backdrop_path={show.backdrop_path}
                        id={show.id}
                        popularity={show.popularity}
                        vote_count={show.vote_count}
                        vote_average={show.vote_average}
                        video={show.video}
                        poster_path={show.poster_path}
                        original_language={show.original_language}
                        genre_ids={show.genre_ids}
                        overview={show.overview}
                        first_air_date={show.first_air_date}
                        type={show.type}
                    />
                ))}
            </ShowsCards>
            <Trending>Trending Movies</Trending>
            <ShowsCards>
                {movies.map(movie => (
                    <TrendingShow
                        key={movie.id}
                        title={movie.title}
                        adult={movie.adult}
                        backdrop_path={movie.backdrop_path}
                        id={movie.id}
                        popularity={movie.popularity}
                        vote_count={movie.vote_count}
                        vote_average={movie.vote_average}
                        video={movie.video}
                        poster_path={movie.poster_path}
                        original_language={movie.original_language}
                        genre_ids={movie.genre_ids}
                        overview={movie.overview}
                        first_air_date={movie.first_air_date}
                        type={movie.type}
                    />
                ))}
            </ShowsCards>
        </Container>
    );
};

const ShowsCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Trending = styled.h1`
    font-size: 2rem;
    margin: 25px 25px 0 25px;
    align-self: flex-start;
`;

export default Homepage;
