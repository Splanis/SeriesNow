import React, { useState, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Spinner from "../../shared/Spinner";
import styled from "styled-components";
import LikeWatchlist from "../../shared/LikeWatchlist";

type MatchType = {
    id: string;
    showType: string;
};

interface IShowDetails {
    title: string;
    poster_path: string;
    overview: string;
    first_air_date: string;
    vote_average: number;
}

const ShowDetail: React.FC<RouteComponentProps<MatchType>> = ({ match }) => {
    const [showDetails, setShowDetails] = useState<IShowDetails>({} as IShowDetails);
    const [youtubeID, setYoutubeID] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const { title, poster_path, overview, first_air_date, vote_average } = showDetails;

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `https://api.themoviedb.org/3/${match.params["showType"]}/${match.params["id"]}?api_key=${process.env.REACT_APP_TMDb_API_KEY}&language=en-US`;
            const response = await fetch(API_URL);
            const showData = await response.json();

            if (showData.status_code === 34) {
                setError(true);
            }

            setShowDetails({
                title: showData.title || showData.original_name,
                poster_path: showData.poster_path,
                overview: showData.overview,
                first_air_date: showData.first_air_date || showData.release_date,
                vote_average: showData.vote_average
            });

            const youtube_query = `${showData.name || showData.title} trailer`;
            const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${youtube_query}%20trailer&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
            const youtubeResponse = await fetch(YOUTUBE_API_URL);
            const youtubeData = await youtubeResponse.json();

            setYoutubeID(youtubeData.items[0].id.videoId);
            setLoading(false);
        };
        fetchData();
    }, [match.params]);

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <Redirect to="/error404" />;
    }
    return (
        <ShowDetailContainer>
            <div style={{ margin: "0 150px" }}>
                <Poster src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt="" />
                <Title>{title}</Title>
                <Info>
                    <ReleaseDate>
                        {match.params["showType"] === "movie" ? "Released: " : "First Air Date: "}
                        {first_air_date}
                    </ReleaseDate>
                    <div style={{ display: "flex" }}>
                        <Rating>
                            Rating:{" "}
                            <span style={{ color: vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red" }}>
                                {vote_average}
                            </span>
                        </Rating>
                        <LikeWatchlist />
                    </div>
                </Info>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Trailer
                    src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1`}
                    width="940"
                    title={title}
                    height="600"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></Trailer>
                <Overview>{overview}</Overview>
            </div>
        </ShowDetailContainer>
    );
};

const ShowDetailContainer = styled.div`
    padding: 80px 0 20px 0;
    margin: 0 200px;
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 4rem;
    text-align: center;
`;

const Poster = styled.img`
    display: flex;
    justify-content: center;
`;

const Overview = styled.p`
    font-size: 1.5rem;
    padding: 15px;
    max-width: 940px;
`;

const ReleaseDate = styled.p`
    font-size: 1.3rem;
    opacity: 0.8;
    margin: 10px 0;
`;

const Trailer = styled.iframe``;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Rating = styled.p`
    font-weight: 600;
    font-size: 1.6rem;

    span {
        font-size: 1.6rem;
    }
`;

export default ShowDetail;
