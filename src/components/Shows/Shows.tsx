import React, { useEffect } from "react";
import { useShows } from "../context/ShowContext";
import Show from "./Show";
import Header from "../Header/Header";
import styled from "styled-components";
import { Button } from "../sharedStyles/Button";

const Shows: React.FC = () => {
    const providerValues = useShows();

    const handlePage = () => {
        if (providerValues?.page !== 1000) {
            providerValues?.setPage(providerValues?.page + 1);
        }
    };

    return (
        <ShowsContainer>
            <Header />
            <ShowsCards>
                {providerValues?.shows.map(show => (
                    <Show
                        key={show.id}
                        title={show.title}
                        original_title={show.original_title}
                        adult={show.adult}
                        backdrop_path={show.backdrop_path}
                        id={show.id}
                        popularity={show.popularity}
                        vote_count={show.vote_count}
                        vote_average={show.vote_average}
                        video={show.video}
                        poster_path={show.poster_path}
                        original_language={show.original_language}
                        genre_ids={show.genre_ids}
                        overview={show.overview}
                        release_date={show.release_date}
                    />
                ))}
            </ShowsCards>
            {providerValues?.page === 1000 || providerValues?.query ? null : <Button onClick={handlePage}>Load More</Button>}
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

export default Shows;
