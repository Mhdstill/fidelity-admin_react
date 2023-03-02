import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function TableList(props) {

    const {entityName, HeaderItems, RowItems} = props;

    return (
        <div class="block">
            {entityName ? 
                (
                <div class="block-header">
                    <h2>{entityName} <span class="table-count">{RowItems.length}</span></h2>
                </div>
                )
                :
                (<></>)
            }
            
            <div id="id_documents_list" class="table-overflow">
                <table class="wa-table list trHoverGray">
                    <thead>
                        <tr>
                            {HeaderItems.map((HeaderItem) => (
                                <th scope="col" style={{ cursor: 'pointer', textAlign: 'center' }}>
                                    {HeaderItem}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {RowItems.map((RowItem) => (
                            <tr style={{ textAlign: 'center' }}>
                            {RowItem.map((RowField) => (
                                <td>
                                    {RowField}
                                </td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableList;

