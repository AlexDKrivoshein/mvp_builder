import {createAction, createReducer} from "@reduxjs/toolkit";

export const actionTypes = {
    Set: "[Set Languages] Action",
}

const setAction = createAction(actionTypes.Set);

export const actions = {
    //set: (menu) => ({type: actionTypes.Set, payload: menu}),
    set: (languages) => setAction(languages),
}

export const reducer = createReducer(null, builder => {
    builder.addCase(setAction, (state, action) => action.payload);
})