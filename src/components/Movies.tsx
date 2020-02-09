import React, { useEffect, useState } from "react";
import { IMovie, useMovies } from "./context/MoviesContext";
import Movie from "./Movie";
import styled from "styled-components";

const Movies: React.FC = () => {
    const providerValues = useMovies();
    const [page, setPage] = useState<number>(1);
    const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&`;
    const handlePage = (e: any) => {
        setPage(e.target.value);
    };

    const fetchData = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
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

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <MoviesContainer>
            <Buttons>
                <Button value={1} onClick={handlePage}>
                    1
                </Button>
                <Button value={2} onClick={handlePage}>
                    2
                </Button>
                <Button value={3} onClick={handlePage}>
                    3
                </Button>
            </Buttons>
            <MoviesCards>
                {providerValues?.movies.map(movie => (
                    <Movie
                        key={movie.id}
                        title={movie.title}
                        original_title={movie.original_title}
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
                        release_date={movie.release_date}
                    />
                ))}
            </MoviesCards>
            <Button onClick={handlePage}>Load More</Button>
        </MoviesContainer>
    );
};

const MoviesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;

const MoviesCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Buttons = styled.div``;

const Button = styled.button`
    width: 50px;
    background: black;
    color: white;
    border: none;
    padding: 5px;
    margin: 5px;

    &:hover {
        cursor: pointer;
    }
`;

export default Movies;
