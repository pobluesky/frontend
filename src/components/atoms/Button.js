import React from 'react';

const Button = React.forwardRef(
    (
        {
            btnName,
            onClick,
            onKeyDown,
            width,
            height,
            margin,
            padding,
            backgroundColor,
            textColor,
            fontSize,
            fontWeight,
            fontFamily,
            border,
            borderRadius,
            boxShadow,
            float,
            cursor,
            alignSelf,
            alignItems,
            justifySelf,
            justifyContent,
            display,
            imgSrc,
            imgAlt,
            imgWidth,
            imgHeight,
            imgMargin,
            imgOnClick,
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                onKeyDown={onKeyDown}
                style={{
                    width,
                    height,
                    margin,
                    padding,
                    backgroundColor,
                    color: textColor,
                    fontSize,
                    fontWeight,
                    fontFamily,
                    border,
                    borderRadius,
                    boxShadow,
                    float,
                    cursor: cursor || 'pointer',
                    alignSelf,
                    alignItems,
                    justifySelf,
                    justifyContent,
                    display,
                }}
            >
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt={imgAlt}
                        style={{
                            width: imgWidth,
                            height: imgHeight,
                            margin: imgMargin,
                        }}
                        onClick={imgOnClick}
                    />
                )}
                {btnName}
            </button>
        );
    },
);

export default Button;
