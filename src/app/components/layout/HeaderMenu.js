/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink} from "react-router-dom";
import {checkIsActive} from "../../../_metronic/_helpers";
import {useSelector} from "react-redux";

export function HeaderMenu({layoutProps}) {
    const menuItems = useSelector(({menu}) => menu);
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    const slugify = (text) => text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');

    const renderMenuItem = (menuItem, prefix = null) => {
        const hasSubMenu = menuItem.items !== undefined && menuItem.items.length !== 0;

        const slug = (prefix !== null ? prefix + '/' : '') + [menuItem.id, slugify(menuItem.title)].join('-');
        const url = '/page/' + slug;

        return <li
            key={menuItem.num + menuItem.title}
            aria-haspopup={hasSubMenu}
            data-menu-toggle={hasSubMenu ? layoutProps.menuDesktopToggle : undefined}
            className={`menu-item menu-item-rel ${getMenuItemActive(url)} ${hasSubMenu ? 'menu-item-submenu' : ''}`}>
            <NavLink className={`menu-link ${hasSubMenu ? 'menu-toggle' : ''}`} to={url} data-submenu={hasSubMenu}>
                <span className="menu-text">{menuItem.title}</span>
                {(hasSubMenu || layoutProps.rootArrowEnabled) && (<i className="menu-arrow"/>)}
            </NavLink>
            {hasSubMenu &&
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                <ul className="menu-subnav">
                    {menuItem.items.map((item) => renderMenuItem(item, slug))}
                </ul>
            </div>}
        </li>
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {menuItems.items.map((menuItem) => renderMenuItem(menuItem))}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}
