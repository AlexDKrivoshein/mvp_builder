import React, {useState} from "react";
import formatHighlight from "json-format-highlight";
import {Button} from "@material-ui/core";

export function CUnknown({config}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button onClick={() => setShow(!show)} variant='outlined' size='small'>Unknown Component</Button>
            {show && <pre dangerouslySetInnerHTML={{__html: formatHighlight(config)}}/>}
        </>
    )
}