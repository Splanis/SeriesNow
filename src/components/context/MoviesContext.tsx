import React, { useState, createContext, ReactNode, useContext } from "react";

interface Props {
    children: ReactNode;
}

export interface IMovie {
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

export interface IMovieProviderProps {
    movies: IMovie[];
    setMovies: (movies: IMovie[]) => void;
    loading: boolean;
}

// const initialState: IMovie = {
//     adult: false,
//     backdrop_path: "",
//     title: "test",
//     id: 1,
//     popularity: 0,
//     vote_count: 0,
//     video: false,
//     poster_path: "",
//     original_language: "",
//     original_title: "",
//     genre_ids: [0],
//     vote_average: 0,
//     overview: "",
//     release_date: ""
// };

export const MoviesContext = createContext<IMovieProviderProps | null>(null);

export const MoviesProvider = ({ children }: Props): JSX.Element => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    const providerValue: IMovieProviderProps = {
        movies,
        setMovies,
        loading: true
    };

    return <MoviesContext.Provider value={providerValue}>{children}</MoviesContext.Provider>;
};

export const useMovies = () => useContext(MoviesContext);
