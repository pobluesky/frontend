import React from 'react';
import {
    GraphContainer,
    BarContainer,
    Bar,
    Value,
    Arrow,
    Label,
} from './GraphStyle';

const formatNumber = (number) => {
    let num = parseFloat(number);
    num = num - 200;
    return num + 'h';
};

const Graph = ({
    lastMonth,
    thisMonth,
    barColor,
    textColor,
    arrow,
    decrease,
}) => {
    let formattedLastMonth = lastMonth;
    let formattedThisMonth = thisMonth;

    if (decrease) {
        formattedLastMonth = formatNumber(lastMonth);
        formattedThisMonth = formatNumber(thisMonth);
    }

    return (
        <GraphContainer>
            <BarContainer>
                <Bar height={lastMonth} $backgroundColor={barColor}>
                    <Value fontSize={'45px'} opacity={'50%'} color={textColor}>
                        {formattedLastMonth}
                    </Value>
                </Bar>
                <Label color={'#919191'}>지난달</Label>
            </BarContainer>
            <Arrow src={arrow} alt={arrow} />
            <BarContainer>
                <Bar height={thisMonth} $backgroundColor={barColor}>
                    <Value fontSize={'45px'} color={textColor}>
                        {formattedThisMonth}
                    </Value>
                </Bar>
                <Label color={'#49454F'} fontWeight={'800'}>
                    이번달
                </Label>
            </BarContainer>
        </GraphContainer>
    );
};

export default Graph;
