import React, { useState } from "react";
import { useShows } from "../../../context/ShowContext";
import { IGenre } from "./Filter";
import styled from "styled-components";

const Genres: React.FC<IGenre> = ({ id, name }) => {
    const { genres, setGenres } = useShows();
    const [checked, setChecked] = useState<boolean>(false);

    const handleGenres = (e: any) => {
        if (!genres.includes(e.target.value)) {
            setGenres([...genres, e.target.value]);
        } else {
            setGenres(genres.filter(genre => genre !== e.target.value));
        }
        setChecked(genres.includes(id));
    };

    return (
        <div style={{ margin: 10 }}>
            <label htmlFor={name}>{name}</label>
            <input type="checkbox" value={id} name={name} onChange={handleGenres} />
        </div>
    );
};

export default Genres;
