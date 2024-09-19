import React from 'react';
import intro from '../../../assets/css/icons/intro/intro-icon.svg';
import Button from '../../../components/atoms/Button';
import { Container, SubTitle, Title, Wrapper, Icon } from './Style';
import { ScrollStyle } from './ScrollStyle';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../apis/utils/cookies';
// import useScrollAnimation from "../../../hooks/UseScrollAnimation";

const FirstIntro = () => {
    const navigate = useNavigate();

    const role = getCookie('userRole')?.toLowerCase();

    // useScrollAnimation();

    const checkInqLogin = () => {
        if (role) {
            navigate(`/inq-list/${role}`);
        } else {
            navigate('/login');
        }
    };

    const checkVocLogin = () => {
        if (role) {
            navigate('/voc-list/question');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className={ScrollStyle}>
            <Container style={{ margin: '10vh' }}>
                <SubTitle>고객 맞춤형 AI 기반 분석 솔루션</SubTitle>
                <Title>고객사와 함께하는 VoC</Title>

                <Wrapper>
                    <Icon
                        src={intro}
                        alt="intro-icon"
                        width={'50%'}
                        $zindex={'-1'}
                        $margin={'-6vh'}
                    />
                </Wrapper>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ margin: '0 2vw 0 0' }}>
                        <Button
                            onClick={() => {
                                checkInqLogin();
                            }}
                            btnName={'Inquiry 시작하기'}
                            width={'280px'}
                            height={'60px'}
                            $margin={'-10vh 3vh 12vh 0'}
                            fontWeight={'bolder'}
                            fontSize={'26px'}
                            border={'1px solid #c1c1c1'}
                            borderRadius={'20px'}
                            textColor={'#3A70C2'}
                        />
                    </div>
                    <div style={{ margin: '0 0 0 2vw' }}>
                        <Button
                            onClick={() => {
                                checkVocLogin();
                            }}
                            btnName={'VoC 시작하기'}
                            width={'280px'}
                            height={'60px'}
                            $margin={'-10vh 0 12vh 0'}
                            fontWeight={'bolder'}
                            fontSize={'26px'}
                            border={'1px solid #c1c1c1'}
                            borderRadius={'20px'}
                            textColor={'#00B0FF'}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FirstIntro;
