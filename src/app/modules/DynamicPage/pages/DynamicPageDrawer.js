import React from "react";
import {Card, CardBody, CardHeader} from "../../../../_metronic/_partials/controls";
import {FormDrawer} from "./FormDrawer";

export function DynamicPageDrawer({formData}) {
    const blankContext = React.createContext(null);

    switch (formData['type']) {
        case 'FORM':
            return <FormDrawer config={formData} context={blankContext}/>
        default:
            break;
    }
    return (
        <Card>
            <CardHeader title="Dynamic Page"/>
            <CardBody>
                Menu item is: {JSON.stringify(formData)}
            </CardBody>
        </Card>
    )
}