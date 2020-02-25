import React, { useState, createContext, ReactNode, useContext } from "react";

interface Props {
    children: ReactNode;
}

export interface IShow {
    title: string;
    adult: boolean | undefined;
    backdrop_path: string;
    id: number;
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    original_language: string;
    genre_ids: number[];
    vote_average: number;
    overview: string;
    first_air_date: string;
    type: string;
}

interface IShowProviderProps {
    shows: IShow[];
    setShows: (shows: IShow[]) => void;
    sort: string;
    setSort: (sort: string) => void;
    query: string;
    setQuery: (sort: string) => void;
    showType: string;
    setShowType: (sort: string) => void;
    page: number;
    setPage: (page: number) => void;
}

export const ShowContext = createContext<IShowProviderProps>({} as IShowProviderProps);

export const ShowProvider = ({ children }: Props): JSX.Element => {
    const [shows, setShows] = useState<IShow[]>([] as IShow[]);
    const [sort, setSort] = useState<string>("popularity.desc");
    const [query, setQuery] = useState<string>("");
    const [showType, setShowType] = useState<string>("");
    const [page, setPage] = useState<number>(1);

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

    return <ShowContext.Provider value={providerValues}>{children}</ShowContext.Provider>;
};

export const useShows = () => useContext(ShowContext);
