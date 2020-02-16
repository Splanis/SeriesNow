import React from "react";
import { useUser } from "../../context/UserContext";

const Profile: React.FC = () => {
    const { user } = useUser();

    return (
        <div>
            <h1>{user?.username}</h1>
        </div>
    );
};

export default Profile;
