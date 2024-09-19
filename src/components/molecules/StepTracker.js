import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../assets/css/animations.css';
import {
    MailOutline as MailOutlineIcon,
    Inbox as InboxIcon,
    CheckBox as CheckBoxIcon,
    HighQuality as HighQualityIcon,
    Description as DescriptionIcon,
    FactCheck as FactCheckIcon,
    LibraryAddCheck as LibraryAddCheckIcon,
} from '@mui/icons-material';

const commonSteps = [
    { id: 1, label: '문의제출', icon: <MailOutlineIcon /> },
    { id: 2, label: '문의접수', icon: <InboxIcon /> },
    { id: 3, label: '1차검토완료', icon: <CheckBoxIcon /> },
    { id: 4, label: '품질검토요청', icon: <HighQualityIcon /> },
    { id: 5, label: '품질검토접수', icon: <DescriptionIcon /> },
    { id: 6, label: '품질검토완료', icon: <FactCheckIcon /> },
    { id: 7, label: '최종검토완료', icon: <LibraryAddCheckIcon /> }
];

const quoteSteps = [
    { id: 1, label: '문의제출', icon: <MailOutlineIcon /> },
    { id: 2, label: '문의접수', icon: <InboxIcon /> },
    { id: 3, label: '1차검토완료', icon: <CheckBoxIcon /> },
    { id: 4, label: '최종검토완료', icon: <LibraryAddCheckIcon /> }
];

const StepTracker = ({ currentStep, inquiryType }) => {
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        setSteps(inquiryType === '견적 문의'? quoteSteps : commonSteps);
    }, [inquiryType]);

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
                            <Line
                                completed={step.id < currentStep}
                                isLast={index === steps.length - 2}
                            />
                        )}
                    </Step>
                </React.Fragment>
            ))}
        </Container>
    );
};

export default StepTracker;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  margin: 0 30px 0 0;
`;

const Step = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-right: 30px
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => (props.completed ? '#1990ff' : '#cccccc')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 5px;
  transition: background-color 0.3s ease;
  z-index: 1;
`;

const Text = styled.div`
  font-size: 9px;
  color: ${props => (props.completed ? '#1990ff' : '#cccccc')};
  margin-top: 8px;
  margin-left: -2px;
  font-weight: 600;
`;

const Line = styled.div`
  position: absolute;
  top: 30%;
  left: 53%;
  width: 135px;
  height: 2px;
  background-color: ${props => (props.completed ? '#1990ff' : '#cccccc')};
  transform: translateY(-50%);
  z-index: 0;

  ${({ isLast }) => isLast && `
    width: 0;
  `}
`;
