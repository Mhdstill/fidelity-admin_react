import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './modules/Default/NotFoundPage';
import './QRApp.css';

function QRApp(props) {

    const { setter } = props;
    const { operationToken } = useParams();

    //Set operationToken to parent
    useEffect(() => {
        if (operationToken && setter) 
        {
            setter(operationToken)
        }
    }, [operationToken, setter]);


    return (
        <NotFoundPage />
    );
}

export default QRApp;