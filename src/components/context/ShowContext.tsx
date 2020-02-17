import React, { useState, createContext, ReactNode, useContext } from "react";

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
    genre_ids: number[];
    vote_average: number;
    overview: string;
    release_date: string;
    first_air_date: string;
}

interface IShowProviderProps {
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
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const ShowContext = createContext<IShowProviderProps>({} as IShowProviderProps);

export const ShowProvider = ({ children }: Props): JSX.Element => {
    const [shows, setShows] = useState<IShow[]>([] as IShow[]);
    const [sort, setSort] = useState<string>("popularity.desc");
    const [query, setQuery] = useState<string>("");
    const [showType, setShowType] = useState<"movie" | "tv">("movie");
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

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
        setPage,
        loading,
        setLoading
    };

    return <ShowContext.Provider value={providerValues}>{children}</ShowContext.Provider>;
};

export const useShows = () => useContext(ShowContext);
