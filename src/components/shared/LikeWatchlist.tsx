import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import likeIcon from "../../assets/icons/like.png";
import likedIcon from "../../assets/icons/liked.png";
import watchlistIcon from "../../assets/icons/watchlist.png";
import addedWatchlistIcon from "../../assets/icons/addedWatchlist.png";

const LikeWatachlist = () => {
    const { user } = useUser();

    const [liked, setLike] = useState<boolean>(false);
    const [watchlist, setWatchlist] = useState<boolean>(false);

    const handleLike = () => {
        setLike(!liked);
    };

    const handleWatchlist = () => {
        setWatchlist(!watchlist);
    };

    return (
        <div>
            {user ? (
                <Buttons>
                    <Button onClick={handleWatchlist}>
                        <img src={watchlist ? addedWatchlistIcon : watchlistIcon} alt="" />
                    </Button>
                    <Button onClick={handleLike}>
                        <img src={liked ? likedIcon : likeIcon} alt="" />
                    </Button>
                </Buttons>
            ) : (
                <Link to="/login" style={{ color: "white" }}>
                    <p>Login to add to Watchlist</p>
                </Link>
            )}
        </div>
    );
};

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

export default LikeWatachlist;
