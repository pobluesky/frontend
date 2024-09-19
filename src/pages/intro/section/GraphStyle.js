import styled from 'styled-components';

export const GraphContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
    padding: 10px;
`;

export const BarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Bar = styled.div`
    width: 70px;
    height: ${(props) => props.height - 180}px;
    background-color: ${(props) => props.$backgroundColor};
    opacity: 50%;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

export const Value = styled.span`
    position: absolute;
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    opacity: ${(props) => props.opacity};
`;

export const Label = styled.span`
    margin-top: 10px;
    font-size: 17px;
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.color};
`;

export const Arrow = styled.img`
    margin-bottom: 50px;
`;
