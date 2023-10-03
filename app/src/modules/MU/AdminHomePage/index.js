import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';
import { faEye, faDownload, faBuilding, faQrcode } from '@fortawesome/free-solid-svg-icons';
import "react-multi-carousel/lib/styles.css";
import { callAPI, API_URL } from '../../../utils/api';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '../../../components/Card';
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import InputColor from '../../../components/InputColor';

function AdminHomePage() {
    const { id } = useParams();
    const { authToken, operationToken } = useContext(AuthContext);
    const [coefficient, setCoefficient] = useState(1);
    const [colorCode, setColorCode] = useState("#f1f1f1");
    const [previewFilePath, setPreviewFilePath] = useState(null);
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, SetTiktok] = useState('');
    const [name, setName] = useState('');

    const iframeUrl = `/${operationToken}/app`;
    const perPage = 1;
    const items = [];

    const carouselResponsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    const qrCodeSize = 256; // Taille du QR Code
    const qrCodeValue = iframeUrl; // Données à encoder dans le QR Code

    const handleDownloadQRCode = () => {
        const qrCodeContainer = document.getElementById('qrcode');

        if (qrCodeContainer) {
            html2canvas(qrCodeContainer).then(canvas => {
                const pngUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = pngUrl;
                link.download = 'qrcode.png'; // Nom du fichier de téléchargement
                link.click();
            });
        }
    };

    useEffect(() => {
        async function fetchOperation() {
            try {
                const response = await callAPI(`/api/operations/${operationToken}`, 'GET');
                const data = await response.json();
                setCoefficient(data.coefficient);
                setColorCode(data.colorCode);
                setName(data.name);
                setTwitter(data.twitter);
                setFacebook(data.facebook);
                setInstagram(data.instagram);
                SetTiktok(data.tiktok);
                if ('logo' in data && data.logo) {
                    setPreviewFilePath(`${API_URL}/assets/img/${data.logo.filePath}`);
                }
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOperation();
    }, [id, authToken]);

    return (
        <div className="home w-100">

            <div className="title-header mb-3 d-flex align-items-center justify-content-between">
                <h1 style={{ display: 'inline-block' }}>Accueil</h1>
            </div>

            <div className='row mb-2'>
                <div className='col-md-8'>
                    <Card icon={faBuilding} title={"Mon Entreprise"} >
                        <div className="row">
                            <div className="col-4">
                                <img src={previewFilePath} alt="Preview" style={{ maxHeight: '200px', maxWidth: 'auto' }} />
                            </div>

                            <div className="col-8">
                                <span> <b>Nom: </b> {name} </span> <br/>
                                <span> <b>Code couleur: </b> <InputColor value={colorCode} divClass={"d-inline"} /> </span> <br/>
                                <span> <b>TikTok: </b> {tiktok} </span> <br/>
                                <span> <b>Facebook: </b> {facebook} </span> <br/>
                                <span> <b>Instagram: </b> {instagram} </span> <br/>
                                <span> <b>Twitter: </b> {twitter} </span> <br/>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='col-md-4 d-flex align-items-center justify-content-center'>
                    <Card icon={faQrcode} title={"Mon QRCode"} >
                        <div className='text-center' id="qrcode">
                            <QRCode
                                style={{ height: "auto", maxWidth: "100%", width: "150" }}
                                size={qrCodeSize}
                                value={qrCodeValue}
                                viewBox={`0 0 ${qrCodeSize} ${qrCodeSize}`}
                            />
                        </div>
                        <div className='text-center mt-2'>
                            <Button buttonLabel={"Télécharger"} buttonIcon={faDownload} onClickEvent={handleDownloadQRCode} />
                        </div>
                    </Card>
                </div>
            </div>


            <div>
                <iframe className='main-radius card' style={{ height: '350px' }} src={iframeUrl} height="350" width="100%" title="Iframe Example"></iframe>
                <div className='text-center mt-2'>
                    <Button buttonLabel={"Accéder au menu"} buttonIcon={faEye} redirectTo={iframeUrl} />
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;