import React from 'react';

const ListLabel = ({
    text,
    content,
    borderRadius,
    border,
    fontWeight,
    color,
    width,
    height,
    fontSize,
    padding,
    margin,
    backgroundColor,
}) => {
    return (
        <div
            style={{
                borderRadius: borderRadius || '10px 10px 0 0',
                border: border || '1px solid #c1c1c1',
                fontWeight: fontWeight || 'bolder',
                color: color || '#007AFF',
                width: width || 'fit-content',
                height: height || '27px',
                fontSize: fontSize || '17px',
                padding: padding || '7px 9px 0 0',
                margin: margin,
                backgroundColor: backgroundColor || '#ffffff',
            }}
        >
            <span
                style={{
                    fontSize: '17px',
                    fontWeight: 'bolder',
                    color: color || '#616161',
                    margin: '0 0 0 10px',
                }}
            >
                {content}&nbsp;&nbsp;
            </span>
            {text}
        </div>
    );
};

export default ListLabel;
