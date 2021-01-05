import React, {useEffect, useState} from 'react';
import axios from "../../../utils/axios";
import {PageError, PageLoading} from "../../../widgets/request";
import {Button} from "react-bootstrap";
import * as auth from "../../Auth/_redux/authRedux.js";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';


export function SelectDealer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const dispatch = useDispatch();

    const history = useHistory();

    const loadData = async () => {
        setError(false);
        setLoading(true);
        try {
            const response = await axios.get('get_dealer_list');
            setData(response);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const selectDealer = async (dealer) => {
        setLoading(true);
        try {
            await axios.post('set_dealer', {'dealer_id': dealer.id});
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
                    <h3>Select Dealer</h3>
                    {data.map(dealer => <Button key={dealer.id} variant="primary" size="lg" block onClick={() => selectDealer(dealer)}>
                        {dealer.full_name} &rarr;
                    </Button>)}
                </div>
            </div>
        </div>}
    </>;
}