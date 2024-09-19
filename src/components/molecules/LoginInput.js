import React from 'react';
import Input from '../atoms/Input';

const LoginInput = ({
    value,
    onChange,
    onKeyDown,
    type,
    placeholder,
    categoryName,
    needCategory = true,
}) => (
    <Input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type}
        placeholder={placeholder}
        width={'336px'}
        height={'48px'}
        margin={'0 0 24px 0'}
        padding={'0 0 0 20px'}
        border={'solid 1px #c1c1c1'}
        borderRadius={'12px'}
        fontSize={'16px'}
        needCategory={needCategory}
        categoryName={categoryName}
        categoryWidth={'360px'}
        categoryColor={'#03507d'}
        CategoryFontWeight={'600'}
        categoryMargin={'0 auto 12px auto'}
        categoryTextAlign={'left'}
    />
);

export default LoginInput;
