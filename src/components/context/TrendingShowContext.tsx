import React, { useState, useContext, createContext, ReactNode } from "react";
import { IShow } from "./ShowContext";

interface Props {
    children: ReactNode;
}

interface IShowProviderProps {
    TVShows: IShow[];
    setTVShows: (shows: IShow[]) => void;
    movies: IShow[];
    setMovies: (shows: IShow[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const TredingShowContext = createContext<IShowProviderProps>({} as IShowProviderProps);

export const TrendingShowProvider = ({ children }: Props): JSX.Element => {
    const [TVShows, setTVShows] = useState<IShow[]>([] as IShow[]);
    const [movies, setMovies] = useState<IShow[]>([] as IShow[]);
    const [loading, setLoading] = useState<boolean>(true);

    const providerValues: IShowProviderProps = {
        TVShows,
        setTVShows,
        movies,
        setMovies,
        loading,
        setLoading
    };

    return <TredingShowContext.Provider value={providerValues}>{children}</TredingShowContext.Provider>;
};

export const useTrendingShows = () => useContext(TredingShowContext);
