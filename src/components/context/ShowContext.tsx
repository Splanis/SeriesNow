import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";

interface Props {
    children: ReactNode;
}

export interface IShow {
    adult: boolean | undefined;
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
    shows: IShow[];
    setShows: (currentShows: IShow[], shows: IShow[]) => void;
    sort: string;
    setSort: (sort: string) => void;
    query: string;
    setQuery: (sort: string) => void;
    show: string;
    setShow: (sort: "movie" | "tv") => void;
    page: number;
    setPage: (page: number) => void;
}

export const ShowContext = createContext<IShowProviderProps | null>(null);

export const ShowProvider = ({ children }: Props): JSX.Element => {
    const [shows, setShows] = useState<IShow[]>([]);
    const [sort, setSort] = useState<string>("popularity.desc");
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState<"movie" | "tv">("movie");
    const [page, setPage] = useState<number>(1);

    const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;
    const API_URL = `https://api.themoviedb.org/3/discover/${show}?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`;
    const API_SEARCH_URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`;
    let FETCH_URL = "";

    const providerValue: IShowProviderProps = {
        shows,
        setShows,
        sort,
        setSort,
        query,
        setQuery,
        show,
        setShow,
        page,
        setPage
    };

    const fetchData = async () => {
        if (query) {
            FETCH_URL = API_SEARCH_URL;
        } else {
            FETCH_URL = API_URL;
        }
        const response = await fetch(FETCH_URL);
        const data = await response.json();
        if (page !== 1) {
            setShows([
                ...shows,
                ...data.results.map((show: IShow) => ({
                    adult: show.adult,
                    backdrop_path: show.backdrop_path,
                    title: show.title,
                    id: show.id,
                    popularity: show.popularity,
                    vote_count: show.vote_count,
                    video: show.video,
                    poster_path: show.poster_path,
                    original_language: show.original_language,
                    original_title: show.original_title,
                    genre_ids: show.genre_ids,
                    vote_average: show.vote_average,
                    overview: show.overview,
                    release_date: show.release_date
                }))
            ]);
        } else {
            setShows(
                data.results.map((show: IShow) => ({
                    adult: show.adult,
                    backdrop_path: show.backdrop_path,
                    title: show.title,
                    id: show.id,
                    popularity: show.popularity,
                    vote_count: show.vote_count,
                    video: show.video,
                    poster_path: show.poster_path,
                    original_language: show.original_language,
                    original_title: show.original_title,
                    genre_ids: show.genre_ids,
                    vote_average: show.vote_average,
                    overview: show.overview,
                    release_date: show.release_date
                }))
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, [sort, query, show, page]);

    return <ShowContext.Provider value={providerValue}>{children}</ShowContext.Provider>;
};

export const useShows = () => useContext(ShowContext);
