import React, {Suspense} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {LayoutSplashScreen} from "../../../../_metronic/layout";
import {useSelector} from "react-redux";
import {DynamicPageFormLoader} from "./DynamicPageFormLoader";

export function DynamicPage() {
    const {location} = useHistory();

    const menuItems = useSelector(({menu}) => menu);
    const pathSegments = location.pathname.split('/');
    const activeUrl = pathSegments.pop();
    const menuId = activeUrl.split('-').shift();

    if (menuId === '') {
        return <Redirect to='/error/error-v1'/>;
    }

    let activeMenu;

    const findMenuItem = (id, items) => {
        if (activeMenu !== undefined) {
            return;
        }
        for (const menuItem of items) {
            if (menuItem.id === id) {
                activeMenu = menuItem;
            }
            if (menuItem.items.length > 0) {
                findMenuItem(id, menuItem.items);
            }
            if (activeMenu !== undefined) {
                break;
            }
        }
    }

    findMenuItem(parseInt(menuId), menuItems.items);

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <DynamicPageFormLoader menu={activeMenu}/>
        </Suspense>
    );
}