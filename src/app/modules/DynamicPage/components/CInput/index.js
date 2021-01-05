import React, {useContext, useEffect, useState} from "react";
import {Form} from "react-bootstrap"
import TextField from "@material-ui/core/TextField";

export function CInput({config, context}) {
    const {title, id, value} = config;

    const [v, setValue] = useState(value);
    const formContext = useContext(context);

    useEffect(() => {
        formContext.set(id, v)
    }, [value])

    return (
        <TextField
            id={id}
            label={title}
            defaultValue={v}
            margin="normal"
            onChange={(e) => {
                setValue(e.target.value)
                formContext.set(id, e.target.value)
            }}
        />
    )
}