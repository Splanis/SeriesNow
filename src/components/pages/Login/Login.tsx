import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import fire from "../../../firebase/firebase";

const Login = () => {
    const { setUser } = useUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const onLogin = (e: any) => {
        e.preventDefault();
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(u => {
                setUser({ email: u.user?.email, username: u.user?.displayName, uid: u.user?.uid });
                setError("");
            })
            .catch(er => {
                setError(er.code);
            });

        setEmail("");
        setPassword("");
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onLogin} style={{ display: "flex", flexDirection: "column" }}>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />{" "}
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <button type="submit">Login</button>
                {error ? <p>{error}</p> : ""}
            </form>
        </div>
    );
};

export default Login;
