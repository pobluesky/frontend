import React from 'react';
import {
    Container,
    Title,
    Text,
    Wrapper,
    Icon,
    Arrow,
    Step,
    StepWrapper,
} from './Style';
import {
    step1,
    step2,
    step3,
    step4,
    arrow,
} from '../../../assets/css/icons/intro';
// import useScrollAnimation from "../../../hooks/UseScrollAnimation";
import { ScrollStyle } from './ScrollStyle';

const SecondIntro = () => {
    // useScrollAnimation();

    return (
        <div className={ScrollStyle}>
            <Container style={{ margin: '20vh' }}>
                <Title>AI로 빠른 문의 등록과</Title>
                <Title>상담 내용을 한 눈에 확인하세요</Title>

                <Text color={'#49454F'} fontSize={'24px'} $margin={'2vh 0 0 0'}>
                    고객사에게 최고의 제품을 제공함과 동시에
                </Text>
                <Text
                    color={'#49454F'}
                    fontSize={'24px'}
                    $margin={'1.5vh 0 0 0'}
                >
                    불만 사항과 요청 사항을 빠르게 반영하여 고객 경험을
                    혁신합니다.
                </Text>

                <Wrapper $margin={'10vh 0 0 0'} $gap={'20px'}>
                    <Icon
                        src={step1}
                        alt={step2}
                        width={'17%'}
                        $margin={'-4vh 0 0 0'}
                    />
                    <Icon
                        src={step2}
                        alt={step2}
                        width={'17%'}
                        $margin={'-4vh 0 0 0'}
                    />
                    <Icon
                        src={step3}
                        alt={step2}
                        width={'17%'}
                        $margin={'-4vh 0 0 0'}
                    />
                    <Icon
                        src={step4}
                        alt={step2}
                        width={'17%'}
                        $margin={'-4vh 0 0 4vh'}
                    />
                </Wrapper>

                <Wrapper $gap={'230px'}>
                    <Arrow src={arrow} />
                    <Arrow src={arrow} />
                    <Arrow src={arrow} />
                </Wrapper>

                <Wrapper $gap={'180px'} $margin={'0 0 0 5vh'}>
                    <StepWrapper>
                        <Step>Step1</Step>
                        <Text
                            color={'#49454F'}
                            fontSize={'24px'}
                            $margin={'5vh 0 0 0'}
                        >
                            흩어진 VOC
                            <br />
                            데이터
                        </Text>
                    </StepWrapper>
                    <StepWrapper>
                        <Step>Step2</Step>
                        <Text
                            color={'#007AFF'}
                            fontSize={'24px'}
                            $margin={'5vh 0 0 -0.5vh'}
                            fontWeight={'800'}
                        >
                            AI로 자동
                            <br />
                            분석 및 요약
                        </Text>
                    </StepWrapper>
                    <StepWrapper>
                        <Step>Step3</Step>
                        <Text
                            color={'#007AFF'}
                            fontSize={'24px'}
                            $margin={'5vh 0 0 -2.5vh'}
                            fontWeight={'800'}
                        >
                            VOC 데이터 기반
                            <br />
                            제품 전망 분석
                        </Text>
                    </StepWrapper>
                    <StepWrapper>
                        <Step>Step4</Step>
                        <Text
                            color={'#49454F'}
                            fontSize={'24px'}
                            $margin={'5vh 0 0 -3.5vh'}
                        >
                            고객사 맞춤형 제품
                            <br />
                            거래 체결
                        </Text>
                    </StepWrapper>
                </Wrapper>
            </Container>
        </div>
    );
};

export default SecondIntro;
