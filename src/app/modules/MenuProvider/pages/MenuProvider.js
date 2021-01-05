import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PageError, PageLoading} from "../../../widgets/request";
import axios from "../../../utils/axios";
import * as menuRedux from "../_redux/menuRedux";

export function MenuProvider({children}) {
    const menu = useSelector(({menu}) => menu);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('get_full_menu');
            dispatch(menuRedux.actions.set(response));
        } catch (e) {
            console.log(e);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (menu !== null) {
        return children;
    }

    return (
        <>
            {loading && <PageLoading/>}
            {!loading && error && <PageError onRefresh={loadData}/>}
        </>
    )
}