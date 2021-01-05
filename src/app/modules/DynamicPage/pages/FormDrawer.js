import React, {useContext} from "react";
import {Card, CardBody, CardHeader} from "../../../../_metronic/_partials/controls";
import {drawDynamicComponent} from "../components";
import {ModalDrawer} from "./ModalDrawer";
import {GetFormDataContext} from "../context/GetFormDataContext";
import {CButton} from "../components/CButton";
import {Modal} from "react-bootstrap";

export function FormDrawer({config, context, isModal}) {
    const {modal, okButton, cancelButton, caption} = config;

    const getFormDataContext = useContext(GetFormDataContext);

    const parentContext = useContext(context)

    // FormContext values
    let values = {}

    const submit = async ({action, values: additionalValues = {}}, modal) => {
        console.log('[FormDrawer] submit', parentContext, additionalValues);
        if (parentContext === null) {
            /*if (modal)
                getFormDataContext.submitModal(modal)
            else*/
            getFormDataContext.submit({
                action: modal !== undefined ? undefined : action,
                modal,
                values: {
                    ...values,
                    ...additionalValues,
                },
                formId: config.id,
            })
        } else {
            parentContext.submit(action, {
                action,
                values: {
                    ...values,
                    ...additionalValues,
                },
                formId: config.id,
            })
        }
    }

    const thisFormContext = React.createContext(null);

    if (isModal) {
        return (
            <thisFormContext.Provider value={{
                set: (param, value) => {
                    values[param] = value
                },
                values,
                submit,
            }}>
                {/*<Dialog open={true} onClose={() => {
                }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{caption || 'Dialog'}</DialogTitle>
                    <DialogContent>
                        {config.children !== undefined && config.children.map(childConfig => drawDynamicComponent(childConfig, thisFormContext))}

                        {modal !== undefined && modal !== null &&
                        <ModalDrawer config={modal} context={thisFormContext}/>}
                    </DialogContent>
                    {(okButton !== undefined || cancelButton !== undefined) && <DialogActions>
                        {cancelButton !== undefined && <CButton config={cancelButton} context={thisFormContext}/>}
                        {okButton !== undefined && <CButton config={okButton} context={thisFormContext}/>}
                    </DialogActions>}
                </Dialog>*/}
                <Modal
                    size="lg"
                    show={true}
                    onHide={() => {

                    }}
                    aria-labelledby="custom-dialog"
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {caption || 'Dialog'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {config.children !== undefined && config.children.map(childConfig => drawDynamicComponent(childConfig, thisFormContext))}

                        {modal !== undefined && modal !== null &&
                        <ModalDrawer config={modal} context={thisFormContext}/>}
                    </Modal.Body>
                    <Modal.Footer>
                        {(okButton !== undefined || cancelButton !== undefined) && <>
                            {cancelButton !== undefined && <CButton config={cancelButton} context={thisFormContext}/>}
                            {okButton !== undefined && <CButton config={okButton} context={thisFormContext}/>}
                        </>}
                    </Modal.Footer>
                </Modal>
            </thisFormContext.Provider>
        )
    }

    return (
        <thisFormContext.Provider value={{
            set: (param, value) => {
                values[param] = value
            },
            values,
            submit,
        }}>
            <Card>
                <CardHeader title={config['caption']}/>
                <CardBody>
                    {config.children !== undefined && config.children.map(childConfig => drawDynamicComponent(childConfig, thisFormContext))}

                    {modal !== undefined && modal !== null && <ModalDrawer config={modal} context={thisFormContext}/>}
                </CardBody>
            </Card>
        </thisFormContext.Provider>
    );
}