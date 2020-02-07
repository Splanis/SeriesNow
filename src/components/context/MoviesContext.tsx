import React, { useState, createContext } from "react";

interface Movie {

}

export const MoviesContext = createContext();

export const MoviesProvider = (props: any) => {
    
    
    return (
        <MoviesContext.Provider value={}>
            {props.children}
        </MoviesContext.Provider>
    );
};