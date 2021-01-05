/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {useEffect} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {shallowEqual, useSelector, useStore} from "react-redux";
import {Layout} from "../_metronic/layout";
import BasePage from "./BasePage";
import {Logout, AuthPage} from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

import {SelectSettingsTemplate} from "./modules/SelectSettings";

import * as auth from "./modules/Auth/_redux/authRedux";
import {PageLoading} from "./widgets/request";
import {MenuProvider} from "./modules/MenuProvider";
import {LanguagesProvider} from "./modules/LanguagesProvider";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

export function Routes() {
    const {isAuthorized, dealerSelected, languageSelected, userLoaded, serviceWorker, applicationSelected} = useSelector(
        ({auth, serviceWorker}) => ({
            isAuthorized: auth?.session_key !== undefined,
            userLoaded: auth?.user_name !== undefined,
            dealerSelected: auth?.dealer_id !== undefined && auth?.dealer_id !== null,
            languageSelected: auth?.language !== undefined && auth?.language !== null,
            applicationSelected: auth?.application_id !== undefined && auth?.application_id !== null,
            serviceWorker,
        }),
        shallowEqual
    );

    const store = useStore();

    useEffect(() => {
        if (isAuthorized) {
            store.dispatch(auth.actions.requestUser());
        }
    }, [isAuthorized])

    return (
        <>
            <Switch>
                {!isAuthorized ? (
                    /*Render auth page when user at `/auth` and not authorized.*/
                    <Route>
                        <AuthPage/>
                    </Route>
                ) : (
                    /*Otherwise redirect to root page (`/`)*/
                    <Redirect from="/auth" to="/"/>
                )}

                <Route path="/error" component={ErrorsPage}/>
                <Route path="/logout" component={Logout}/>


                {!isAuthorized ? (
                    /*Redirect to `/auth` when user is not authorized*/
                    <Redirect to="/auth/login"/>
                ) : <>

                    {!userLoaded ? <PageLoading/> : <>

                        {(!languageSelected || !dealerSelected || !applicationSelected) &&
                        <Route>
                            <SelectSettingsTemplate/>
                            {!languageSelected && <Redirect to="/settings/language"/>}
                            {languageSelected && !dealerSelected && <Redirect to="/settings/dealer"/>}
                            {languageSelected && dealerSelected && !applicationSelected && <Redirect to="/settings/application"/>}
                        </Route>}

                        {dealerSelected && languageSelected && applicationSelected && (
                            <LanguagesProvider>
                                <MenuProvider>
                                    <Layout>
                                        <BasePage/>
                                    </Layout>
                                </MenuProvider>
                            </LanguagesProvider>
                        )}
                    </>}
                </>}
            </Switch>
            {serviceWorker?.updated ? <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open
            ><SnackbarContent
                style={{background: '#22313f'}}
                message={
                    'Admin UI update installed. Refresh to apply.'
                }
                action={<Button color="secondary" variant='contained' size="small" onClick={() => window.location.reload()}>
                    Refresh
                </Button>}
            /></Snackbar> : <div/>}
        </>
    );
}
