import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';

export const actions = {
    초기화: () => {
        if (window.confirm('모든 내용을 초기화 하시겠습니까?')) {
            alert('요청되었습니다.');
        }
    },
    임시저장: () => {
        if (window.confirm('작성한 내용을 임시저장 하시겠습니까?')) {
            alert('요청되었습니다.');
        }
    },
    삭제: () => {
        if (window.confirm('Inquiry를 삭제하시겠습니까?')) {
            alert('요청되었습니다.');
        }
    },
    검토의뢰: () => {
        if (
            window.confirm('[최종 제출] 해당 Inquiry 검토를 의뢰하시겠습니까?')
        ) {
            alert('요청되었습니다.');
        }
    },
    품질검토요청: () => {
        if (window.confirm('품질 담당자에게 검토를 요청하시겠습니까?')) {
            alert('요청되었습니다.');
        }
    },
    '1차검토완료': () => {
        if (window.confirm('1차 검토를 완료하시겠습니까?')) {
            alert('1차 검토가 완료되었습니다.');
        }
    },
    최종검토완료: () => {
        if (window.confirm('최종 검토를 완료하시겠습니까?')) {
            alert('최종 검토가 완료되었습니다.');
        }
    },
    품질검토완료: () => {
        if (window.confirm('품질 검토 완료 결과를 전달하시겠습니까?')) {
            alert('내용이 전달되었습니다.');
        }
    },
    닫기: () => {
        alert('닫기 버튼이 클릭되었습니다.');
    },
};

// 성공 알람
const SuccessAlert = ({ showAlert, onClose, message }) => {
    return (
        <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={showAlert}
            onClose={onClose}
        >
            <Alert severity="success" sx={{ width: '336px' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

// 경고 알람
const WarningAlert = ({ showAlert, onClose, message, color }) => {
    return (
        <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={showAlert}
            onClose={onClose}
        >
            <Alert
                variant={color || "outlined"}
                severity="warning"
                sx={{ width: '336px' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

// 실패 알람
const FailedAlert = ({ showAlert, onClose, message }) => {
    return (
        <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={showAlert}
            onClose={onClose}
        >
            <Alert severity="error" sx={{ width: '336px' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

// inquiry 등록 시 에러 Alert
const InquiryPostErrorAlert = ({ showAlert, onClose, error }) => {
    return (
        <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={showAlert}
            onClose={onClose}
        >
            <Alert severity="error" sx={{ width: '336px' }}>
                {error}
            </Alert>
        </Snackbar>
    );
};

// inquiry 작성 완료
const InquiryCompleteAlert = () => {
    Swal.fire({
        icon: 'success',
        title: 'Inquiry 문의가 접수되었습니다.',
        showConfirmButton: false,
        timer: 2000,
    });
};

// inquiry 수정 완료
const InquiryUpdateAlert = () => {
    Swal.fire({
        icon: 'success',
        title: 'Inquiry 문의 내용이 수정되었습니다.',
        showConfirmButton: false,
        timer: 2000,
    });
};

// 판매 담당자 확인 및 문의 접수
const SalesManagerCheckAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '판매 담당자 확인 및 문의가 접수되었습니다.',
        showConfirmButton: false,
        timer: 2000,
        width: 600,
    });
}

// 품질검토요청
const QualityReviewCompleteAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '품질 검토가 요청되었습니다.',
        showConfirmButton: false,
        timer: 2000,
    });
};

// 영업검토정보, 1차 검토, 최종 검토, OfferSheet 작성 완료
const FirstReviewCompleteAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '1차 검토가 완료되었습니다.',
        showConfirmButton: false,
        timer: 2000,
    });
};

// 품질검토정보 작성 완료
const QualityResponseAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '품질검토가 접수되었습니다.',
        showConfirmButton: false,
        timer: 2000,
    });
};

// 품질검토정보 작성 완료
const QualityCompleteAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '품질검토정보가 전송되었습니다.',
        showConfirmButton: false,
        timer: 2000,
    });
};

// 최종 검토 & 오퍼시트 작성 완료
const FinalReviewCompleteAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '최종 검토와 오퍼시트 내용이 전송되었습니다.',
        showConfirmButton: false,
        timer: 2000,
        width: 600,
    });
};

export {
    SuccessAlert,
    WarningAlert,
    FailedAlert,
    InquiryPostErrorAlert,
    InquiryCompleteAlert,
    InquiryUpdateAlert,
    SalesManagerCheckAlert,
    FirstReviewCompleteAlert,
    QualityResponseAlert,
    QualityReviewCompleteAlert,
    QualityCompleteAlert,
    FinalReviewCompleteAlert,
};
