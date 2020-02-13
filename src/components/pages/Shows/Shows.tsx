import React, { useEffect } from "react";
import { useShows } from "../../context/ShowContext";
import Show from "./Show";
import Header from "../../Header/Header";
import styled from "styled-components";
import BottomScrollListener from "react-bottom-scroll-listener";

const Shows: React.FC = () => {
    const { shows, setShows, page, setPage, query, sort, showType, setSort } = useShows();

    const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;
    const API_URL = `https://api.themoviedb.org/3/discover/${showType}?api_key=${API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`;
    const API_SEARCH_URL = `https://api.themoviedb.org/3/search/${showType}?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`;
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

        // const showsData = data.results.map((show: IShow) => ({
        //     adult: show.adult,
        //     backdrop_path: show.backdrop_path,
        //     title: show.title,
        //     id: show.id,
        //     popularity: show.popularity,
        //     vote_count: show.vote_count,
        //     video: show.video,
        //     poster_path: show.poster_path,
        //     original_language: show.original_language,
        //     original_name: show.original_name,
        //     genre_ids: show.genre_ids,
        //     vote_average: show.vote_average,
        //     overview: show.overview,
        //     release_date: show.release_date,
        //     first_air_date: show.first_air_date
        // }));

        if (page === 1) {
            setShows(fetchedShows.results);
        } else {
            setShows([...shows, ...fetchedShows.results]);
        }
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
            <ScrollDown>Scroll down to see more {showType === "movie" ? "movies" : "TV shows"}</ScrollDown>
            <BottomScrollListener onBottom={handlePage} />
        </ShowsContainer>
    );
};

const ShowsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px;
`;

const ShowsCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ScrollDown = styled.p`
    font-size: 1.4rem;
    margin: 10px;
`;

export default Shows;
