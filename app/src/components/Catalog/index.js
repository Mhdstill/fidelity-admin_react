import React from 'react';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Catalog(props) {

    const { isActive = false } = props;
    const { title } = props;
    const { image } = props;
    console.log(isActive);
    return (
        <>
            {isActive ?
                (
                    <div className='row'>
                        <div className='col-1  d-flex align-items-center justify-content-center'>
                            <FontAwesomeIcon icon={faCaretRight} className='catalog-fa' />
                        </div>
                        <div className='col-10'>
                            <div className='catalog active'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='catalog-title'>{title} </div>
                                    </div>
                                    <div className='col-6'>
                                        {image ?
                                            (
                                                <div className='catalog-img'
                                                    style={{
                                                        background: 'url(' + image + ')',
                                                        backgroundSize: '100% 100%'
                                                    }} ></div>
                                            ) :
                                            (<></>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className='row'>
                        <div className='col-10'>
                            <div className='catalog'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='catalog-title'>{title} </div>
                                    </div>
                                    <div className='col-6'>
                                        {image ?
                                            (
                                                <div className='catalog-img'
                                                    style={{
                                                        background: 'url(' + image + ')',
                                                        backgroundSize: '100% 100%'
                                                    }} ></div>
                                            ) :
                                            (<></>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}

export default Catalog;