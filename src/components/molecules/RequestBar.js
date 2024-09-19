import React from 'react';
import Button from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import {
    FinalReviewCompleteAlert, FirstReviewCompleteAlert,
    QualityCompleteAlert, QualityReviewCompleteAlert,
} from '../../utils/actions';
import {
    putProgress,
} from '../../apis/api/inquiry';

function RequestBar({
    requestBarTitle,
    onUpdate,
    onSubmit,
    onReviewSubmit,
    onFinalSubmit,
    onQualitySubmit,
    onQualityCompleteSubmit,
    onReset,
}) {
    const navigate = useNavigate();
    const { role } = useAuth();
    const { id } = useParams();

    const buttonConfig = {
        'Inquiry 등록0': ['초기화', '검토의뢰'],
        'Inquiry 상세조회 및 영업검토1': ['1차검토완료', '닫기'],
        'Inquiry 상세조회 및 영업검토2': ['품질검토요청', '닫기'],
        'Inquiry 상세조회 및 영업검토3': ['최종검토완료', '닫기'],
        'Inquiry 상세조회 및 품질검토4': ['품질검토완료', '닫기'],
        'Inquiry 조회5': ['수정', '닫기'],
        'Inquiry 조회6': ['닫기'],
    };

    const buttons = buttonConfig[requestBarTitle];
    const displayName = requestBarTitle?.slice(0, -1);

    const updateProgress = async (nextProgress) => {
        try {
            const response = await putProgress(id, nextProgress);
            console.log('Progress updated successfully:', response);
        } catch (error) {
            console.log('Error updating progress:', error);
        }
    }

    const handleButtonClick = (btnName) => {
        if (btnName === '수정') {
            onUpdate();
        } else if (btnName === '검토의뢰') {
            onSubmit();
        } else if (btnName === '1차검토완료') {
            onReviewSubmit();
            updateProgress("FIRST_REVIEW_COMPLETED");
            FirstReviewCompleteAlert();
        } else if (btnName === '품질검토요청') {
            onQualitySubmit();
            updateProgress("QUALITY_REVIEW_REQUEST");
            QualityReviewCompleteAlert();
        } else if (btnName === '품질검토완료') {
            onQualityCompleteSubmit();
            updateProgress("QUALITY_REVIEW_COMPLETED");
            QualityCompleteAlert();
        }  else if (btnName === '최종검토완료') {
            onFinalSubmit();
            updateProgress("FINAL_REVIEW_COMPLETED");
            FinalReviewCompleteAlert();
        } else if (btnName === '초기화') {
            onReset();
        } else {
            console.log(`Action for ${btnName} is not implemented`);
        }

        if (btnName === '닫기') {
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
                    borderRadius: '20px',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#49454F',
                }}
            >
                <div style={{ marginLeft: '2vw' }}>{displayName}</div>
                <div>
                    {Array.isArray(buttons) && buttons.length > 0 ? (
                        buttons.map((btnName, index) => (
                        <Button
                                key={index}
                                onClick={() => handleButtonClick(btnName)}
                                btnName={btnName}
                                margin={'0 1.5vw 0 0'}
                                backgroundColor={'#03507d'}
                                textColor={'#ffffff'}
                                border={'none'}
                                borderRadius={'18px'}
                                fontSize={'17px'}
                                fontWeight={'500'}
                                padding={'10px'}
                            />
                        ))
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default RequestBar;
