import React from "react";
import { Link } from "react-router-dom";
import { useShows } from "../../context/ShowContext";
import { useUser } from "../../context/UserContext";
import SearchBar from "./SearchBar";
import fire from "../../../firebase/firebase";
import styled from "styled-components";

const Movies: React.FC = () => {
    const { user, setUser } = useUser();
    const { setPage, setShowType } = useShows();

    const Logout = () => {
        fire.auth().signOut();
        setUser(null);
    };

    return (
        <Nav>
            <Logo>
                <LogoLink to="/">
                    Series<span style={{ color: "red" }}>NOW</span>
                </LogoLink>
            </Logo>

            <SearchBar />

            <Links>
                <StyledLink
                    to="/tv"
                    onClick={() => {
                        setShowType("tv");
                        setPage(1);
                        window.scrollTo(0, 0);
                    }}
                >
                    Series
                </StyledLink>
                <StyledLink
                    to="/movie"
                    onClick={() => {
                        setShowType("movie");
                        setPage(1);
                        window.scrollTo(0, 0);
                    }}
                >
                    Movies
                </StyledLink>
                {user ? (
                    <Dropdown>
                        <User>{user.username}</User>
                        <DropdownItems>
                            <DropDownButtons>WhatchList</DropDownButtons>
                            <Link to={`/profile/${user.username}`}>
                                <DropDownButtons>Profile</DropDownButtons>
                            </Link>
                            <DropDownButtons onClick={Logout}>Logout</DropDownButtons>
                        </DropdownItems>
                    </Dropdown>
                ) : (
                    <Sign>
                        <StyledLink to="/login">Login</StyledLink>
                        <StyledLink to="/register">Register</StyledLink>
                    </Sign>
                )}
            </Links>
        </Nav>
    );
};

const Nav = styled.nav`
    background: rgba(0, 0, 0, 0.8);
    color: white;
    height: 70px;
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    z-index: 10;
`;

const Logo = styled.div`
    margin-left: 10px;
`;

const LogoLink = styled(Link)`
    color: white;
    display: flex;
    justify-content: center;
    text-decoration: none;
    font-size: 3rem;
`;

const StyledLink = styled(Link)`
    color: white;
    width: 120px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    font-size: 1.2rem;
`;

const Links = styled.div`
    display: flex;
    align-items: center;
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

    &:hover {
        cursor: pointer;
    }
`;

const Sign = styled.div`
    display: flex;
`;

export default Movies;
