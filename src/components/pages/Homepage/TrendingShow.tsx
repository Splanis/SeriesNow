import React from "react";
import { IShow } from "../../context/ShowContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TrendingShow: React.FC<IShow> = ({ title, backdrop_path, overview, first_air_date, vote_average, id, type }) => {
    return (
        <div>
            <StyledLink to={`/showdetails/${type}/${id}`}>
                <ShowCard>
                    <Poster src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="" />
                    <ShowDetails>
                        <Title>{title.length >= 30 ? title.slice(0, 30) + "..." : title}</Title>
                        <ReleaseDate>{first_air_date}</ReleaseDate>
                        <Overview>
                            {overview && overview.slice(0, 150)}
                            {"..."}
                        </Overview>
                        <Info>
                            <Rating>
                                Rating:
                                <span style={{ color: vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red", marginLeft: 5 }}>
                                    {vote_average}
                                </span>
                            </Rating>
                        </Info>
                    </ShowDetails>
                </ShowCard>
            </StyledLink>
        </div>
    );
};

const StyledLink = styled(Link)`
    color: white;
`;

const ShowCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 400px;
    height: 220px;
    margin: 5px;
    border-radius: 3px;
    box-shadow: 1px 1px 5px #111;
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover {
        transform: scale(1.2);
        z-index: 10;

        img {
            filter: brightness(20%);
        }

        div {
            opacity: 1;
        }
    }
`;

const Poster = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;
`;

const ShowDetails = styled.div`
    position: absolute;
    opacity: 0;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: all 0.6s ease;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const ReleaseDate = styled.p`
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 10px 0;
    flex: 1;
`;

const Overview = styled.p`
    flex: 4;
    font-size: 1.2rem;
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

export default TrendingShow;
