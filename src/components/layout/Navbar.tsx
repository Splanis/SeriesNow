import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useShows } from "../context/ShowContext";

const Movies: React.FC = () => {
    const { query, setQuery, setPage, setShowType } = useShows();
    const queryHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        setPage(1);
    }, [query, setPage]);

    return (
        <Nav>
            <Logo>
                <StyledLink to="/">Logo</StyledLink>
            </Logo>

            <Form>
                <Input type="text" value={query} placeholder="Search..." onChange={queryHandle} />
            </Form>

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
                <p style={{ fontSize: "1.5rem", margin: "20px" }}>Username</p>
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
    width: 250px;
`;

const StyledLink = styled(Link)`
    color: white;
    margin: 20px;
    text-decoration: none;
    font-size: 1.5rem;
`;

const Form = styled.form``;

const Input = styled.input`
    color: white;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.1rem;
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
`;

export default Movies;
