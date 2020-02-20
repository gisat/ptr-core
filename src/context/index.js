import React from "react";

let contexts = {};

let createContext = (key, initialValue) => {
    contexts[key] = React.createContext(initialValue);
    return contexts[key];
};

let getContext = (key, initialValue) => contexts[key] || createContext(key, initialValue);

export default {
    getContext
};

