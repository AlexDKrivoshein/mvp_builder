import React, {useContext, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

/*
{
  "id": "filter_bdate",
  "type": "DATETIME",
  "title":  "From",
  "value": "2020-10-06",
  "fields": [
    "DATE",
    "TIME"
  ]
}
 */

export function CDateTime({config: {id, title, value, onChange}, context}) {

    const [v, setValue] = useState(value);
    const formContext = useContext(context);

    useEffect(() => {
        formContext.set(id, v)
    }, [value])

    return (
        <>
            {/*<pre dangerouslySetInnerHTML={{__html: formatHighlight(config)}}/>*/}

            <TextField
                id="datetime-local"
                label={(typeof title === 'object' ? title.text : title)}
                type='datetime-local'
                value={moment(v).format('YYYY-MM-DDTHH:mm:ss')}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                onChange={(e) => {
                    const newValue = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                    setValue(e.target.value)
                    formContext.set(id, newValue)

                    if (onChange !== undefined && onChange !== null) {
                        formContext.submit({onChange})
                    }
                }}
            />
        </>)
}