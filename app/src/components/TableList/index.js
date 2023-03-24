import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function TableList(props) {
  const { entityName, HeaderItems, RowItems } = props;

  return (
    <div className="block">
      {/* 
      {entityName ? (
        <div className="block-header">
          <h2>
            {entityName} <span className="table-count">{RowItems.length}</span>
          </h2>
        </div>
      ) : (
        <></>
      )} */}

      <div className="table-responsive-xl table-list">
        <table className="table bg-white main-shadow">
          <thead>
            <tr>
              {HeaderItems.map((HeaderItem) => (
                <th
                  key={uuidv4()}
                  scope="col"
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                  {HeaderItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RowItems.map((RowItem) => (
              <tr key={uuidv4()} style={{ textAlign: 'center' }}>
                {RowItem.map((RowField) => (
                  <td key={uuidv4()}>{RowField}</td>
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
