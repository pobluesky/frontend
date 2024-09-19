import React from 'react';

function Label({
    label,
    width,
    height,
    backgroundColor,
    textColor,
    border,
    borderRadius,
}) {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor,
                color: textColor,
                border,
                borderRadius,
                textAlign: 'center',
                alignContent: 'center',
            }}
        >
            {label}
        </div>
    );
}

export default Label;
