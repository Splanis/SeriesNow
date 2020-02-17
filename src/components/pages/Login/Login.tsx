import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link, Redirect } from "react-router-dom";
import fire from "../../../firebase/firebase";
import { Button, Buttons } from "../../sharedStyles/Button";
import { Form, Input } from "../../sharedStyles/Form";
import { Errors } from "../../sharedStyles/Errors";
import { Title } from "../../sharedStyles/Title";
import { Container } from "../../sharedStyles/Container";
import styled from "styled-components";

const Login = () => {
    const { user, } = useUser();
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
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />

                <Input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <Buttons>
                    <StyledButton type="submit">Login</StyledButton>
                    <Link to="/register">
                        <StyledButton type="submit">Register</StyledButton>
                    </Link>
                </Buttons>

                {error ? <Errors>{error}</Errors> : ""}
            </Form>
        </Container>
    );
};

const StyledButton = styled(Button)`
    width: 100px;
`;

export default Login;
