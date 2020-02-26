import React from "react";
import { useShows } from "../../../context/ShowContext";
import { IGenre } from "./Filter";

const Genres: React.FC<IGenre> = ({ id, name }) => {
    const { genres, setGenres } = useShows();

    const handleGenres = (e: any) => {
        if (!genres.includes(e.target.value)) {
            setGenres([...genres, e.target.value]);
        } else {
            setGenres(genres.filter(genre => genre !== e.target.value));
        }
    };

    return (
        <div style={{ margin: 10 }}>
            <label htmlFor={name}>{name}</label>
            <input type="checkbox" checked={genres.includes(id.toString())} value={id} name={name} onChange={handleGenres} />
        </div>
    );
};

export default Genres;
