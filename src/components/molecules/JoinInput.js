import React from 'react';
import Input from '../atoms/Input';

export const JoinInput = ({
    margin,
    ref,
    value,
    onChange,
    onKeyDown,
    type,
    placeholder,
    categoryName,
    needCategory = true,
    warningMsg,
    needWarningMsg = true,
    readOnly,
}) => (
    <Input
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type}
        placeholder={placeholder}
        width={'336px'}
        height={'48px'}
        margin={margin}
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
        needWarningMsg={needWarningMsg}
        warningMsg={warningMsg}
        spellCheck="false"
        readOnly={readOnly}
    />
);

export default JoinInput;
