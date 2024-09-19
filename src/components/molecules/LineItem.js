import React from 'react';
import {
    LineItemRow,
    LineItemInput,
    _checkbox,
} from '../../assets/css/Form.css';

const LineItem = ({ id, lineItems, onRowSelect, onChange, isChecked }) => {

    const handleInputChange = (index, value) => {
        onChange(id, index, value);
    };

    return (
        <div className={LineItemRow}>
            {isChecked && (
                <div>
                    <input
                        type="checkbox"
                        className={_checkbox}
                        onChange={() => onRowSelect(id)}
                    />
                </div>
            )}
            {lineItems.map((item, index) => (
                <input
                    key={index}
                    type="text"
                    className={LineItemInput}
                    value={item}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                />
            ))}
        </div>
    );
};

export default LineItem;
