import React, { useState } from "react";
import { IShow } from "../context/ShowContext";
import styled from "styled-components";
import likeIcon from "../../assets/icons/like.png";
import likedIcon from "../../assets/icons/liked.png";
import watchlistIcon from "../../assets/icons/watchlist.png";
import addedWatchlistIcon from "../../assets/icons/addedWatchlist.png";

const Show: React.FC<IShow> = ({ title, poster_path, overview, release_date, vote_average }) => {
    const [liked, setLike] = useState<boolean>(false);
    const [watchlist, setWatchlist] = useState<boolean>(false);

    const handleLike = () => {
        setLike(!liked);
    };

    const handleWatchlist = () => {
        setWatchlist(!watchlist);
    };

    return (
        <ShowCard>
            <Img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
            <ShowDetails>
                <Title>{title}</Title>
                <ReleaseDate>Released: {release_date}</ReleaseDate>
                <Overview>
                    {overview ? overview.slice(0, 110) : overview}
                    {"..."}
                </Overview>
                <Info>
                    <Rating>
                        Rating:{" "}
                        <span style={{ color: vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red" }}>{vote_average}</span>
                    </Rating>
                    <Buttons>
                        <Button onClick={handleWatchlist}>
                            <img src={watchlist ? addedWatchlistIcon : watchlistIcon} alt="" />
                        </Button>
                        <Button onClick={handleLike}>
                            <img src={liked ? likedIcon : likeIcon} alt="" />
                        </Button>
                    </Buttons>
                </Info>
            </ShowDetails>
        </ShowCard>
    );
};

const ShowCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 300px;
    height: 600px;
    margin: 10px;
    border-radius: 3px;
    box-shadow: -5px -5px 20px #111, 5px 5px 20px #222;
    transition: all 0.2s ease-in-out;
`;

const Img = styled.img`
    width: 100%;
    height: 420px;
    border-radius: 3px;
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

const Buttons = styled.div`
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

const Button = styled.button`
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 15px;

    img {
        height: 30px;

        &:hover {
            cursor: pointer;
        }
    }
`;

const AddToWatchList = styled.button``;

export default Show;
