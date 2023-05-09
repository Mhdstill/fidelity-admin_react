import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClipboardList, faEuroSign, faCheck } from '@fortawesome/free-solid-svg-icons';
import Card from '../../../components/Card';
import History from '../../../components/History';
import CarouselMultiple from '../../../components/CarouselMultiple';
import TableList from '../../../components/TableList';

function UserHomePage() {

    const carouselItems = [
        { 'image': 'test.png', 'name': 'Onyxia' },
        { 'image': 'test.png', 'name': 'Pitaya' },
        { 'image': 'test.png', 'name': 'Ludo Trotter' },
        { 'image': 'test.png', 'name': 'Caféria' },
        { 'image': 'test.png', 'name': 'Neoness' },
    ]

    const TableHeaderItems = ['Boutique', 'Points total cumulés', 'Points dépensés', 'Points actuels'];
    const RowItems = [
        ['Onyxia', '180', <div style={{ color: "red", fontWeight: 'bold' }}>30</div>, <div style={{ color: "green", fontWeight: 'bold' }}>150</div>],
        ['Pitaya', '180', <div style={{ color: "red", fontWeight: 'bold' }}>30</div>, <div style={{ color: "green", fontWeight: 'bold' }}>150</div>],
        ['Ludo Trotter', '180', <div style={{ color: "red", fontWeight: 'bold' }}>30</div>, <div style={{ color: "green", fontWeight: 'bold' }}>150</div>],
        ['Neoness', '180', <div style={{ color: "red", fontWeight: 'bold' }}>30</div>, <div style={{ color: "green", fontWeight: 'bold' }}>150</div>],
        ['Neoness', '180', <div style={{ color: "red", fontWeight: 'bold' }}>30</div>, <div style={{ color: "green", fontWeight: 'bold' }}>150</div>],
    ]

    return (
        <>
            <div className='home'>
                <h1>Dashboard</h1>
                <div className='row'>
                    <div className='col-md-8 mt-3'>
                        <h3>Boutiques Partenaires</h3>
                        <CarouselMultiple items={carouselItems} imgHeight='10rem' />
                        <div className='text-center'>
                            <button className='btn btn-primary btn-lg'>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <h3>Mes points de fidélité</h3>
                        <TableList HeaderItems={TableHeaderItems} RowItems={RowItems} />
                        <div className='text-center'>
                            <button className='btn btn-primary btn-lg'>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <Card icon={faEuroSign} title={"Mes économies"} >
                            <div className='text-center'>
                                <p className='hard-text'>22.49€</p>
                                <p style={{ color: 'gray', fontWeight: 'bold' }} >Sur un total de 172 commandes</p>
                            </div>
                        </Card>
                        <Card icon={faClipboardList} title={"Mes commandes"} >
                            <History title={"Onyxia"} subTitle={"Le 23/02/2023"} color={"red"} icon={faCheck} value={"-5.50€"} />
                            <History title={"Onyxia -5%"} subTitle={"Le 23/02/2023"} color={"green"} icon={faCheck} value={"+1€"} />
                            <History title={"Grec"} subTitle={"Le 23/02/2023"} color={"red"} icon={faCheck} value={"-5.00€"} />
                            <History title={"Grec"} subTitle={"Le 23/02/2023"} color={"red"} icon={faCheck} value={"-5.00€"} />
                            <div className='text-center'>
                                <button className='btn btn-primary btn-lg'>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserHomePage;
