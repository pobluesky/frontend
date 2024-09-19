import React from 'react';

function Tag({
    category,
    width,
    height,
    margin,
    backgroundColor,
    textColor,
    border,
    borderRadius,
    justifySelf,
    alignSelf,
    fontWeight,
}) {
    return (
        <div
            style={{
                width: `${width}`,
                height: `${height}`,
                margin: `${margin}`,
                backgroundColor: `${backgroundColor}`,
                color: `${textColor}`,
                border: `${border}`,
                borderRadius: `${borderRadius}`,
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: `${justifySelf}`,
                alignSelf: `${alignSelf}`,
                fontWeight: `${fontWeight}`,
            }}
        >
            {category}
        </div>
    );
}

export default Tag;
