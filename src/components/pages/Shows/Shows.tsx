import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useShows, IShow } from "../../context/ShowContext";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Show from "./Show";
import Header from "./header/Header";
import Spinner from "../../shared/Spinner";
import { Container } from "../../shared/Container";
import styled from "styled-components";
import BottomScrollListener from "react-bottom-scroll-listener";

const Shows: React.FC<RouteComponentProps<string>> = props => {
    const { shows, setShows, page, setPage, query, sort, setSort, showType, setShowType } = useShows();
    const [loading, setLoading] = useState<boolean>(true);
    const isInitialMount = useRef(true);

    const fetchData = async () => {
        const today = new Date().toJSON().slice(0, 10);
        const API_URL = `https://api.themoviedb.org/3/discover/${showType}?api_key=${process.env.REACT_APP_TMDb_API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&primary_release_date.lte=${today}&first_air_date.lte=${today}`;
        const API_SEARCH_URL = `https://api.themoviedb.org/3/search/${showType}?api_key=${process.env.REACT_APP_TMDb_API_KEY}&language=en-US&query=${query}&include_adult=false`;
        let FETCH_URL = "";

        if (query) {
            FETCH_URL = API_SEARCH_URL;
        } else {
            FETCH_URL = API_URL;
        }

        const response = await fetch(FETCH_URL);
        const fetchedShows = await response.json();
        const results = fetchedShows.results.map((show: any) => ({
            adult: show.adult,
            backdrop_path: show.backdrop_path,
            title: show.title || show.name,
            id: show.id,
            popularity: show.popularity,
            vote_count: show.vote_count,
            video: show.video,
            poster_path: show.poster_path,
            original_language: show.original_language,
            genre_ids: show.genre_ids,
            vote_average: show.vote_average,
            overview: show.overview,
            first_air_date: show.release_date || show.first_air_date,
            type: show.title ? "movie" : "tv"
        }));
        
        if (page === 1 || query) {
            setShows(results);
            console.log(shows);
        } else {
            setShows([...shows, ...results]);
        }
        setLoading(false);
        console.log("fetching");
    };

    useEffect(() => {
        if (isInitialMount.current) {
            const currentPath = props.location.pathname.replace(/\//, "");
            setShowType(currentPath);
            setLoading(true);
            setSort("popularity.desc");
            setPage(1);
            window.scrollTo(0, 0);
            isInitialMount.current = false;
        }
        return () => {
            setShows([] as IShow[]);
            setShowType("");
        };
    }, []);

    useLayoutEffect(() => {
        if (!isInitialMount.current) {
            if (query && page !== 1) {
                setPage(1);
            }
            fetchData();
        }
    }, [query, page, showType]);

    useLayoutEffect(() => {
        if (!isInitialMount.current) {
            if (page !== 1) {
                setPage(1);
            } else {
                fetchData();
            }
        }
    }, [sort]);

    useLayoutEffect(() => {
        if (!isInitialMount.current) {
            const currentPath = props.location.pathname.replace(/\//, "");
            setShowType(currentPath);
            setPage(1);
            setLoading(true);
            setSort("popularity.desc");
            window.scrollTo(0, 0);
        }
    }, [props.location.pathname]);

    if (loading) {
        return <Spinner />;
    }

    if (shows.length === 0) {
        return <Paragraph>No Shows Found</Paragraph>;
    }

    return (
        <ShowsContainer>
            {!query && <Header />}
            <ShowsCards>
                {shows.map(show => (
                    <Show
                        key={show.id}
                        title={show.title}
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
                        first_air_date={show.first_air_date}
                        type={show.type}
                    />
                ))}
            </ShowsCards>
            {!query && <Paragraph>Scroll down to see more {showType === "movie" ? "Movies" : "TV Shows"}</Paragraph>}
            {!query && (
                <BottomScrollListener
                    onBottom={() => {
                        if (page !== 1000) {
                            setPage(page + 1);
                        }
                    }}
                />
            )}
        </ShowsContainer>
    );
};

const ShowsContainer = styled(Container)`
    padding: 80px 10px 10px 10px;
    min-height: 100%;
    min-width: 100%;
`;

const ShowsCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
`;

const Paragraph = styled.p`
    font-size: 1.4rem;
    margin: 10px;
`;

export default withRouter(Shows);
