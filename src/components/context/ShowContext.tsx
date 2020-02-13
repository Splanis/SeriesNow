import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";

interface Props {
    children: ReactNode;
}

export interface IShow {
    adult: boolean | undefined;
    backdrop_path: string;
    title: string;
    original_name: string;
    id: number;
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    original_language: string;
    genre_ids: [number];
    vote_average: number;
    overview: string;
    release_date: string;
    first_air_date: string;
}

export interface IShowProviderProps {
    shows: IShow[];
    setShows: (shows: IShow[]) => void;
    sort: string;
    setSort: (sort: string) => void;
    query: string;
    setQuery: (sort: string) => void;
    showType: "movie" | "tv";
    setShowType: (sort: "movie" | "tv") => void;
    page: number;
    setPage: (page: number) => void;
}

export const ShowContext = createContext<IShowProviderProps>({} as IShowProviderProps);

export const ShowProvider = ({ children }: Props): JSX.Element => {
    const [shows, setShows] = useState<IShow[]>([]);
    const [sort, setSort] = useState<string>("popularity.desc");
    const [query, setQuery] = useState<string>("");
    const [showType, setShowType] = useState<"movie" | "tv">("movie");
    const [page, setPage] = useState<number>(1);

    const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;
    const API_URL = `https://api.themoviedb.org/3/discover/${showType}?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`;
    const API_SEARCH_URL = `https://api.themoviedb.org/3/search/${showType}?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`;
    let FETCH_URL = "";

    const providerValues: IShowProviderProps = {
        shows,
        setShows,
        sort,
        setSort,
        query,
        setQuery,
        showType,
        setShowType,
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
        const showsData = data.results.map((show: IShow) => ({
            adult: show.adult,
            backdrop_path: show.backdrop_path,
            title: show.title,
            id: show.id,
            popularity: show.popularity,
            vote_count: show.vote_count,
            video: show.video,
            poster_path: show.poster_path,
            original_language: show.original_language,
            original_name: show.original_name,
            genre_ids: show.genre_ids,
            vote_average: show.vote_average,
            overview: show.overview,
            release_date: show.release_date,
            first_air_date: show.first_air_date
        }));

        if (page === 1) {    
            if (query) {
                setShows([...shows, ...showsData]);
            } else {
                setShows(showsData);
            }
        } else {
            if (query) {
              
                setShows(showsData);
            } else {
                setShows([...shows, ...showsData]);
            }
        }
    };
    console.log(query);
    console.log(shows);
    console.log(page);

    useEffect(() => {
        fetchData();
    }, [sort, query, showType, page]);

    return <ShowContext.Provider value={providerValues}>{children}</ShowContext.Provider>;
};

export const useShows = () => useContext(ShowContext);
