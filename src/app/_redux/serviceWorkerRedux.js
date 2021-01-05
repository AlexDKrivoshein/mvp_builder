import {createAction, createReducer} from "@reduxjs/toolkit";

export const actionTypes = {
    Updated: "[Service Worker Updated] Action",
}

const updateAction = createAction(actionTypes.Updated);

export const actions = {
    updated: () => updateAction(),
}

export const reducer = createReducer(null, builder => {
    builder.addCase(updateAction, (state, action) => ({
        updated: true,
    }));
})