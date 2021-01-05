import React, {useEffect, useState} from 'react';
import axios from "../../../utils/axios";
import {PageError, PageLoading} from "../../../widgets/request";
import {Button} from "react-bootstrap";
import * as auth from "../../Auth/_redux/authRedux.js";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';


export function SelectApplication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const loadData = async () => {
        setError(false);
        setLoading(true);
        try {
            const response = await axios.get('get_application_list');
            setData(response);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const selectApplication = async (application) => {
        setLoading(true);
        try {
            await axios.post('set_application', {'application_id': application.id});
            dispatch(auth.actions.requestUser());
            history.push('/page/1-dashboard');
        } catch (e) {
            setError(true);
        } finally {
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
                    <h3>Select Application</h3>
                    {data.map(application => <Button key={application.id} variant="primary" size="lg" block onClick={() => selectApplication(application)}>
                        {application.name} &rarr;
                    </Button>)}
                </div>
            </div>
        </div>}
    </>;
}