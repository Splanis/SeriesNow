import React, { useState, useEffect } from "react";
import TrendingShow from "./TrendingShow";
import { useTrendingShows } from "../../context/TrendingShowContext";
import Spinner from "../../shared/Spinner";
import { Container } from "../../shared/Container";
import leftArrow from "../../../assets/icons/left-arrow.png";
import rightArrow from "../../../assets/icons/right-arrow.png";
import styled from "styled-components";

const Homepage: React.FC = () => {
    const { TVShows, setTVShows, movies, setMovies, loading, setLoading } = useTrendingShows();
    const [TVShowPage, setTVShowPage] = useState<number[]>([0, 4]);
    const [MoviePage, setMoviePage] = useState<number[]>([0, 4]);

    const API_TVSHOWS_URL = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;
    const API_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;

    const fetchData = async () => {
        const tv_response = await fetch(API_TVSHOWS_URL);
        const tv_data = await tv_response.json();
        const movies_response = await fetch(API_MOVIES_URL);
        const movies_data = await movies_response.json();

        setTVShows(
            tv_data.results.map((show: any) => ({
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
        );
        setMovies(
            movies_data.results.map((show: any) => ({
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
        );
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePage = (e: any) => {
        switch (e.target.value) {
            case "decrease-tv-page":
                setTVShowPage([TVShowPage[0] - 4, TVShowPage[1] - 4]);
                if (TVShowPage[0] === 0 && TVShowPage[1] === 4) setTVShowPage([16, 20]);
                break;
            case "increase-tv-page":
                setTVShowPage([TVShowPage[0] + 4, TVShowPage[1] + 4]);
                if (TVShowPage[0] === 16 && TVShowPage[1] === 20) setTVShowPage([0, 4]);
                break;
            case "decrease-movie-page":
                setMoviePage([MoviePage[0] - 4, MoviePage[1] - 4]);
                if (MoviePage[0] === 0 && MoviePage[1] === 4) setMoviePage([16, 20]);
                break;
            case "increase-movie-page":
                setMoviePage([MoviePage[0] + 4, MoviePage[1] + 4]);
                if (MoviePage[0] === 16 && MoviePage[1] === 20) setMoviePage([0, 4]);
                break;
        }
    };
    console.log(MoviePage, TVShowPage);
    if (loading) {
        return <Spinner />;
    }
    return (
        <Container style={{ padding: 50 }}>
            <Trending>Trending TV shows</Trending>
            <div style={{ display: "flex", alignItems: "center" }}>
                <LeftButton value="decrease-tv-page" onClick={handlePage}></LeftButton>
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
                    )).slice(TVShowPage[0], TVShowPage[1])}
                </ShowsCards>
                <RightButton value="increase-tv-page" onClick={handlePage}></RightButton>
            </div>
            <Trending>Trending Movies</Trending>
            <div style={{ display: "flex", alignItems: "center" }}>
                <LeftButton value="decrease-movie-page" onClick={handlePage}></LeftButton>
                <ShowsCards>
                    {movies
                        .map(movie => (
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
                        ))
                        .slice(MoviePage[0], MoviePage[1])}
                </ShowsCards>
                <RightButton value="increase-movie-page" onClick={handlePage}></RightButton>
            </div>
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

const Button = styled.button`
    border: none;
    background: url(${leftArrow}) no-repeat;
    height: 35px;
    width: 35px;

    &:hover {
        cursor: pointer;
    }
`;

const RightButton = styled(Button)`
    background: url(${rightArrow}) no-repeat;
    margin-left: 32px;
`;

const LeftButton = styled(Button)`
    background: url(${leftArrow}) no-repeat;
    margin-right: 32px;
`;

export default Homepage;
