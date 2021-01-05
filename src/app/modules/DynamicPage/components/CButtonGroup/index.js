import React, {useContext} from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";

export function CButtonGroup({config, context}) {
    const {children} = config;
    const items = (Array.isArray(children) ? children : children['items']) || [];

    const formContext = useContext(context);

    return (
        <Grid container className='mt-5'>
            <Grid item>
                <ButtonGroup
                    color="secondary"
                    size="large"
                >
                    {items.map(itemConfig => {
                        const {hint, text, id, action} = itemConfig;

                        return <Button title={hint} variant='contained' key={id} onClick={(e) => {
                            if( action !== undefined && action !== null ) {
                                formContext.submit({action})
                            }
                        }}>{text}</Button>
                    })}
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}