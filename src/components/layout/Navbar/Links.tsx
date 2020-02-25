import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import fire from "../../../firebase/firebase";
import styled from "styled-components";
import UserIcon from "../../../assets/icons/user-icon.png";

const Links = () => {
    const { user, setUser } = useUser();

    const Logout = () => {
        fire.auth().signOut();
        setUser(null);
    };

    return (
        <LinksContainer>
            <StyledLink to="/tv">Series</StyledLink>
            <StyledLink to="/movie">Movies</StyledLink>
            {user ? (
                <Dropdown>
                    <User>
                        <img style={{ height: 40, width: 40, padding: 5 }} src={UserIcon} alt="" /> {user.username}
                    </User>
                    <DropdownItems>
                        <StyledLink to={`/mywatchlist`}>
                            <DropDownButtons>Watchlist</DropDownButtons>
                        </StyledLink>
                        <StyledLink to={`/myprofile`}>
                            <DropDownButtons>Profile</DropDownButtons>
                        </StyledLink>
                        <DropDownButtons onClick={Logout}>Logout</DropDownButtons>
                    </DropdownItems>
                </Dropdown>
            ) : (
                <Sign>
                    <LoginStyledLink to="/login">Login</LoginStyledLink>
                    <StyledLink to="/register">Register</StyledLink>
                </Sign>
            )}
        </LinksContainer>
    );
};

const LinksContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    color: white;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1.2rem;
`;

const LoginStyledLink = styled(StyledLink)`
    background: red;
    padding: 10px;
    border-radius: 4px;
`;

const DropdownItems = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    flex-direction: column;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;

    &:hover {
        ${DropdownItems} {
            display: flex;
        }
    }
`;

const User = styled.p`
    font-size: 1.2rem;
    width: 120px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 10;
`;

const DropDownButtons = styled.button`
    font-size: 1.2rem;
    border: none;
    background: none;
    color: white;
    padding: 16px;
    text-decoration: none;
    width: 100%;

    &:hover {
        cursor: pointer;
    }
`;

const Sign = styled.div`
    display: flex;
`;

export default Links;
