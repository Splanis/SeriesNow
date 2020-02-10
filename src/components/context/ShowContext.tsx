import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";

interface Props {
    children: ReactNode;
}

export interface IShow {
    adult: boolean;
    backdrop_path: string;
    title: string;
    id: number;
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: [number];
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface IShowProviderProps {
    movies: IShow[];
    setMovies: (movies: IShow[]) => void;
    sort: string;
    setSort: (sort: string) => void;
    query: string;
    setQuery: (sort: string) => void;
    show: string;
    setShow: (sort: 'movie' | 'tv') => void;
}

export const ShowContext = createContext<IShowProviderProps | null>(null);

export const ShowProvider = ({ children }: Props): JSX.Element => {
    const [movies, setMovies] = useState<IShow[]>([]);
    const [sort, setSort] = useState<string>("popularity.desc");
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState<'movie' | 'tv'>("movie");

    const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;
    const API_URL = `https://api.themoviedb.org/3/discover/${show}?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=1`;
    const API_QUERY_URL = `https://api.themoviedb.org/3/search/${show}?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
    let FETCH_URL = "";

    const providerValue: IShowProviderProps = {
        movies,
        setMovies,
        sort,
        setSort,
        query,
        setQuery,
        show,
        setShow
    };

    const fetchData = async () => {
        if (query) {
            FETCH_URL = API_QUERY_URL;
        } else {
            FETCH_URL = API_URL;
        }
        const response = await fetch(FETCH_URL);
        const data = await response.json();
        setMovies(
            data.results.map((movie: IShow) => ({
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
    }, [sort, query]);

    return <ShowContext.Provider value={providerValue}>{children}</ShowContext.Provider>;
};

export const useShows = () => useContext(ShowContext);
