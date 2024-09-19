import React from 'react';
import {
    LineItemGetRow,
    LineItemGetInput,
    LineItemGetGrid
} from '../../assets/css/Form.css';

const getAllColumns = (data) => {
    const columnsSet = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => columnsSet.add(key));
    });
    // response 에서 inquiryId, isActivated, lineItemId를 제외
    return Array.from(columnsSet).filter(column => !['inquiryId', 'isActivated', 'lineItemId'].includes(column));
};

const GetLineItem = ({ lineItems }) => {

    const columns = getAllColumns(lineItems);

    return (
        <div className={LineItemGetGrid}>
                {lineItems.map((item, rowIndex) => (
                    <div key={rowIndex} className={LineItemGetRow}>
                        {columns.map((column) => (
                            <input value={item[column]} className={LineItemGetInput} />
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default GetLineItem;