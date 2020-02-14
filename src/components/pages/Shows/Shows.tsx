import React, { useEffect } from "react";
import { useShows } from "../../context/ShowContext";
import Show from "./Show";
import Header from "./header/Header";
import Spinner from "../../sharedStyles/Spinner";
import { Container } from "../../sharedStyles/Container";
import styled from "styled-components";
import BottomScrollListener from "react-bottom-scroll-listener";
import { TMDb_API_KEY } from "../../../API/ApiKeys";

const Shows: React.FC = () => {
    const { shows, setShows, page, setPage, query, sort, showType, setSort, loading, setLoading } = useShows();

    const API_URL = `https://api.themoviedb.org/3/discover/${showType}?api_key=${TMDb_API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`;
    const API_SEARCH_URL = `https://api.themoviedb.org/3/search/${showType}?api_key=${TMDb_API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`;
    let FETCH_URL = "";

    const handlePage = () => {
        if (page !== 1000) {
            setPage(page + 1);
        }
    };

    const fetchData = async () => {
        if (query) {
            FETCH_URL = API_SEARCH_URL;
        } else {
            FETCH_URL = API_URL;
        }

        const response = await fetch(FETCH_URL);
        const fetchedShows = await response.json();

        if (page === 1) {
            setShows(fetchedShows.results);
        } else {
            setShows([...shows, ...fetchedShows.results]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    useEffect(() => {
        if (page === 1) {
            window.scrollTo(0, 0);
        } else {
            fetchData();
        }
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [sort, showType]);

    useEffect(() => {
        setSort("popularity.desc");
    }, [setSort]);

    if (loading) {
        return <Spinner />;
    }
    if (shows.length === 0) {
        return <Paragraph>No Shows Found</Paragraph>;
    }
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
            <Paragraph>Scroll down to see more {showType === "movie" ? "movies" : "TV shows"}</Paragraph>
            <BottomScrollListener onBottom={handlePage} />
        </ShowsContainer>
    );
};

const ShowsContainer = styled(Container)`
    padding: 80px 10px 10px 10px;
`;

const ShowsCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Paragraph = styled.p`
    font-size: 1.4rem;
    margin: 10px;
`;

export default Shows;
