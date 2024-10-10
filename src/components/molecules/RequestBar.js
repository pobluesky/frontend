import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '@mui/material/Button';
import {
    FinalReviewCompleteAlert,
    FirstReviewCompleteAlert,
    QualityCompleteAlert,
    QualityResponseAlert,
    QualityReviewCompleteAlert,
    SalesManagerCheckAlert,
} from '../../utils/actions';
import { putProgress } from '../../apis/api/inquiry';
import { _previewButton } from '../../assets/css/Form.css';

function RequestBar({
    requestBarTitle,
    onUpdate,
    onSubmit,
    onReviewSubmit,
    onFinalSubmit,
    onQualitySubmit,
    onQualityCompleteSubmit,
    onReset,
    isPreviewData,
    handleIsPreview,
    onAllocate,
    isUpdate,
}) {
    const navigate = useNavigate();
    
    const { role } = useAuth();
    const { id } = useParams();
    const realId = id ? id.slice(-2) : '';

    const buttonConfig = {
        'Inquiry 등록0': ['초기화', '검토의뢰'],
        'Inquiry 상세조회 및 영업검토1': ['판매 담당자 확인', '닫기'],
        'Inquiry 상세조회 및 영업검토2': ['1차검토완료', '닫기'],
        'Inquiry 상세조회 및 영업검토3': ['품질검토요청', '닫기'],
        'Inquiry 상세조회 및 품질검토4': ['품질검토접수', '닫기'],
        'Inquiry 상세조회 및 영업검토5': ['최종검토완료', '닫기'],
        'Inquiry 상세조회 및 품질검토6': ['품질검토완료', '닫기'],
        'Inquiry 조회7': ['수정', '닫기'],
        'Inquiry 조회8': ['닫기'],
    };

    let buttons;
    if (requestBarTitle === 'Inquiry 조회0') {
        buttons = isUpdate
            ? buttonConfig['Inquiry 조회7']
            : buttonConfig['Inquiry 조회8'];
    } else {
        buttons = buttonConfig[requestBarTitle];
    }

    const displayName = requestBarTitle ? requestBarTitle.slice(0, -1) : '';

    const updateProgress = async (nextProgress) => {
        try {
            const response = await putProgress(realId, nextProgress);
            console.log('Progress updated successfully:', response);
        } catch (error) {
            console.log('Error updating progress:', error);
        }
    };

    const handleButtonClick = (btnName) => {
        if (btnName === '수정') {
            onUpdate();
        } else if (btnName === '검토의뢰') {
            onSubmit();
        } else if (btnName === '판매 담당자 확인') {
            updateProgress('RECEIPT');
            SalesManagerCheckAlert();
            setTimeout(() => {
                navigate(`/inq-list/${role}`);
            }, '2000');
        } else if (btnName === '1차검토완료') {
            onReviewSubmit();
        } else if (btnName === '품질검토요청') {
            onQualitySubmit();
            onAllocate();
            QualityReviewCompleteAlert();
        } else if (btnName === '품질검토접수') {
            updateProgress('QUALITY_REVIEW_RESPONSE');
            QualityResponseAlert();
            setTimeout(() => {
                navigate(`/inq-list/${role}`);
            }, '2000');
        } else if (btnName === '품질검토완료') {
            onQualityCompleteSubmit();
        }  else if (btnName === '최종검토완료') {
            onFinalSubmit();
        } else if (btnName === '초기화') {
            onReset();
        } else if (btnName === '닫기') {
            navigate(`/inq-list/${role}`);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                marginTop: '3vh',
                marginBottom: '3vh',
            }}
        >
            <div
                style={{
                    width: '100vw',
                    padding: '1vw 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    border: 'solid #c1c1c1 1px',
                    borderRadius: '7px',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#49454F',
                }}
            >
                <div style={{ marginLeft: '2vw' }}>{displayName}</div>
                <div style={{ paddingRight: '15px' }}>
                    {isPreviewData && (
                        <button
                            className={_previewButton}
                            onClick={handleIsPreview}
                        >
                            시연용
                        </button>
                    )}
                    {Array.isArray(buttons) && buttons.length > 0
                        ? buttons.map((btnName, index) => (
                              <Button
                                  key={index}
                                  onClick={() => handleButtonClick(btnName)}
                                  variant="outlined"
                                  style={{
                                      margin: '0 10px',
                                      borderRadius: '10px',
                                      color: '#03507d',
                                      padding: '10px 20px',
                                      fontWeight: '900',
                                      fontSize: '14px',
                                      border: '1px solid #03507d',
                                  }}
                              >
                                  {btnName}
                              </Button>
                          ))
                        : ''}
                </div>
            </div>
        </div>
    );
}

export default RequestBar;
