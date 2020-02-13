import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IShow } from "../../context/ShowContext";
import styled from "styled-components";

type MatchType = {
    id: string;
    showType: string;
};

const ShowDetail: React.FC<RouteComponentProps<MatchType>> = ({ match }) => {
    const [showDetails, setShowDetails] = useState<IShow>({} as IShow);
    const { original_name, title, poster_path, overview, release_date, first_air_date, vote_average } = showDetails;
    const YOUTUBE_API_KEY = `AIzaSyBt-kwCm9TLwIzGDXdPncSLREr-zlZsL2s`;
    const API_KEY = `98b9ebfd32ac53d37febef32464f8607`;
    const API_URL = `https://api.themoviedb.org/3/${match.params["showType"]}/${match.params["id"]}?api_key=${API_KEY}&language=en-US`;

    const fetchData = async () => {
        const response = await fetch(API_URL);
        const showData = await response.json();
        setShowDetails(showData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ShowDetailContainer>
            <Title>
                {original_name}
                {title}
            </Title>
            <Img src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt="" />
            <iframe
                width="940"
                title={title}
                height="600"
                src="https://www.youtube.com/embed/9YffrCViTVk"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <Overview>{overview}</Overview>
            <ReleaseDate>
                {release_date}
                {first_air_date}
            </ReleaseDate>
            <Info>
                <Rating>
                    Rating:{" "}
                    <span style={{ color: vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red" }}>{vote_average}</span>
                </Rating>
            </Info>
        </ShowDetailContainer>
    );
};

const ShowDetailContainer = styled.div`
    height: 100vh;
    padding: 20px 200px;
`;

const Title = styled.h1`
    font-size: 5rem;
`;

const Img = styled.img``;

const Overview = styled.p`
    font-size: 1.5rem;
`;

const ReleaseDate = styled.p`
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 10px 0;
    flex: 1;
`;

const Info = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Rating = styled.p`
    font-weight: 600;
    font-size: 1.3rem;

    span {
        font-size: 1.3rem;
    }
`;

export default ShowDetail;
