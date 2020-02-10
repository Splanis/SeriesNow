import React, { useState } from "react";
import { useShows } from "../context/ShowContext";
import Show from "./Show";
import Header from "../Header";
import styled from "styled-components";

const Shows: React.FC = () => {
    const providerValues = useShows();
    const [page, setPage] = useState<number>(1);

    const handlePage = () => {
        if (page !== 1000)
        setPage(page + 1);
    };

    return (
        <ShowsContainer>
            <Header />
            <ShowsCards>
                {providerValues?.shows.map(movie => (
                    <Show
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
            </ShowsCards>
            <Button onClick={handlePage}>Load More</Button>
        </ShowsContainer>
    );
};

const ShowsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;

const ShowsCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Button = styled.button`
    width: 100px;
    background: black;
    color: white;
    border: none;
    padding: 5px;
    margin: 5px;
    border-radius: 30px;

    &:hover {
        cursor: pointer;
    }
`;

export default Shows;
