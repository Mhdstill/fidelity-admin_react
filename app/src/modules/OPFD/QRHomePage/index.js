import React from 'react';
import withQRAuth from '../../../hoc/withQRAuth';

function QRHomePage() {
    return (
        <>
            <p>QR Home Page</p>
        </>
    );
}

export default withQRAuth(QRHomePage);