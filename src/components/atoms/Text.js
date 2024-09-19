import React from 'react';

function Text({
    name,
    onClick,
    width,
    height,
    margin,
    padding,
    backgroundColor,
    textColor,
    fontSize,
    fontWeight,
    border,
    borderRadius,
    float,
    alignSelf,
    justifySelf,
    cursor,
}) {
    return (
        <div
            onClick={onClick}
            style={{
                width,
                height,
                margin,
                backgroundColor,
                color: textColor,
                fontSize,
                fontWeight,
                border,
                borderRadius,
                float,
                cursor: cursor || 'default',
                alignSelf,
                alignSelf,
                justifySelf,
                padding,
            }}
        >
            {name}
        </div>
    );
}

export default Text;
