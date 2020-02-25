import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";
import fire from "../../firebase/firebase";

interface Props {
    children: ReactNode;
}

export interface IUser {
    email?: string | null;
    username?: string | null;
    uid?: string | null;
    watchlist: string[];
    profilePhoto?: string;
}

interface UserProviderProps {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserProviderProps>({} as UserProviderProps);

export const UserProvider = ({ children }: Props): JSX.Element => {
    const localState = localStorage.getItem("user");
    const [user, setUser] = useState<IUser | null>(localState ? JSON.parse(localState) : null);

    const providerValues: UserProviderProps = {
        user,
        setUser
    };

    useEffect(() => {
        if (!user) {
            fire.auth().onAuthStateChanged(User => {
                if (User) {
                    setUser({ email: User.email, username: User.displayName, uid: User.uid, watchlist: [] });
                } else {
                    setUser(null);
                }
            });
        }
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return <UserContext.Provider value={providerValues}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
