import React from 'react';
import Button from '../atoms/Button';

const CheckButton = ({ btnName, onClick, onKeyDown, margin }) => (
    <Button
        btnName={btnName}
        onClick={onClick}
        onKeyDown={onKeyDown}
        margin={margin}
        width={'360px'}
        height={'44px'}
        backgroundColor={'#03507d'}
        textColor={'#eeeeee'}
        border={'none'}
        borderRadius={'12px'}
        fontSize={'20px'}
    />
);

const RoleSelectButton = ({ btnName, backgroundColor, textColor, onClick, onKeyDown, margin }) => (
    <Button
        btnName={btnName}
        onClick={onClick}
        onKeyDown={onKeyDown}
        margin={margin}
        width={'144px'}
        height={'44px'}
        backgroundColor={backgroundColor}
        textColor={textColor}
        border={'solid 1px #c1c1c1'}
        borderRadius={'12px'}
        fontSize={'20px'}
    />
);

export { CheckButton, RoleSelectButton };
