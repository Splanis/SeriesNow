import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link, Redirect } from "react-router-dom";
import fire from "../../../firebase/firebase";
import { Button, Buttons } from "../../shared/Buttons";
import { Form, Input } from "../../shared/Form";
import { Errors } from "../../shared/Errors";
import { Title } from "../../shared/Title";
import { Container } from "../../shared/Container";
import styled from "styled-components";

const Login = () => {
    const { user } = useUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onLogin = (e: any) => {
        e.preventDefault();
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setError("");
            })
            .catch(er => {
                setError(er.code);
            });

        setEmail("");
        setPassword("");
    };

    if (user) {
        return <Redirect to="/" />;
    }
    return (
        <Container>
            <Title>Login</Title>
            <Form onSubmit={onLogin}>
                <Input
                    type="text"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                    }}
                />

                <Input
                    type="password"
                    value={password}
                    placeholder="Password"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                    }}
                />
                <Buttons>
                    <StyledButton type="submit">Login</StyledButton>
                    <Link to="/register">
                        <StyledButton type="submit">Register</StyledButton>
                    </Link>
                </Buttons>
            </Form>
            {error && <Errors>{error}</Errors>}
        </Container>
    );
};

const StyledButton = styled(Button)`
    width: 100px;
`;

export default Login;
