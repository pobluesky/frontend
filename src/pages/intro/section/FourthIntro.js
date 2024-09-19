import React from 'react';
import { Container, Text, Title, Wrapper, DataBox, DataIcon } from './Style';
import { increaseArrow, decreaseArrow } from '../../../assets/css/icons/intro';
import Graph from './Graph';
// import useScrollAnimation from "../../../hooks/UseScrollAnimation";

const FourthIntro = () => {
    // useScrollAnimation();

    return (
        <div>
            <Container style={{ margin: '20vh' }}>
                <Title>내가 찾는 제품이 어떤 유형으로</Title>
                <Title>자주 문의되는지 찾아보세요</Title>

                <Text color={'#49454F'} fontSize={'24px'} $margin={'3.5vh 0 0 0'}>
                    제품 유형별 데이터를 한 눈에 볼 수 있어요
                </Text>

                <Wrapper>
                    <DataBox>
                        <Text
                            $textAlign={'left'}
                            $margin={'3vh 0 0 3vh'}
                            fontSize={'24px'}
                            fontWeight={'800'}
                            color={'#49454F'}
                            $lineHeight={'40px'}
                        >
                            후판(육상플랜트) 문의 응대 수가
                            <br />
                            <span style={{ color: '#0B9DDE' }}>
                                59건 증가했어요
                            </span>
                        </Text>
                        <DataIcon $backgroundColor={'#0B9DDE'}>+146%</DataIcon>
                        <Graph
                            lastMonth={'236'}
                            thisMonth={'295'}
                            barColor={'#0B9DDE'}
                            textColor={'#000000'}
                            arrow={increaseArrow}
                        />
                    </DataBox>
                    <DataBox>
                        <Text
                            $textAlign={'left'}
                            $margin={'3vh 0 0 3vh'}
                            fontSize={'24px'}
                            fontWeight={'800'}
                            color={'#49454F'}
                            $lineHeight={'40px'}
                        >
                            제품 1차 검토 응대 시간이
                            <br />
                            <span style={{ color: '#20AC70' }}>
                                2시간 감소했어요
                            </span>
                        </Text>
                        <DataIcon $backgroundColor={'#20AC70'}>-146%</DataIcon>
                        <Graph
                            lastMonth={'295'}
                            thisMonth={'236'}
                            barColor={'#56E1A5'}
                            textColor={'#000000'}
                            arrow={decreaseArrow}
                            decrease={true}
                        />
                    </DataBox>
                </Wrapper>
            </Container>
        </div>
    );
};

export default FourthIntro;
