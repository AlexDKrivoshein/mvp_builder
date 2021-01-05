import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import {drawDynamicComponent} from "../index";

export function CTabs({config: {children, value}, context}) {
    return (
        <Tabs
            id="uncontrolled-tab-example"
            //activeKey={value}
            defaultActiveKey={value}
        >
            {children.map(child => <Tab
                eventKey={child.id}
                title={child.caption || 'Tab'}

            >{drawDynamicComponent(child, context)}</Tab>)}
        </Tabs>
    )
}