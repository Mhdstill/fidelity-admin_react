import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-bg">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h1>oops!</h1>
                    <h2>Error 404 : Page Non Trouvé</h2>
                    <a
                        onClick={(event) => {
                            event.preventDefault();
                            navigate(-1);
                        }}
                    >Retour</a>
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;