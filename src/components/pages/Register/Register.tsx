import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import fire from "../../../firebase/firebase";
import { Redirect } from "react-router-dom";
import { Button, Buttons } from "../../sharedStyles/Buttons";
import { Form, Input } from "../../sharedStyles/Form";
import { Errors } from "../../sharedStyles/Errors";
import { Title } from "../../sharedStyles/Title";
import { Container } from "../../sharedStyles/Container";
import styled from "styled-components";

const Register = () => {
    const { user } = useUser();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<string>();

    const Register = (e: any) => {
        e.preventDefault();
        if (password === password2) {
            fire.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    fire.auth().currentUser?.updateProfile({
                        displayName: username
                    });
                    setError("");
                })
                .catch(er => {
                    setError(er.code);
                });

            setEmail("");
            setUsername("");
            setPassword("");
            setPassword2("");
        } else {
            setError("auth/passwords-do-not-match");
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }
    return (
        <Container>
            <Title>Register</Title>
            <Form onSubmit={Register} style={{ display: "flex", flexDirection: "column" }}>
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
                    type="text"
                    value={username}
                    placeholder="Username"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
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
                <Input
                    type="password"
                    value={password2}
                    placeholder="Type Password Again"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword2(e.target.value);
                    }}
                />
                <Buttons>
                    <StyledButton type="submit">Register</StyledButton>
                </Buttons>
            </Form>
            {error && <Errors>{error}</Errors>}
        </Container>
    );
};

const StyledButton = styled(Button)`
    width: 100px;
`;

export default Register;
