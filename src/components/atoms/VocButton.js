import React from 'react';
import Button from './Button';

export const VocButton = ({
    btnName,
    onClick,
    backgroundColor,
    textColor,
    margin,
}) => (
    <Button
        btnName={btnName}
        onClick={onClick}
        width={'96px'}
        height={'38px'}
        backgroundColor={backgroundColor}
        textColor={textColor}
        fontFamily={'Pretendard-Regular'}
        border={'1px solid #03507d'}
        borderRadius={'4px'}
        margin={margin}
    />
);
