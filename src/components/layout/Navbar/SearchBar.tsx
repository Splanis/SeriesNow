import React, { useEffect } from "react";
import { Input } from "../../sharedStyles/Form";
import { useShows } from "../../context/ShowContext";

const SearchBar = () => {
    const { query, setQuery, setPage } = useShows();
    useEffect(() => {
        setPage(1);
    }, [query, setPage]);

    return (
        <form>
            <Input
                type="text"
                value={query}
                placeholder="Search..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setQuery(e.target.value);
                }}
            />
        </form>
    );
};

export default SearchBar;
