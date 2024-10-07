import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import TextEditor from '../atoms/TextEditor';
import { VocButton } from '../atoms/VocButton';
import { useAuth } from '../../hooks/useAuth';
import { SuccessAlert, WarningAlert } from '../../utils/actions';
import { validateQuestionTitle, validateLength } from '../../utils/validation';
import {
    postQuestionByUserIdAboutInquiry,
    postQuestionByUserId,
    putQuestionByUserIdAboutInquiry,
    putQuestionByUserId,
} from '../../apis/api/question';
import { Question_Input } from '../../assets/css/Voc.css';

function QuestionInput({ selectedType, inquiryId, questionDetail }) {
    const navigate = useNavigate();

    const { userId } = useAuth();

    const [editorValue, setEditorValue] = useState(
        questionDetail?.contents || '',
    );

    const [title, setTitle] = useState(questionDetail?.title || '');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState(questionDetail?.fileName || '');
    const filePath = questionDetail?.filePath || '';
    const [isFileDeleted, setFileDeleted] = useState(false);

    const fileInputRef = useRef(null);

    const status = 'READY';

    const [showSuccessAlert, canShowSuccessAlert] = useState(false);
    const [showWarningAlert, canShowWarningAlert] = useState(false);
    const [message, setMessage] = useState('');

    // 질문 등록
    const fetchPostQuestionByUserId = async () => {
        try {
            const questionData = {
                title,
                contents: editorValue,
                type: selectedType,
                status,
            };
            if (selectedType === 'INQ') {
                if (!inquiryId) {
                    setMessage('Inquiry 번호를 선택하세요.');
                    canShowWarningAlert(true);
                    return;
                }
                // 문의 관련 질문인 경우
                const response = await postQuestionByUserIdAboutInquiry(
                    file,
                    questionData,
                    userId,
                    inquiryId,
                );
                setMessage('질문이 등록되었습니다.');
                canShowSuccessAlert(true);
                setTimeout(() => {
                    navigate(`/voc-form/answer/${response.data.questionId}`);
                }, '2000');
            } else {
                // 문의와 무관한 질문인 경우
                const response = await postQuestionByUserId(
                    file,
                    questionData,
                    userId,
                );
                setMessage('질문이 등록되었습니다.');
                canShowSuccessAlert(true);
                setTimeout(() => {
                    navigate(`/voc-form/answer/${response.data.questionId}`);
                }, '2000');
            }
        } catch (error) {
            console.error('질문 등록 실패: ', error);
        }
    };

    // 질문 수정
    const fetchPutQuestionByUserId = async () => {
        try {
            const questionData = {
                title,
                contents: editorValue,
                type: selectedType,
                status,
                isFileDeleted,
            };
            if (selectedType === 'INQ') {
                if (!inquiryId) {
                    setMessage('Inquiry 번호를 선택하세요.');
                    canShowWarningAlert(true);
                    return;
                }
                // 문의 관련 질문인 경우
                await putQuestionByUserIdAboutInquiry(
                    file,
                    questionData,
                    userId,
                    inquiryId,
                    questionDetail?.questionId,
                );
                setMessage('질문이 수정되었습니다.');
                canShowSuccessAlert(true);
                setTimeout(() => {
                    navigate(`/voc-form/answer/${questionDetail?.questionId}`, {
                        state: {
                            questionId: questionDetail?.questionId,
                        },
                    });
                }, '1000');
            } else {
                // 문의와 무관한 질문인 경우
                await putQuestionByUserId(
                    file,
                    questionData,
                    userId,
                    questionDetail?.questionId,
                );
                setMessage('질문이 수정되었습니다.');
                canShowSuccessAlert(true);
                setTimeout(() => {
                    navigate(`/voc-form/answer/${questionDetail?.questionId}`, {
                        state: {
                            questionId: questionDetail?.questionId,
                        },
                    });
                }, '1000');
            }
        } catch (error) {
            console.error('질문 수정 실패: ', error);
        }
    };

    const titleChange = (e) => {
        const inputTitle = e.target.value;

        if (inputTitle.length <= 30) {
            setTitle(inputTitle);
        }
    };

    const attachFile = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const completedQuestion = () => {
        if (validateQuestionTitle(title)) {
            setMessage('제목은 1자 이상 입력하세요.');
            return canShowWarningAlert(true);
        } else if (validateLength(editorValue)) {
            setMessage('질문을 10자 이상 입력하세요.');
            return canShowWarningAlert(true);
        } else {
            if (questionDetail) {
                fetchPutQuestionByUserId();
            } else {
                fetchPostQuestionByUserId();
            }
        }
    };

    return (
        <>
            <div className={Question_Input}>
                <div>
                    <Input
                        value={title}
                        onChange={titleChange}
                        width={'924px'}
                        height={'36px'}
                        margin={'0 auto 0 auto'}
                        padding={'0px 12px 0px 12px'}
                        border={'1px solid #8b8b8b'}
                        placeholder={'제목을 입력하세요. (30자)'}
                    />
                    <div>{title.length}</div>
                    <div>/30</div>
                    <div>
                        <Input
                            type="file"
                            display={'none'}
                            ref={fileInputRef}
                            onChange={attachFile}
                        />
                        {file || fileName ? (
                            <VocButton
                                btnName={'파일 삭제'}
                                backgroundColor={'#ffffff'}
                                textColor={'#03507d'}
                                onClick={() => {
                                    setFile(null);
                                    setFileName(null);
                                    setFileDeleted(true);
                                }}
                            />
                        ) : (
                            <VocButton
                                btnName={'파일 업로드'}
                                backgroundColor={'#ffffff'}
                                textColor={'#03507d'}
                                onClick={() => {
                                    fileInputRef.current.click();
                                    setFileDeleted(false);
                                }}
                            />
                        )}
                    </div>
                    <div>
                        {fileName ? (
                            <>
                                <a href={filePath}>{fileName}</a>
                            </>
                        ) : file ? (
                            file.name
                        ) : (
                            '파일을 첨부할 수 있습니다.'
                        )}
                    </div>
                </div>
                <TextEditor
                    placeholder={'질문을 입력하세요.'}
                    width={'1320px'}
                    inputHeight={'240px'}
                    inputMaxHeight={'240px'}
                    padding={'0px'}
                    value={editorValue}
                    border={'1px solid #8b8b8b'}
                    onChange={setEditorValue}
                />
                <div>
                    <VocButton
                        btnName={'질문 등록'}
                        backgroundColor={'#03507d'}
                        textColor={'#ffffff'}
                        onClick={() => {
                            completedQuestion();
                        }}
                    />
                </div>
            </div>
            <SuccessAlert
                showAlert={showSuccessAlert}
                onClose={() => {
                    canShowSuccessAlert(false);
                }}
                message={message}
                inert
            />
            <WarningAlert
                showAlert={showWarningAlert}
                onClose={() => {
                    canShowWarningAlert(false);
                }}
                message={message}
                inert
            />
        </>
    );
}

export default QuestionInput;
