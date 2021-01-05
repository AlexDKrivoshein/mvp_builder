import React from "react";
import {Button} from "@material-ui/core";

export function PageError({onRefresh}) {
    return (
        <div className="text-center py-10">
            <p>Error while loading data</p>
            <Button variant={"outlined"} color={"primary"} onClick={onRefresh}>
                Refresh&nbsp;&nbsp;
                <span className="fas fa-sync"/>
            </Button>
        </div>
    )
}

export function PageLoading() {
    return (<div className="text-center py-10"><span className="ml-3 spinner"/></div>);
}