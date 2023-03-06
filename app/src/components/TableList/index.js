import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function TableList(props) {

    function generateUniqueKey() {
        return Math.random().toString(36).substr(2, 9);
      }

      
    const {entityName, HeaderItems, RowItems} = props;

    return (
        <div className="block">
            {entityName ? 
                (
                <div className="block-header">
                    <h2>{entityName} <span className="table-count">{RowItems.length}</span></h2>
                </div>
                )
                :
                (<></>)
            }
            
            <div id="id_documents_list" className="table-overflow">
                <table className="wa-table list trHoverGray">
                    <thead>
                        <tr>
                            {HeaderItems.map((HeaderItem) => (
                                <th key={generateUniqueKey()} scope="col" style={{ cursor: 'pointer', textAlign: 'center' }}>
                                    {HeaderItem}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {RowItems.map((RowItem) => (
                            <tr key={generateUniqueKey()} style={{ textAlign: 'center' }}>
                            {RowItem.map((RowField) => (
                                <td key={generateUniqueKey()}>
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

