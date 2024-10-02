import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VocButton } from '../atoms/VocButton';
import TextEditor from '../atoms/TextEditor';
import { SuccessAlert, WarningAlert } from '../../utils/actions';
import { validateLength } from '../../utils/validation';
import {
    postCollaborationBySales,
    putModifyByManager,
} from '../../apis/api/collaboration';
import { getCookie } from '../../apis/utils/cookies';
import { Col_Req_Input } from '../../assets/css/Voc.css';

export default function ColReqInput({
    colResId,
    colDetail,
    questionDetail,
    colResManagerName,
    colResManagerDept,
}) {
    const navigate = useNavigate();

    const [editorValue, setEditorValue] = useState(
        colDetail?.colContents || '',
    );

    const [showSuccessAlert, canShowSuccessAlert] = useState(false);
    const [showWarningAlert, canShowWarningAlert] = useState(false);
    const [message, setMessage] = useState('');

    // 협업 요청 등록 및 수정
    const fetchPostColReq = !colDetail
        ? async () => {
              try {
                  const colData = {
                      colReqId: getCookie('userId'),
                      colResId,
                      colContents: editorValue,
                  };
                  const response = await postCollaborationBySales(
                      null,
                      colData,
                      questionDetail?.questionId,
                  );
                  setMessage('협업이 요청되었습니다.');
                  canShowSuccessAlert(true);
                  setTimeout(() => {
                      navigate('/voc-form/collaboration/res', {
                          state: {
                              questionDetail: questionDetail,
                              colDetail: response.data,
                          },
                      });
                  }, '1000');
              } catch (error) {
                  console.error('협업 요청 실패: ', error);
              }
          }
        : async () => {
              try {
                  const colData = {
                      colReqId: colDetail?.colManagerFromResponseDto.userId,
                      colResId: colDetail?.colManagerToResponseDto.userId,
                      colContents: editorValue,
                      isAccepted: null,
                      colReply: '',
                  };
                  const response = await putModifyByManager(
                      null,
                      colDetail?.colId,
                      colData,
                  );
                  setMessage('협업 요청이 수정되었습니다.');
                  canShowSuccessAlert(true);
                  setTimeout(() => {
                      navigate('/voc-form/collaboration/res', {
                          state: {
                              questionDetail: questionDetail,
                              colDetail: response.data,
                          },
                      });
                  }, '1000');
              } catch (error) {
                  console.log('협업 요청 수정 실패: ', error);
              }
          };

    const checkValidate = () => {
        if (!colResManagerName) {
            if (!colDetail?.colManagerToResponseDto.name) {
                setMessage('희망하는 협업 응답자를 선택하세요.');
                return canShowWarningAlert(true);
            }
        }
        if (!colResManagerDept) {
            if (!colDetail?.colManagerToResponseDto.department) {
                setMessage('희망하는 협업 응답자를 선택하세요.');
                return canShowWarningAlert(true);
            }
        }
        if (validateLength(editorValue)) {
            setMessage('요청 사유를 10자 이상 입력하세요.');
            return canShowWarningAlert(true);
        }
        fetchPostColReq();
    };

    return (
        <div>
            <div className={Col_Req_Input}>
                <TextEditor
                    placeholder={'협업 요청 사유를 입력하세요.'}
                    width={'1320px'}
                    inputHeight={'240px'}
                    inputMaxHeight={'240px'}
                    padding={'0px'}
                    margin={'0 auto 0 auto'}
                    value={editorValue}
                    border={'1px solid #8b8b8b'}
                    onChange={setEditorValue}
                />
                <div>
                    <>
                        <VocButton
                            btnName={'요청 등록'}
                            backgroundColor={'#03507d'}
                            textColor={'#ffffff'}
                            margin={'0 24px 0 0'}
                            onClick={() => {
                                checkValidate();
                            }}
                        />
                        <VocButton
                            btnName={'요청 취소'}
                            backgroundColor={'#03507d'}
                            textColor={'#ffffff'}
                            onClick={() => {
                                window.confirm(
                                    '지금까지 작성한 내용이 사라집니다. 정말 취소하시겠습니까?',
                                )
                                    ? navigate(-1)
                                    : '';
                            }}
                        />
                    </>
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
        </div>
    );
}
