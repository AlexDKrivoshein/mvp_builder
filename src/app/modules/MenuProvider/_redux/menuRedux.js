import {createAction, createReducer} from "@reduxjs/toolkit";

export const actionTypes = {
    Set: "[Set Menu] Action",
}

const setAction = createAction(actionTypes.Set);

export const actions = {
    //set: (menu) => ({type: actionTypes.Set, payload: menu}),
    set: (menu) => setAction(menu),
}

export const reducer = createReducer(null, builder => {
    builder.addCase(setAction, (state, action) => action.payload);
})