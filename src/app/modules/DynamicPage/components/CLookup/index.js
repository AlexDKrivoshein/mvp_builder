import React, {useContext, useEffect, useState} from "react";
import {Form} from "react-bootstrap"
import TextField from "@material-ui/core/TextField";

export function CLookup({config, context}) {
    const {title, data, id, value, onChange} = config;

    const [v, setValue] = useState(value);
    const formContext = useContext(context);

    useEffect(() => {
        formContext.set(id, v)
    }, [value])

    return (
        <TextField
            id={id}
            select
            label={title || 'Select'}
            value={v || ''}
            onChange={(e) => {
                setValue(e.target.value)
                formContext.set(id, e.target.value)

                if( onChange !== undefined && onChange !== null ) {
                    formContext.submit({onChange})
                }
            }}
            //onChange={handleChange('currency')}
            /*SelectProps={{
                MenuProps: {
                    className: classes.menu,
                },
            }}*/
            SelectProps={{
                native: true,
                /*MenuProps: {
                    className: classes.menu,
                },*/
            }}
            //helperText="Please select your currency"
            margin="normal"
        >
            {data.map(option => (
                <option key={`${title}-${option['id']}`} value={option['id']}>
                    {option['name']}
                </option>
            ))}
        </TextField>
    )
}