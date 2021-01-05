import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PageError, PageLoading} from "../../../widgets/request";
import axios from "../../../utils/axios";
import * as languageRedux from "../_redux/languagesRedux";

export function LanguagesProvider({children}) {
    const languages = useSelector(({languages}) => languages);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('get_languages');
            dispatch(languageRedux.actions.set(response));
        } catch (e) {
            console.log(e);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (languages !== null) {
        return children;
    }

    return (
        <>
            {loading && <PageLoading/>}
            {!loading && error && <PageError onRefresh={loadData}/>}
        </>
    )
}