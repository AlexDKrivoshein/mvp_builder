import React, {useEffect, useState} from "react";
import axios from "../../../utils/axios";
import {PageError, PageLoading} from "../../../widgets/request";
import {DynamicPageDrawer} from "./DynamicPageDrawer";
import BlockUi from "react-block-ui";
import 'react-block-ui/style.css';
import {GetFormDataContext} from "../context/GetFormDataContext";

export function DynamicPageFormLoader({menu}) {

    const [loading, setLoading] = useState(false);
    const [blocking, setBlocking] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const loadForm = async () => {
        setError(false);
        setLoading(true);
        try {
            const formData = await axios.post('get_form_data', {
                'menu_id': menu.id,
            })

            setData(formData)
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadForm();
    }, [menu]);

    // Action
    const sendAction = async (payload) => {
        setBlocking(true)
        try {
            const formData = await axios.post('get_form_data', {
                'menu_id': menu.id,
                ...payload,
            })

            setData(formData)
        } catch (e) {
            console.log('exception', e)
        } finally {
            setBlocking(false);
        }
    }

    const sendActionModal = async (values) => {
        setBlocking(true)
        try {
            const formData = await axios.post('get_form_data', values)

            setData(formData)
        } catch (e) {
        } finally {
            setBlocking(false);
        }
        console.log('[GetFormDataContext] submitModal', values)
    }


    return (
        <>
            {loading && <PageLoading/>}
            {!loading && error && <PageError onRefresh={loadForm}/>}
            {!loading && !error && data &&
            <GetFormDataContext.Provider value={{
                submit: sendAction,
                submitModal: sendActionModal,
            }}>
                <BlockUi blocking={blocking}>
                    <DynamicPageDrawer formData={data}/>
                </BlockUi>
            </GetFormDataContext.Provider>}
        </>
    )
}