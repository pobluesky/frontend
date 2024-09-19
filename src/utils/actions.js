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

// 회원가입 이름 미입력
const InvalidCustomerNameAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                이름을 입력하세요.
            </Alert>
        </Snackbar>
    );
};

// 회원가입 고유 코드 미입력
const InvalidCustomerCodeAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                유효하지 않은 코드입니다.
            </Alert>
        </Snackbar>
    );
};

// 회원가입 역할 미선택
const ManagerRoleIsNullAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                권한을 선택하세요.
            </Alert>
        </Snackbar>
    );
};

// 회원가입 성공
const JoinCompleteAlert = ({ showAlert, onClose }) => {
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
                회원가입이 완료되었습니다.
            </Alert>
        </Snackbar>
    );
};

// 회원가입 실패
const JoinFailedAlert = ({ showAlert, onClose, message }) => {
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

// 로그인 실패
const LoginFailedAlert = ({ showAlert, onClose, message }) => {
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

// 질문 제목 길이 제한
const WrongQuestionTitleAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                제목은 1자 이상 30자 이하로 입력하세요.
            </Alert>
        </Snackbar>
    );
};

// 질문 내용 길이 제한
const WrongQuestionContentAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                질문을 10자 이상 입력하세요.
            </Alert>
        </Snackbar>
    );
};

// Inquiry ID 미선택
const InquiryIdisNullAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                Inquiry 번호를 선택하세요.
            </Alert>
        </Snackbar>
    );
};

// 질문 등록 성공
const QuestionCompleteAlert = ({ showAlert, onClose }) => {
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
                질문이 등록되었습니다.
            </Alert>
        </Snackbar>
    );
};

// 답변 제목 길이 제한
const WrongAnswerTitleAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                제목은 1자 이상 20자 이하로 입력하세요.
            </Alert>
        </Snackbar>
    );
};

// 답변 내용 길이 제한
const WrongAnswerContentAlert = ({ showAlert, onClose }) => {
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
                variant="outlined"
                severity="warning"
                sx={{ width: '336px' }}
            >
                답변을 10자 이상 입력하세요.
            </Alert>
        </Snackbar>
    );
};

// 답변 등록 성공
const AnswerCompleteAlert = ({ showAlert, onClose }) => {
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
                답변이 등록되었습니다.
            </Alert>
        </Snackbar>
    );
};

const ColDoneAlert = ({ showAlert, onClose, message }) => {
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
    });
};

export {
    InvalidCustomerNameAlert,
    InvalidCustomerCodeAlert,
    ManagerRoleIsNullAlert,
    JoinCompleteAlert,
    JoinFailedAlert,
    LoginFailedAlert,
    WrongAnswerTitleAlert,
    WrongAnswerContentAlert,
    AnswerCompleteAlert,
    WrongQuestionTitleAlert,
    WrongQuestionContentAlert,
    InquiryIdisNullAlert,
    QuestionCompleteAlert,
    ColDoneAlert,
    InquiryCompleteAlert,
    InquiryUpdateAlert,
    QualityReviewCompleteAlert,
    FirstReviewCompleteAlert,
    QualityCompleteAlert,
    FinalReviewCompleteAlert,
};
