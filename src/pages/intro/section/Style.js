import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
`;

export const SubTitle = styled.div`
    color: #03507d;
    font-size: 30px;
    font-weight: bold;
`;

export const Title = styled.div`
    color: #03507d;
    font-size: 65px;
    margin: ${(props) => props.$margin || '0.5vh 0 0 0'};
    font-weight: 800;
`;

export const Text = styled.div`
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize};
    margin: ${(props) => props.$margin};
    font-weight: ${(props) => props.fontWeight};
    text-align: ${(props) => props.$textAlign};
    line-height: ${(props) => props.$lineHeight};
`;

export const Wrapper = styled.div`
    margin: ${(props) => props.$margin};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.$gap};
`;

export const Icon = styled.img`
    width: ${(props) => props.width};
    margin: ${(props) => props.$margin};
    z-index: ${(props) => props.$zindex};
`;

export const Arrow = styled.img`
    margin: ${(props) => props.$margin};
    z-index: 10;
    width: 60px;
`;

export const Step = styled.div`
    background-color: #def6ff;
    color: #3a70c2;
    width: 90px;
    border-radius: 20px;
    font-size: 24px;
    padding: 10px;
`;

export const StepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const AIBox = styled.div`
    border-radius: 30px;
    box-shadow: 0px -5px 50px 1px rgba(0, 0, 0, 0.1);
    width: 900px;
    height: 520px;
    margin: 7vh 0 0 0;
`;

export const MiddleAIBox = styled.div`
    border-radius: 30px 30px 15px 15px;
    background-color: #e4eaf0;
    width: 780px;
    height: 335px;
    margin: 0 auto;
    display: flex;
`;

export const SmallAIBox = styled.div`
    border-radius: 20px;
    background-color: #ffffff;
    width: 300px;
    height: 177px;
    margin: 6vh 0 0 5vh;
`;

export const CustomerWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const HighLighter = styled.span`
    background-color: ${(props) => props.$backgroundColor};
    padding: ${(props) => props.$padding};
    border-radius: ${(props) => props.$borderRadius};
    opacity: 90%;
`;

export const DataBox = styled.div`
    width: 400px;
    height: 315px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.15);
    margin: 10vh 2.5vh 0 2.5vh;
`;

export const DataIcon = styled.div`
    background-color: ${(props) => props.$backgroundColor};
    border-radius: 20px;
    color: #ffffff;
    width: 84px;
    padding: 0.5vh;
    font-weight: 800;
    font-size: 22px;
    margin: 1vh 0 0 2.5vh;
`;

export const IntroBox = styled.div`
    width: 400px;
    height: 220px;
    border-radius: 20px;
    border: 1px solid #c1c1c1;
    margin: 10vh 2.5vh 0 2.5vh;
`;

export const IntroIcon = styled.img`
    width: 30px;
    margin: 3vh 0 0 3vh;
`;
