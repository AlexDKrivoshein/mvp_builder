import React from "react";

export const FormContext = React.createContext(
    null,
)

export function createFormContext(config) {
    return React.createContext(config)
}