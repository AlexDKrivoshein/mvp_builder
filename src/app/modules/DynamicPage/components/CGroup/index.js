import React from "react";
import {drawDynamicComponent} from "../index";
import {CButtonGroup} from "../CButtonGroup";
import Grid from "@material-ui/core/Grid";

export function CGroup({config, context}) {
    const {children, columnSpan} = config;
    const items = (Array.isArray(children) ? children : children['items']) || [];
    const columnWidth = columnSpan || (Array.isArray(children) ? 12 : (children['align'] === 'HORIZONTAL' ? (items.length < 4 ? 12 / items.length : 3) : 12));

    const buttonGroup = items.filter(e => e.type === 'BUTTON').length === items.length;

    if (buttonGroup && items.length > 0) {
        return <CButtonGroup config={config} context={context}/>
    }

    return (
        <Grid container spacing={2}>
            {items.map(itemConfig => <Grid item key={itemConfig['id']} md={columnWidth} xs={12}>
                {drawDynamicComponent(itemConfig, context)}
            </Grid>)}
        </Grid>
    );
}