import React, {useEffect, useState} from 'react';
import axios from "../../../utils/axios";
import {PageError, PageLoading} from "../../../widgets/request";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import * as auth from "../../Auth/_redux/authRedux.js";
import * as languages from "../../LanguagesProvider/_redux/languagesRedux";


export function SelectLanguage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const dispatch = useDispatch();

    const loadData = async () => {
        setError(false);
        setLoading(true);
        try {
            const response = await axios.get('get_languages');
            dispatch(languages.actions.set(response))
            setData(response);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const selectLanguage = async (language) => {
        setLoading(true);
        try {
            await axios.post('set_language', {'language_id': language.id});
            dispatch(auth.actions.requestUser());
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return <>
        {loading && <PageLoading/>}
        {!loading && error && <PageError onRefresh={loadData}/>}
        {!loading && data && <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h3>Select Language</h3>
                    {data.map(language => <Button key={language.id} variant="primary" size="lg" block
                                                  onClick={() => selectLanguage(language)}>
                        {language.name} &rarr;
                    </Button>)}
                </div>
            </div>
        </div>}
    </>;
}