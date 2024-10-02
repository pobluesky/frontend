import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dompurify from 'dompurify';
import Input from '../atoms/Input';
import TextEditor from '../atoms/TextEditor';
import { VocButton } from '../atoms/VocButton';
import { getCookie } from '../../apis/utils/cookies';
import { SuccessAlert, WarningAlert } from '../../utils/actions';
import { validateAnswerTitle, validateLength } from '../../utils/validation';
import {
    deleteQuestionByUserId,
    deleteQuestionByUserIdForManager,
} from '../../apis/api/question';
import {
    postAnswerByQuestionId,
    putAnswerByQuestionId,
} from '../../apis/api/answer';
import { getCollaborationDetail } from '../../apis/api/collaboration';
import { Answer_Input, Ready, Completed } from '../../assets/css/Voc.css';

export default function AnswerInput({
    questionDetail,
    answerDetail,
    colPossible,
}) {
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [writeAnswer, editAnswer]);

    useEffect(() => {
        if (!colPossible) {
            fetchGetColDetail(
                questionDetail?.questionId,
                questionDetail?.colId,
            );
        }
    }, [colPossible]);

    const sanitizer = dompurify.sanitize;

    const navigate = useNavigate();

    const role = getCookie('userRole');
    const userId = getCookie('userId');

    const [writeAnswer, setWriteAnswer] = useState(false);
    const [editAnswer, setEditAnswer] = useState(false);

    const [title, setTitle] = useState(answerDetail?.title || '');
    const [editorValue, setEditorValue] = useState(
        answerDetail?.contents || '',
    );
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState(answerDetail?.fileName || '');
    const [filePath, setFilePath] = useState(answerDetail?.filePath || '');
    const [isFileDeleted, setFileDeleted] = useState(false);

    const fileInputRef = useRef(null);

    const [showSuccessAlert, canShowSuccessAlert] = useState(false);
    const [showWarningAlert, canShowWarningAlert] = useState(false);
    const [message, setMessage] = useState('');

    const fetchPostAndPutAnswerByQuestionId = answerDetail
        ? async () => {
              try {
                  const answerData = {
                      title: title,
                      contents: editorValue,
                      isFileDeleted,
                  };
                  await putAnswerByQuestionId(
                      file,
                      answerData,
                      answerDetail?.questionId,
                  );
                  setMessage('답변이 수정되었습니다.');
                  canShowSuccessAlert(true);
                  setTimeout(() => {
                      window.location.reload();
                  }, '1000');
              } catch (error) {
                  console.error('답변 수정 실패: ', error);
              }
          }
        : async () => {
              try {
                  const answerData = {
                      title: title,
                      contents: editorValue,
                  };
                  await postAnswerByQuestionId(
                      file,
                      answerData,
                      answerDetail?.questionId,
                  );
                  setMessage('답변이 등록되었습니다.');
                  canShowSuccessAlert(true);
                  setTimeout(() => {
                      window.location.reload();
                  }, '1000');
              } catch (error) {
                  console.log('답변 등록 실패: ', error);
              }
          };

    const fetchDeleteQuestionByQuestionId = async (userId) => {
        try {
            await deleteQuestionByUserId(userId, questionId);
            navigate('/voc-list/question');
        } catch (error) {
            console.log('질문 삭제(고객사용) 실패: ', error);
        }
    };

    const fetchDeleteQuestionByQuestionIdForManager = async () => {
        try {
            await deleteQuestionByUserIdForManager(questionId);
            navigate('/voc-list/question');
        } catch (error) {
            console.log('질문 삭제(담당자용) 실패: ', error);
        }
    };

    const fetchGetColDetail = async (questionId, colId) => {
        try {
            const response = await getCollaborationDetail(questionId, colId);
            sessionStorage.setItem('colDetail', JSON.stringify(response.data));
        } catch (error) {
            console.error('(새창) 협업 상세 조회 실패: ', error);
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

    const completedAnswer = () => {
        if (validateAnswerTitle(title)) {
            setMessage('제목은 1자 이상 20자 이하로 입력하세요.');
            return canShowWarningAlert(true);
        } else if (validateLength(editorValue)) {
            setMessage('답변을 10자 이상 입력하세요.');
            return canShowWarningAlert(true);
        } else {
            fetchPostAndPutAnswerByQuestionId();
        }
    };

    const calDateNo = (datetime) => {
        if (datetime) {
            const [datePart, timePart] = datetime.split('T');
            return `${datePart}${' '}${timePart.substring(0, 5)}`;
        }
    };

    return (
        <div className={Answer_Input}>
            <div>
                {!writeAnswer && questionDetail?.status === 'READY' ? ( // 답변 대기 질문인 경우
                    ''
                ) : (writeAnswer || editAnswer) && role !== 'customer' ? ( // 답변 입력 중
                    <div className={Ready}>
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
                        {/* 답변 입력 */}
                        <TextEditor
                            placeholder={'답변을 입력하세요.'}
                            width={'1320px'}
                            inputHeight={'240px'}
                            inputMaxHeight={'240px'}
                            padding={'0px'}
                            value={editorValue}
                            border={'1px solid #8b8b8b'}
                            onChange={setEditorValue}
                        />
                    </div>
                ) : questionDetail?.status === 'COMPLETED' ? ( // 답변 등록 완료
                    <div className={Completed}>
                        <div>
                            <div>
                                <div>답변 완료</div>
                                <div>{answerDetail.title || ''}</div>
                                <div>
                                    <a href={answerDetail.filePath} download>
                                        {answerDetail.fileName}
                                    </a>
                                </div>
                            </div>
                            <div>{calDateNo(answerDetail.createdDate)}</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizer(
                                        `${answerDetail.contents || ''}`,
                                    ),
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div className={Completed}>
                    {(questionDetail?.status === 'READY' || editAnswer) &&
                    role !== 'customer' ? (
                        <>
                            {!writeAnswer && (
                                <>
                                    <VocButton
                                        btnName={'질문 삭제'}
                                        backgroundColor={'#ffffff'}
                                        textColor={'#03507d'}
                                        onClick={() => {
                                            if (!colPossible) {
                                                window.alert(
                                                    '협업이 진행된 질문으로, 삭제가 불가합니다.',
                                                );
                                                return;
                                            }
                                            window.confirm(
                                                '고객사의 질문이 삭제됩니다. 정말 삭제하시겠습니까?',
                                            )
                                                ? fetchDeleteQuestionByQuestionIdForManager()
                                                : '';
                                        }}
                                    />
                                    <VocButton
                                        btnName={'답변하기'}
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        onClick={() => {
                                            if (!colPossible) {
                                                window.alert(
                                                    '협업이 진행되었습니다. 협업 조회 페이지를 참고하세요.',
                                                );
                                                sessionStorage.setItem(
                                                    'questionDetail',
                                                    JSON.stringify(
                                                        questionDetail,
                                                    ),
                                                );
                                                window.open(
                                                    `/voc-form/collaboration/res/${questionDetail.colId}/${questionDetail.questionId}`,
                                                );
                                            }
                                            setWriteAnswer(true);
                                        }}
                                    />
                                </>
                            )}
                            {colPossible &&
                                !writeAnswer &&
                                role === 'sales' && (
                                    <VocButton
                                        btnName={'협업 요청'}
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        onClick={() => {
                                            if (!colPossible) {
                                                window.alert(
                                                    '현재 협업 진행 중인 질문입니다.',
                                                );
                                                return;
                                            }
                                            navigate(
                                                '/voc-form/collaboration/req',
                                                {
                                                    state: {
                                                        questionDetail:
                                                            questionDetail,
                                                    },
                                                },
                                            );
                                        }}
                                    />
                                )}
                            {writeAnswer && (
                                <>
                                    <VocButton
                                        btnName={'작성 취소'}
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        onClick={() => {
                                            window.confirm(
                                                '지금까지 작성한 내용이 사라집니다. 정말 취소하시겠습니까?',
                                            )
                                                ? setWriteAnswer(false)
                                                : '';
                                        }}
                                    />
                                    <VocButton
                                        btnName={'답변 등록'}
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        onClick={() => {
                                            completedAnswer();
                                        }}
                                    />
                                </>
                            )}
                        </>
                    ) : questionDetail?.status === 'READY' &&
                      role === 'customer' ? (
                        <>
                            <VocButton
                                btnName={'질문 삭제'}
                                backgroundColor={'#ffffff'}
                                textColor={'#03507d'}
                                onClick={() => {
                                    if (!colPossible) {
                                        window.alert(
                                            '현재 협업 진행 중인 질문으로, 삭제가 불가합니다.',
                                        );
                                        return;
                                    }
                                    window.confirm(
                                        '작성하신 질문이 삭제됩니다. 정말 삭제하시겠습니까?',
                                    )
                                        ? fetchDeleteQuestionByQuestionId(
                                              userId,
                                          )
                                        : '';
                                }}
                            />
                            <VocButton
                                btnName={'질문 수정'}
                                backgroundColor={'#03507d'}
                                textColor={'#ffffff'}
                                onClick={() => {
                                    if (!colPossible) {
                                        window.alert(
                                            '현재 협업 진행 중인 질문으로, 수정이 불가합니다.',
                                        );
                                        return;
                                    }
                                    navigate('/voc-form/question', {
                                        state: {
                                            questionDetail: questionDetail,
                                        },
                                    });
                                }}
                            />
                        </>
                    ) : role !== 'customer' &&
                      !editAnswer &&
                      userId === answerDetail?.managerId ? (
                        <VocButton
                            btnName={'답변 수정'}
                            backgroundColor={'#03507d'}
                            textColor={'#ffffff'}
                            margin={'12px 0 24px 24px'}
                            onClick={() => {
                                if (!colPossible) {
                                    window.alert(
                                        '협업이 진행되었습니다. 협업 조회 페이지를 참고하세요.',
                                    );
                                    sessionStorage.setItem(
                                        'questionDetail',
                                        JSON.stringify(questionDetail),
                                    );
                                    window.open(
                                        `/voc-form/collaboration/res/${questionDetail.colId}/${questionDetail.questionId}`,
                                    );
                                }
                                setEditAnswer(true);
                                setWriteAnswer(true);
                            }}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <WarningAlert
                showAlert={showWarningAlert}
                onClose={() => {
                    canShowWarningAlert(false);
                }}
                message={message}
                inert
            />
            <SuccessAlert
                showAlert={showSuccessAlert}
                onClose={() => {
                    canShowSuccessAlert(false);
                }}
                message={message}
                inert
            />
        </div>
    );
}
