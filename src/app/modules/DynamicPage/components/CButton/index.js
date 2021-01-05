import React, {useContext} from "react";
import {Button as MButton} from '@material-ui/core'

export function CButton({config, context, values = {}}) {
    const {hint, text, action} = config;

    const formContext = useContext(context);

    return (
        <MButton variant="contained" className='mr-4' color="secondary" title={hint} onClick={(e) => {
            if (action !== undefined && action !== null) {
                formContext.submit({action, values})
            }
        }}>
            {text}
        </MButton>
    )
}