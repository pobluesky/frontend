import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import TextEditor from '../atoms/TextEditor';
import { QuestionAnswerButton } from '../atoms/VocButton';
import { useAuth } from '../../hooks/useAuth';
import {
    WrongQuestionTitleAlert,
    WrongQuestionContentAlert,
    InquiryIdisNullAlert,
    QuestionCompleteAlert,
} from '../../utils/actions';
import {
    validateQuestionTitle,
    validateQuestionContents,
} from '../../utils/validation';
import {
    postQuestionByUserIdAboutInquiry,
    postQuestionByUserId,
} from '../../apis/api/question';
import { Question_Input } from '../../assets/css/Voc.css';

function QuestionInput({ selectedType, inquiryId }) {
    const { userId } = useAuth();
    const navigate = useNavigate();

    const [editorValue, setEditorValue] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');

    const fileInputRef = useRef(null);

    const status = 'READY';

    const [showTitleAlert, canShowTitleAlert] = useState(false);
    const [showContentAlert, canShowContentAlert] = useState(false);
    const [showInquiryIdAlert, canShowInquiryIdAlert] = useState(false);
    const [showSuccessAlert, canShowSuccessAlert] = useState(false);

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
                    canShowInquiryIdAlert(true);
                    return;
                }
                // 문의 관련 질문인 경우
                const result = await postQuestionByUserIdAboutInquiry(
                    file,
                    questionData,
                    userId,
                    inquiryId,
                );
                if (result) {
                    canShowSuccessAlert(true);
                    setTimeout(() => {
                        navigate('/voc-list/question');
                    }, '2000');
                }
            } else {
                // 문의와 무관한 질문인 경우
                const result = await postQuestionByUserId(
                    file,
                    questionData,
                    userId,
                );
                if (result) {
                    canShowSuccessAlert(true);
                    setTimeout(() => {
                        navigate('/voc-list/question');
                    }, '2000');
                }
            }
        } catch (error) {
            console.error('질문 등록 실패: ', error);
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
            canShowTitleAlert(true);
            return;
        } else if (validateQuestionContents(editorValue)) {
            canShowContentAlert(true);
            return;
        } else {
            fetchPostQuestionByUserId();
        }
    };

    return (
        <>
            <div className={Question_Input}>
                {/* 제목 + 첨부파일 그룹 */}
                <div>
                    {/* 질문 제목 */}
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
                    {/* 질문 제목 길이 */}
                    <div>{title.length}</div>
                    <div>/30</div>
                    {/* 파일 업로드 버튼 */}
                    <div>
                        <Input
                            type="file"
                            display={'none'}
                            ref={fileInputRef}
                            onChange={attachFile}
                        />
                        {file ? (
                            <QuestionAnswerButton
                                btnName={'파일 삭제'}
                                backgroundColor={'#ffffff'}
                                textColor={'#1748ac'}
                                onClick={() => setFile(null)}
                            />
                        ) : (
                            <QuestionAnswerButton
                                btnName={'파일 업로드'}
                                backgroundColor={'#ffffff'}
                                textColor={'#1748ac'}
                                onClick={() => fileInputRef.current.click()}
                            />
                        )}
                    </div>
                    <div>
                        {file
                            ? `첨부파일: ${file.name}`
                            : '파일을 첨부할 수 있습니다.'}
                    </div>
                </div>
                {/* 질문 입력 */}
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
                    <QuestionAnswerButton
                        btnName={'질문 등록'}
                        backgroundColor={'#1748ac'}
                        textColor={'#ffffff'}
                        onClick={() => {
                            completedQuestion();
                        }}
                    />
                </div>
            </div>
            <WrongQuestionTitleAlert
                showAlert={showTitleAlert}
                onClose={() => {
                    canShowTitleAlert(false);
                }}
                inert
            />
            <WrongQuestionContentAlert
                showAlert={showContentAlert}
                onClose={() => {
                    canShowContentAlert(false);
                }}
                inert
            />
            <InquiryIdisNullAlert
                showAlert={showInquiryIdAlert}
                onClose={() => {
                    canShowInquiryIdAlert(false);
                }}
                inert
            />
            <QuestionCompleteAlert
                showAlert={showSuccessAlert}
                onClose={() => {
                    canShowSuccessAlert(false);
                }}
                inert
            />
        </>
    );
}

export default QuestionInput;
