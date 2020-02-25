import React from "react";
import { IShow } from "../../context/ShowContext";
import { useShows } from "../../context/ShowContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LikeWatchlist from "../../shared/LikeWatchlist";

const Show: React.FC<IShow> = ({ title, poster_path, overview, first_air_date, vote_average, id }) => {
    const { showType } = useShows();

    return (
        <ShowCard>
            <StyledLink to={`/showdetails/${showType}/${id}`}>
                <Poster src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt="No available image" />
            </StyledLink>
            <ShowDetails>
                <Title>{title}</Title>
                <ReleaseDate>
                    {showType === "movie" ? "Released: " : "First Air Date: "}
                    {first_air_date}
                </ReleaseDate>
                <Overview>
                    {overview && overview.slice(0, 100)}
                    {"..."}
                </Overview>
                <Info>
                    <Rating>
                        Rating:{" "}
                        <span style={{ color: vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red" }}>{vote_average}</span>
                    </Rating>
                    <LikeWatchlist />
                </Info>
            </ShowDetails>
        </ShowCard>
    );
};

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    width: 300px;
    height: 400px;
`;

const ShowCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 300px;
    height: 590px;
    margin: 10px;
    border-radius: 3px;
    box-shadow: -5px -5px 20px #111, 5px 5px 20px #222;
    transition: all 0.2s ease-in-out;
`;

const Poster = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 3px 3px 0 0;
`;

const ShowDetails = styled.div`
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 180px;
`;

const Title = styled.h1`
    font-size: 1.1rem;
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const ReleaseDate = styled.p`
    font-size: 0.9rem;
    opacity: 0.8;
    flex: 1;
    margin: 5px 0;
`;

const Overview = styled.p`
    flex: 2;
`;

const Info = styled.div`
    flex: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Rating = styled.p`
    font-weight: 600;
    font-size: 1.3rem;

    span {
        font-size: 1.3rem;
    }
`;

// const AddToWatchList = styled.button``;

export default Show;
