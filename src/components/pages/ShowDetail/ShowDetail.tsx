import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IShow } from "../../context/ShowContext";
import styled from "styled-components";
import { TMDb_API_KEY, YOUTUBE_API_KEY } from "../../../API/ApiKeys";

type MatchType = {
    id: string;
    showType: string;
};

const ShowDetail: React.FC<RouteComponentProps<MatchType>> = ({ match }) => {
    const [showDetails, setShowDetails] = useState<IShow>({} as IShow);
    const [youtubeID, setYoutubeID] = useState<string>("");
    const { original_name, title, poster_path, overview, release_date, first_air_date, vote_average } = showDetails;

    const API_URL = `https://api.themoviedb.org/3/${match.params["showType"]}/${match.params["id"]}?api_key=${TMDb_API_KEY}&language=en-US`;

    const fetchData = async () => {
        const response = await fetch(API_URL);
        const showData = await response.json();
        setShowDetails(showData);
        const query = `${showData.name ? showData.name : ""}${showData.title ? showData.title : ""} trailer`;
        const YOUTUBE_QUERY_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}%20trailer&key=${YOUTUBE_API_KEY}`;
        const youtubeResponse = await fetch(YOUTUBE_QUERY_URL);
        const youtubeData = await youtubeResponse.json();
        setYoutubeID(youtubeData.items[0].id.videoId);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ShowDetailContainer>
            <div style={{ margin: "0 150px" }}>
                <Poster src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt="" />
                <Title>
                    {original_name}
                    {title}
                </Title>
                <Info>
                    <ReleaseDate>
                        {match.params["showType"] === "movie" ? "Released: " : "First Air Date: "}
                        {release_date}
                        {first_air_date}
                    </ReleaseDate>
                    <Rating>
                        Rating:{" "}
                        <span style={{ color: vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red" }}>{vote_average}</span>
                    </Rating>
                </Info>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Trailer
                    width="940"
                    title={title}
                    height="600"
                    src={`https://www.youtube.com/embed/${youtubeID}`}
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
