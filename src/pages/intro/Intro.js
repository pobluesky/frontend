import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import intro1 from '../../assets/css/icons/intro/temp-intro-1.svg';
import intro2 from '../../assets/css/icons/intro/temp-intro-2.svg';
import intro3 from '../../assets/css/icons/intro/temp-intro-3.svg';
// import { FirstIntro, SecondIntro, ThirdIntro, FourthIntro } from './section';
import { getCookie } from '../../apis/utils/cookies';

function Intro() {
    const navigate = useNavigate();

    const currentUserRole = getCookie('userRole') || '';
    const role = getCookie('userRole');

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
        <>
            {/* <FirstIntro />
            <SecondIntro />
            <ThirdIntro />
            <FourthIntro /> */}
            {currentUserRole === 'customer' ? (
                <div
                    style={{
                        margin: '5vh 0 0 0',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ width: '60%' }} src={intro1} />
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div style={{ margin: '0 2vw 10vh 0' }}>
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
                                    backgroundColor={'#ffffff'}
                                    textColor={'#212121'}
                                />
                            </div>
                            <div style={{ margin: '0 0 10vh 2vw' }}>
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
                                    backgroundColor={'#ffffff'}
                                    textColor={'#212121'}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <img
                            style={{ width: '60%', margin: '10vh 0 0 0' }}
                            src={intro2}
                        />
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <img
                            style={{ width: '60%', margin: '10vh 0 0 0' }}
                            src={intro3}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            margin: '5vh 0 0 0',
                        }}
                    >
                        <div
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <img style={{ width: '60%' }} src={intro1} />
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div style={{ margin: '0 2vw 10vh 0' }}>
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
                                    backgroundColor={'#ffffff'}
                                    textColor={'#212121'}
                                />
                            </div>
                            <div style={{ margin: '0 0 10vh 2vw' }}>
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
                                    backgroundColor={'#ffffff'}
                                    textColor={'#212121'}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Intro;
