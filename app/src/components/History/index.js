import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

function History({ title, subTitle, icon, color, value }) {
    return (
        <div className="history-block">
            <div className='row'>
                <div className='col-2 d-flex align-items-center justify-content-center'>
                    <FontAwesomeIcon icon={icon} className='w-100 success-order' />
                </div>
                <div className='col-10'>
                    <span className='history-block-title'>{title}</span>
                    <span className='history-block-value' style={{ color: color }}>  {value} </span>
                    <p className='m-0 history-block-date'> {subTitle} </p>
                </div>
            </div>
        </div>
    );
};

export default History;