/******************************************************************/
/* 회원가입 ********************************************************/
/******************************************************************/
// 이름
export const validateName = (name) => {
    if (name.trim() === '') {
        return '이름을 입력하세요.';
    }
    return '';
};

// 고유 코드
export const validateUserCode = (userCode) => {
    if (!userCode) {
        return '고유 코드를 입력하세요.';
    }
    return '';
};

// 이메일
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return '올바른 이메일 형식이 아닙니다.';
    }
    return '';
};

// 전화번호
export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phone)) {
        return '전화번호가 잘못된 형식입니다.';
    }
    return '';
};

// 전화번호 수정
export const validatePhoneEdit = (phone) => {
    const phoneRegex = /^(010-\d{3,4}-\d{4}|011-\d{3}-\d{4})$/;
    if (!phoneRegex.test(phone)) {
        return '전화번호가 잘못된 형식입니다.';
    }
    return '';
};

// 비밀번호
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return '특수문자, 숫자를 포함하여 8자리 이상 입력하세요.';
    }
    return '';
};

// 비밀번호 확인
export const validateMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return '비밀번호가 일치하지 않습니다.';
    }
    return '';
};

// 고객사명
export const validateCustomerName = (customerName) => {
    if (customerName.trim() === '') {
        return '고객사명을 입력하세요.';
    }
    return '';
};

/******************************************************************/
/* 답변 ***********************************************************/
/******************************************************************/
// 답변 제목 길이
export const validateAnswerTitle = (answerTitle) => {
    if (answerTitle.length > 31 || answerTitle.length < 1) {
        return true;
    }
    return '';
};

// 답변 내용 길이
export const validateAnswerContents = (answerContents) => {
    if (answerContents.replace(/<\/?[^>]+(>|$)/g, '').length < 10) {
        return true;
    }
    return '';
};

/******************************************************************/
/* 질문 ***********************************************************/
/******************************************************************/
// 질문 제목 길이
export const validateQuestionTitle = (questionTitle) => {
    if (questionTitle.length > 21 || questionTitle.length < 1) {
        return true;
    }
    return '';
};

// 질문 내용 길이
export const validateQuestionContents = (questionContents) => {
    if (questionContents.replace(/<\/?[^>]+(>|$)/g, '').length < 10) {
        return true;
    }
    return '';
};
