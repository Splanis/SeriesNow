import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import fire from "../../../firebase/firebase";

const Register = () => {
    const { setUser } = useUser();
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
                .then(u => {
                    setUser({ email: u.user?.email, username: u.user?.displayName, uid: u.user?.uid });
                    setError("");
                    var c_user = fire.auth().currentUser;
                    c_user?.updateProfile({
                        displayName: username
                    });
                    setEmail("");
                    setPassword("");
                })
                .catch(er => {
                    setError(er.code);
                });
        } else {
            setError("auth/passwords-do-not-match");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={Register} style={{ display: "flex", flexDirection: "column" }}>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <label>Password2</label>
                <input
                    type="password"
                    value={password2}
                    onChange={e => {
                        setPassword2(e.target.value);
                    }}
                />
                <button type="submit">Register</button>
                {error ? <p>{error}</p> : ""}
            </form>
        </div>
    );
};

export default Register;
