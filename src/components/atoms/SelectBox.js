import React, { useState } from 'react';

function SelectBox({
    options,
    defaultValue,
    onChange,
    width,
    height,
    padding,
    fontSize,
    color,
    border,
    margin,
    borderRadius,
}) {
    const [selectedValue, setSelectedValue] = useState(defaultValue || '');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            style={{
                width: width || '130px',
                height: height || '30px',
                padding: padding,
                fontSize: fontSize || '16px',
                color: color || '#c1c1c1',
                border: border || '1px solid #c1c1c1',
                backgroundColor: 'white',
                cursor: 'pointer',
                margin: margin || '0 0 0 25px',
                textAlign: 'center',
                borderRadius: borderRadius || '7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectBox;
