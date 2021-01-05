import React, {useContext, useEffect, useState} from "react";
import {Form} from 'react-bootstrap';
import {FormGroup, Checkbox, FormControlLabel} from "@material-ui/core";

/*
{
  "id": "show_non_confirmed",
  "type": "CHECKBOX",
  "title": "Show deleted",
  "value": false,
  "titleProps": {
    "width": "100px",
    "hAlign": "Center"
  }
}
 */

export function CCheckBox({config: {title, value, id}, context}) {
    const formContext = useContext(context);
    const [v, setValue] = useState(value);

    useEffect(() => {
        formContext.set(id, v)
    }, [value])

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox checked={v} /*onChange={handleChange('checkedA')}*/ onChange={(e) => {
                        const newValue = !v;
                        setValue(newValue)
                        formContext.set(id, newValue)
                    }} value={id}/>
                }
                label={title}
            />
        </FormGroup>
    )
}