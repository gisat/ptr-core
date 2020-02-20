import React from "react";

const Context = () => {

    let contexts = {};

    let createContext = key => React.createContext();
    let getContext = key => contexts[key] || createContext(key);

    return {

    }
};

export default Context();

