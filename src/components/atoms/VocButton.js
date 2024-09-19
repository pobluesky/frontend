import React from 'react';
import Button from './Button';

const FilterButton = ({
    btnName,
    width,
    margin,
    backgroundColor,
    textColor,
    onClick,
}) => (
    <Button
        btnName={btnName}
        width={width}
        height={'28px'}
        margin={margin}
        backgroundColor={backgroundColor}
        textColor={textColor}
        border={'solid 1px #c1c1c1'}
        borderRadius={'20px'}
        onClick={onClick}
    />
);

const QuestionAnswerButton = ({ btnName, onClick, backgroundColor, textColor }) => (
    <Button
        btnName={btnName}
        onClick={onClick}
        width={'96px'}
        height={'38px'}
        backgroundColor={backgroundColor}
        textColor={textColor}
        border={'1px solid #1748ac'}
    />
);

const ColReqResButton = ({ btnName, onClick, margin }) => (
    <Button
        btnName={btnName}
        onClick={onClick}
        width={'96px'}
        height={'32px'}
        margin={margin}
        backgroundColor={'#2f4f79'}
        textColor={'#ffffff'}
        border={'none'}
        borderRadius={'10px'}
        float={'right'}
    />
);

export {
    FilterButton,
    QuestionAnswerButton,
    ColReqResButton,
};
