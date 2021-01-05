import React, {useContext} from "react";
import {FormDrawer} from "./FormDrawer";
import {CardBody} from "../../../../_metronic/_partials/controls";

export function ModalDrawer({config, context, inner, parentFormId}) {
    const formContext = useContext(context);

    const {modal, id} = config;

    let values = {}

    const submit = async (action, modal) => {
        console.log('submit', id, inner, action, modal);
        if (inner === true)
            formContext.submit({action}, {modal, formId: parentFormId});
        else
            formContext.submit({action}, modal);
    }

    const thisModalContext = React.createContext(null);

    return (
        <thisModalContext.Provider value={{
            set: (param, value) => {
                values[param] = value
            },
            submit,
        }}>
            <FormDrawer config={config} context={thisModalContext} isModal={true}/>

            {modal !== undefined && modal !== null &&
            <ModalDrawer config={modal} context={thisModalContext} inner={true} parentFormId={id}/>}
        </thisModalContext.Provider>
    )
}