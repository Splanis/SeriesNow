import React, {useEffect} from "react";
import { useShows } from "../../context/ShowContext";
import Show from "./Show";
import Header from "../../Header/Header";
import styled from "styled-components";
import BottomScrollListener from "react-bottom-scroll-listener";

const Shows: React.FC = () => {
    const { shows, page, setPage, query, setSort} = useShows();

    const handlePage = () => {
        if (page !== 1000) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        setSort("popularity.desc");
    }, [setSort]);

    return (
        <ShowsContainer>
            {!query ? <Header /> : null}
            <ShowsCards>
                {shows.map(show => (
                    <Show
                        key={show.id}
                        title={show.title}
                        original_name={show.original_name}
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
                        first_air_date={show.first_air_date}
                    />
                ))}
            </ShowsCards>
            <BottomScrollListener onBottom={handlePage} />
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
