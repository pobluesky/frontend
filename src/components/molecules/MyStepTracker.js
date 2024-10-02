import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // 둥글둥글한 아이콘 추가
import { quoteSteps, commonSteps } from './StepTracker';

const MyStepTracker = ({ currentStep, inquiryType }) => {
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        setSteps(inquiryType === '견적 문의' ? quoteSteps : commonSteps);
    }, [inquiryType]);

    const iconSize = 50;
    const progressColor = '#628db7';

    return (
        <Container>
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <Step>
                        <div>
                            <Circle completed={step.id <= currentStep}>{step.icon}</Circle>
                            <Text completed={step.id <= currentStep}>{step.label}</Text>
                        </div>
                        {index < steps.length - 1 && (
                            <ArrowWrapper inquiryType={inquiryType}>
                                <ArrowForwardIosIcon
                                    style={{
                                        fontSize: iconSize - 15,
                                        color: steps[index].id < currentStep ? '#1a90ff' : '#cccccc',
                                    }}
                                />
                            </ArrowWrapper>
                        )}
                    </Step>
                </React.Fragment>
            ))}
        </Container>
    );
};

export default MyStepTracker;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 2vh;
  margin: 1vh 3vw 1vh 0;
`;

const Step = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-right: 3vw;
`;

const Circle = styled.div`
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 50%;
  background-color: ${props => (props.completed ? '#1a90ff' : '#cccccc')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0.5vh;
  transition: background-color 0.3s ease;
`;

const Text = styled.div`
  font-size: 1.6vh;
  color: ${props => (props.completed ? '#1a90ff' : '#cccccc')};
  margin: 0.8vh 0 0 -0.35vw;
  font-weight: 600;
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15%;
  left: ${(props) => (props.inquiryType === '품질+견적 문의' ? '75%' : '85%')};
`;
