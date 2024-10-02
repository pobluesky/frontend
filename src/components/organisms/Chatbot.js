import React, { useState, useEffect, useRef } from 'react';
import {
    chatBotIcon,
    chatBox,
    chatBoxOpen,
    chatHeader,
    closeButton,
    chatContent,
    dateHeader,
    messageBoxWrapper,
    messageBox,
    message,
    time,
    faqSection,
    faqBox,
    faqTitle,
    faqPick1,
    faqPick2,
    faqType,
    faqDescription,
    faqArticle,
    chatInput,
    sendButton,
    loadingDotsWrapper,
    loadingDot,
    loadingDot1,
    loadingDot2,
    loadingDot3,
} from '../../assets/css/ChatbotIcon.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import ChatbotIcon from '../../assets/css/icons/ChatbotIcon.png';
import Poseokho from '../../assets/css/icons/Poseokho.png';
import profile from '../../assets/css/icons/profile.svg';
import pobluesky from '../../assets/css/icons/pobluesky.png';
import { postChatbot } from '../../apis/api/chatbot';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { productTypes } from '../../utils/inquiry';

const InquiryQuestionList = ({ title, onQuestionClick, questionsType }) => {
    let questions = [];
    if(questionsType === '주문 문의') {
        questions = [
            '주문 접수는 언제 되나요?',
            '주문 변경 가능한가요?',
            '주문 배송지 변경 가능한가요?',
            '주문 프로세스가 궁금해요.',
            '주문 결과 수신 후 계약 협의는 어떻게 하나요?',
        ];
    } else if (questionsType === '제품 통합 문의') {
        questions = [
            '제품 유형에 따라 라인아이템 내역도 달라지나요?',
            '제품별 라인아이템 등록 파일 형식이 궁금해요. PDF만 가능한가요?',
            '제품 유형이 무엇인가요?',
            '제품 offersheet 내용을 따로 받고 싶은데, 방법이 있을까요?',
        ];
    } else if (questionsType === '등록 문의') {
        questions = [
            'inquiry 등록 방법',
            'inquiry 수정 / 삭제 방법',
        ]
    } else if (questionsType === '사이트 이용 문의') {
        questions = ['전화번호, 비밀번호, 이메일 변경 방법 (마이페이지)'];
    }

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                marginLeft: '47px',
                width: '74%',
                borderRadius: '10px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            colSpan={2}
                            style={{
                                textAlign: 'center',
                                fontWeight: '800',
                                fontSize: '18px',
                            }}>
                            {title}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((question, index) => (
                        <TableRow
                            key={index}
                            hover
                            onClick={() => onQuestionClick(question)}
                            style={{ cursor: 'pointer' }}
                        >
                            <TableCell style={{ fontSize: '16px', color: '#2F2F2F' }}>{question}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const FAQSection = ({ onInquiryClick, onFocusInput, onNewChatClick, onVocClick, onFinishClick, onClose }) => {
    const [inqSection, setInqSection] = useState(false);
    const faqSectionRef = useRef(null);
    const { role } = useAuth();

    useEffect(() => {
        if (inqSection && faqSectionRef.current) {
            faqSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [inqSection]);

    const toggleInqSection = () => {
        setInqSection(true);
    };

    const handleVocClick = () => {
        if (role === 'customer') {
            onClose();
        } else {
            onVocClick();
        }
    };

    return (
        <div>
            <div className={faqSection}>
                <div className={faqArticle}
                     style={{ backgroundColor: '#6187E7' }}>
                    <div className={faqTitle}>자주 묻는 질문</div>
                    <div className={faqDescription}>
                        고객사들이 자주 찾는 질문과<br />
                        답변 리스트를 안내합니다.
                    </div>
                    <div className={faqPick1} onClick={toggleInqSection}>Inquiry 문의
                    </div>
                    <div className={faqPick1} onClick={() => onInquiryClick('사이트 이용 문의')}>사이트 이용 문의
                    </div>
                    <div className={faqPick1} onClick={() => onInquiryClick('기타 문의')}>기타 문의
                    </div>
                </div>
                <div className={faqArticle}
                     style={{ backgroundColor: '#05ADD3' }}>
                    <div className={faqTitle}>직접 질문하기</div>
                    <div className={faqDescription}>
                        궁금한 내용을 하단<br />
                        채팅창에 입력해 주세요.
                    </div>
                    <div
                        className={faqPick2}
                         onClick={() => {
                             onNewChatClick();
                             onFocusInput();
                         }}>새로운 채팅 시작하기</div>
                        {role === 'customer' ? (
                            <Link to={'/voc-form/question'} style={{ textDecoration: 'none'}}>
                                <div className={faqPick2} onClick={handleVocClick}>
                                    VOC로 1:1 문의하기
                                </div>
                            </Link>
                        ) : (
                            <div className={faqPick2} onClick={handleVocClick}>
                                VOC로 1:1 문의하기
                            </div>
                        )}
                    <div className={faqPick2} onClick={() => onFinishClick()}>채팅 종료하기</div>
                </div>
            </div>

            { inqSection ? (
                <>
                    <div className={faqSection} ref={faqSectionRef}>
                        <div className={faqType} onClick={() => onInquiryClick('주문 문의')}>
                            주문 문의
                        </div>
                        <div className={faqType} onClick={() => onInquiryClick('제품 통합 문의')}>
                            제품 통합 문의
                        </div>
                        <div className={faqType} onClick={() => onInquiryClick('등록 문의')}>
                            등록 문의
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

const DefaultSection = ({ onFirstComment, onFinishClick }) => (
    <div className={faqSection}>
        <Link to={'/voc-form/question'} style={{ textDecoration: 'none' }}>
            <div className={faqBox}>
                직접 VOC 문의하기
            </div>
        </Link>
        <div className={faqBox} onClick={onFirstComment}>
            이전으로 돌아가기
        </div>
        <div
            className={faqBox}
            onClick={() => {
                onFinishClick();
            }}>
            채팅 종료하기
        </div>
    </div>
);

const LoginSection = ({ onFirstComment, onClose }) => (
    <div className={faqSection}>
        <Link to={'/login'} style={{ textDecoration: 'none' }}>
            <div className={faqBox} onClick={onClose}>
                로그인 하러가기
            </div>
        </Link>
        <div className={faqBox} onClick={onFirstComment}>
            이전으로 돌아가기
        </div>
    </div>
);

const FinishSection = ({ onFirstComment, onClose, onRemoveMessage }) => (
    <div className={faqSection}>
        <div
            className={faqBox}
             onClick={() => {
                onClose();
                onRemoveMessage()
        }}>
            채팅 종료하기
        </div>
        <div className={faqBox} onClick={onFirstComment}>
            이전으로 돌아가기
        </div>
    </div>
);

const ProductTypeTable = ({ onFirstComment, onFinishClick }) => {
    const [selectedProduct, setSelectedProduct] = useState('CAR');

    const handleProductChange = (productType) => {
        setSelectedProduct(productType);
    };

    const productTypeNames = {
        CAR: '자동차',
        HOT_ROLLED: '열연',
        COLD_ROLLED: '냉연',
        WIRE_ROD: '선재',
        THICK_PLATE: '후판',
    };

    return (
    <div>
        <div style={{ margin: '10px 10px 10px 52px'}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginBottom: '15px',
                    borderRadius: '10px',
                }}>
                    {Object.keys(productTypes).map((productType) => (
                        <Button
                            key={productType}
                            variant={selectedProduct === productType ? 'contained'
                                : 'outlined'}
                            onClick={() => handleProductChange(productType)}
                            sx={{
                                padding: '5px 10px',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                borderRadius: '5px',
                                margin: '3px',
                                backgroundColor: selectedProduct === productType
                                    ? '#6187E7' : '#FFFFFF',
                                color: selectedProduct === productType ? '#FFFFFF'
                                    : '#6187E7',
                                border: selectedProduct === productType
                                    ? '1px solid #6187E7' : '1px solid #C7C7C7',
                                boxShadow: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {productTypeNames[productType]}
                        </Button>
                    ))}
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: '10px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                        overflowX: 'auto',
                        width: '100%',
                    }}
                >
                    <Table sx={{ minWidth: '800px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        textAlign: 'left',
                                        fontWeight: '800',
                                        fontSize: '15px',
                                        whiteSpace: 'nowrap',
                                    }}
                                    colSpan={Object.keys(
                                        productTypes[selectedProduct]).length}
                                >
                                    {productTypeNames[selectedProduct]}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {Object.keys(productTypes[selectedProduct]).map(
                                    (fieldKey, index) => (
                                        <TableCell
                                            key={index}
                                            style={{
                                                fontSize: '13px',
                                                color: '#2F2F2F',
                                                whiteSpace: 'nowrap',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {productTypes[selectedProduct][fieldKey].label}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        <div className={faqSection} style={{ marginTop: '20px' }}>
            <Link to={'/voc-form/question'} style={{ textDecoration: 'none' }}>
                <div className={faqBox}>
                    직접 VOC 문의하기
                </div>
            </Link>
            <div className={faqBox} onClick={onFirstComment}>
                이전으로 돌아가기
            </div>
            <div
                className={faqBox}
                onClick={() => {
                    onFinishClick();
                }}>
                채팅 종료하기
            </div>
        </div>
    </div>
    );
};

const Chatbot = () => {
    const { didLogin } = useAuth();
    const didLoginRef = useRef(didLogin);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedInquiryType, setSelectedInquiryType] = useState(null);
    const chatContentRef = useRef(null);
    const inputRef = useRef(null);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages, selectedInquiryType]);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    text: `
안녕하세요, 고객님.  
Pobluesky입니다.  
무엇이 궁금하신가요?  
궁금하신 내용을 직접 입력해 주시거나,  
아래에서 선택해 주세요.
                    `,
                    type: 'bot',
                    time: getCurrentTime(),
                    component:
                        <FAQSection
                            onInquiryClick={handleInquiryClick}
                            onNewChatClick={handleNewChatClick}
                            ref={chatContentRef}
                            onFocusInput={focusInput}
                            onVocClick={handleVocClick}
                            onFinishClick={handleFinishClick}
                            onClose={handleClose}
                        />
                }
            ]);
        }
    }, [messages.length]);

    const handleFirstComment = () => {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                text: `
안녕하세요, 고객님.  
Pobluesky입니다.  
무엇이 궁금하신가요?  
궁금하신 내용을 직접 입력해 주시거나,  
아래에서 선택해 주세요.
                    `,
                type: 'bot',
                time: getCurrentTime(),
                component:
                    <FAQSection
                        onInquiryClick={handleInquiryClick}
                        onNewChatClick={handleNewChatClick}
                        ref={chatContentRef}
                        onFocusInput={focusInput}
                        onVocClick={handleVocClick}
                        onFinishClick={handleFinishClick}
                        onClose={handleClose}
                    />,
            }
        ]);
    };

    const handleInquiryClick = (inquiryType) => {
        if(didLoginRef.current) {
            setSelectedInquiryType(inquiryType);
            setMessages(prev => [
                ...prev,
                {
                    text: inquiryType === '사이트 이용 문의' ?
                        `**${inquiryType}**의 자주하는 질문을 보여드릴게요.` :
                        inquiryType === '기타 문의' ?
                            `**기타 문의**는 VoC 문의하기를 이용해주세요.` :
                            `Inquiry 문의 중 **${inquiryType}** 관련 자주하는 질문 리스트를 보여드릴게요.`,
                    type: 'bot',
                    time: getCurrentTime(),
                    component: inquiryType === '기타 문의' ? (
                            <DefaultSection
                                onFirstComment={handleFirstComment}
                                ref={chatContentRef}
                                onFinishClick={handleFinishClick}
                            />
                        ) :
                        (
                            <InquiryQuestionList
                                title={inquiryType}
                                questionsType={inquiryType}
                                onQuestionClick={handleQuestionClick}
                                ref={chatContentRef}
                            />
                        ),
                },
            ]);
        } else {
            setMessages(prev => [
                ...prev,
                {
                    text: `로그인 후, 응답을 확인하실 수 있습니다.`,
                    type: 'bot',
                    time: getCurrentTime(),
                    component: (
                        <LoginSection
                            onFirstComment={handleFirstComment}
                            ref={chatContentRef}
                            onClose={handleClose}
                        />
                    )
                },
            ]);
        }
    };

    useEffect(() => {
        didLoginRef.current = didLogin;
    }, [didLogin]);

    const handleNewChatClick = () => {
        if(didLoginRef.current) {
            setMessages(prev => [
                ...prev,
                {
                    text: `아래에서 채팅을 입력해 주세요.`,
                    type: 'bot',
                    time: getCurrentTime(),
                    component: (
                        <DefaultSection
                            onFirstComment={handleFirstComment}
                            ref={chatContentRef}
                            onFinishClick={handleFinishClick}
                        />
                    )
                },
            ]);
        } else {
            setMessages(prev => [
                ...prev,
                {
                    text: `로그인 후, 직접 질문을 입력하실 수 있습니다.`,
                    type: 'bot',
                    time: getCurrentTime(),
                    component: (
                        <LoginSection
                            onFirstComment={handleFirstComment}
                            ref={chatContentRef}
                            onClose={handleClose}
                        />
                    )
                },
            ]);
        }
    };

    const handleVocClick = () => {
            setMessages(prev => [
                ...prev,
                {
                    text: `
VOC로 1:1 문의하실 수 있습니다.
VOC 페이지에서 직접 문의사항을 작성해 주세요.`,
                    type: 'bot',
                    time: getCurrentTime(),
                    component: (
                        <DefaultSection
                            onFirstComment={handleFirstComment}
                            ref={chatContentRef}
                            onFinishClick={handleFinishClick}
                        />
                    )
                },
            ]);
    }

    const handleFinishClick = () => {
        setMessages(prev => [
            ...prev,
            {
                text: `채팅을 종료하시겠습니까?`,
                type: 'bot',
                time: getCurrentTime(),
                component: (
                    <FinishSection
                        onFirstComment={handleFirstComment}
                        ref={chatContentRef}
                        onClose={handleClose}
                        onRemoveMessage={handleRemoveMessage}
                    />
                )
            },
        ]);
    }

    const handleRemoveMessage = () => {
        setMessages([]);
    }

    const handleQuestionClick = async (question) => {
        const isLineItem = question.includes('라인아이템');

        setMessages(prev => [
            ...prev,
            { text: question, type: 'user', time: getCurrentTime() },
        ]);

        setLoading(true);

        try {
            const botResponse = await new Promise((resolve) =>
                setTimeout(async () => {
                    const response = await postChatbot({ message: question });
                    resolve(response.data);
                }, 1500)
            );

            setMessages(prev => [
                ...prev,
                {
                    text: botResponse,
                    type: 'bot',
                    time: getCurrentTime(),
                    component:
                    isLineItem ? (
                        <>
                        <ProductTypeTable
                            onFirstComment={handleFirstComment}
                            ref={chatContentRef}
                            onFinishClick={handleFinishClick} />
                        </>
                    ) : (
                        <DefaultSection
                        onFirstComment={handleFirstComment}
                        ref={chatContentRef}
                        onFinishClick={handleFinishClick}
                        />
                    ),
                },
            ]);
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const messageToSend = inputValue;

        if (!didLoginRef.current) {
            setMessages(prev => [
               ...prev,
                {
                    text: '로그인 후, 직접 질문을 입력하실 수 있습니다.',
                    type: 'bot',
                    time: getCurrentTime(),
                    component: (
                        <LoginSection
                            onFirstComment={handleFirstComment}
                            ref={chatContentRef}
                            onClose={handleClose}
                        />
                    )
                },
            ]);
            return;
        }

        setMessages(prev => [
            ...prev,
            { text: messageToSend, type: 'user', time: getCurrentTime() },
        ]);

        setLoading(true);

        setTimeout(() => {
            setInputValue('');
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }, 100);

        try {
            const botResponse = await new Promise(
                (resolve) => setTimeout(async () => {
                    const response = await postChatbot(
                        { message: messageToSend });
                    resolve(response.data);
                }, 1500));

            const responseComponent = messageToSend.includes('라인아이템') ? (
                <ProductTypeTable
                    onFirstComment={handleFirstComment}
                    ref={chatContentRef}
                    onFinishClick={handleFinishClick}
                />
            ) : (
                <DefaultSection
                    onFirstComment={handleFirstComment}
                    ref={chatContentRef}
                    onFinishClick={handleFinishClick}
                />
            );

            setMessages(prev => [
                ...prev,
                {
                    text: botResponse,
                    type: 'bot',
                    time: getCurrentTime(),
                    component: responseComponent,
                }
            ]);

        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!loading) {
                handleSend();
            }
        }
    };

    const [position, setPosition] = useState({ top: window.innerHeight - 120 });
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (event) => {
        setIsDragging(true);
    };

    const handleDrag = (event) => {
        if (isDragging) {
            const newY = event.clientY - 50;

            if (newY >= 0 && newY <= window.innerHeight - 100) {
                setPosition({ top: newY });
            }
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (position.top > window.innerHeight - 100) {
                setPosition({ top: window.innerHeight - 100 });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position]);

    return (
        <div>
            <div
                draggable="true"
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{
                    position: 'fixed',
                    top: `${position.top}px`,
                    right: '20px',
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    zIndex: 1,
                }}
            >
                <img
                    src={ChatbotIcon}
                    alt="chatbot"
                    style={{ width: '100%', height: '100%' }}
                    onClick={handleToggle}
                />
            </div>
            <div className={`${chatBox} ${isOpen ? chatBoxOpen : ''}`}>
                <div className={chatHeader}>
                    <img src={pobluesky} alt="pobluesky" />
                    <button className={closeButton} onClick={handleClose}>X
                    </button>
                </div>
                <div className={chatContent} ref={chatContentRef}>
                    <div className={dateHeader}>
                        {new Date().toLocaleDateString('ko-KR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}
                    </div>
                    {messages.map((msg, index) => (
                        <div key={index} className={messageBoxWrapper} style={{
                            display: msg.type === 'user' ? 'flex-end'
                                : 'flex-start',
                        }}>
                            <div className={messageBox} style={{
                                flexDirection: msg.type === 'user'
                                    ? 'row-reverse' : 'row',
                            }}>
                                <img src={msg.type === 'user' ? profile
                                    : Poseokho}
                                     alt={msg.type === 'user' ? 'User'
                                         : 'Poseokho'} />
                                <div className={message} style={{
                                    backgroundColor: msg.type === 'user'
                                        ? '#FFEE96' : '#FFFFFF',
                                    marginLeft: msg.type === 'user' ? 0 : '6px',
                                    marginRight: msg.type === 'bot' ? 0 : '6px',
                                }}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                                <div className={time}
                                     style={{
                                         textAlign: msg.type === 'user'
                                             ? 'right'
                                             : 'left',
                                         position: 'relative',
                                         marginTop: 'auto',
                                         marginLeft: msg.type === 'user' ? 0
                                             : '6px',
                                         marginRight: msg.type === 'bot' ? 0
                                             : '6px',
                                         bottom: '2px',
                                         right: msg.type === 'user' ? 0
                                             : 'auto',
                                         left: msg.type === 'user' ? 'auto' : 0,
                                     }}>
                                    {msg.time}
                                </div>
                            </div>
                            {msg.component && <div>{msg.component}</div>}
                        </div>
                    ))}

                    {loading && (
                        <div className={messageBox}>
                            <img src={Poseokho} alt="Poseokho" />
                            <div className={loadingDotsWrapper}>
                                <div
                                    className={`${loadingDot} ${loadingDot1}`}></div>
                                <div
                                    className={`${loadingDot} ${loadingDot2}`}></div>
                                <div
                                    className={`${loadingDot} ${loadingDot3}`}></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={chatInput}>
                    <input
                        type="text"
                        value={inputValue}
                        placeholder={'질문을 입력해 주세요.'}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                    />
                    <button
                        className={sendButton}
                        onClick={handleSend}
                        disabled={loading}
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
