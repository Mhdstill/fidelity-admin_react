import React from 'react';
import { API_URL } from '../../utils/api';

function ImgServer(props) {
    const { path, height = 'auto', width = 'auto', className = '' } = props;

    return (
        <img src={`${API_URL}/assets/img/${path}`} className={className} style={{ height: height, width: width }} />
    )
}

export default ImgServer;