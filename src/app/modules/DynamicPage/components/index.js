import {CGroup} from "./CGroup";
import React from "react";
import {CLookup} from "./CLookup";
import {CInput} from "./CInput";
import {CButton} from "./CButton";
import {CGrid} from "./CGrid";
import {CCheckBox} from "./CCheckBox";
import {CDateTime} from "./CDateTime";
import {CImage} from "./CImage";
import {CTabs} from "./CTabs";
import {CTextArea} from "./CTextArea";
import {CUnknown} from "./CUnknown";

export function drawDynamicComponent(config, context) {
    switch (config.type) {
        case 'GROUP':
            return <CGroup key={config.id} config={config} context={context}/>
        case 'LOOKUP':
            return <CLookup key={config.id} config={config} context={context}/>
        case 'INPUT':
            return <CInput key={config.id} config={config} context={context}/>
        case 'TEXTAREA':
            return <CTextArea key={config.id} config={config} context={context}/>
        case 'BUTTON':
            return <CButton key={config.id} config={config} context={context}/>
        case 'GRID':
            return <CGrid key={config.id} config={config} context={context}/>
        case 'CHECKBOX':
            return <CCheckBox key={config.id} config={config} context={context}/>
        case 'DATETIME':
            return <CDateTime key={config.id} config={config} context={context}/>
        case 'IMAGE':
            return <CImage key={config.id} config={config} context={context}/>
        case 'TABS':
            return <CTabs key={config.id} config={config} context={context}/>
    }
    return <span/>
    return <CUnknown config={config}/>
}