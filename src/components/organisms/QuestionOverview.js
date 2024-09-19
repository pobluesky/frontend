import React from 'react';
import { Question_Overview } from '../../assets/css/Voc.css';
import { getCookie } from '../../apis/utils/cookies';

function QuestionOverview({ questionCount, answerCount, colCount }) {
    const thisRole = getCookie('userRole');
    const gridTemplateColumns =
        thisRole === 'customer'
            ? '440px 440px 440px' // isCustomer
            : '330px 330px 330px 330px'; // isManager

    return (
        <div className={Question_Overview}>
            <div style={{ gridTemplateColumns }}>
                <div>
                    <div>전체 문의</div>
                    <div>{questionCount || ''}건</div>
                </div>
                <div>
                    <div>답변 대기</div>
                    <div>
                        {questionCount - answerCount < 0
                            ? ''
                            : questionCount - answerCount}
                        건
                    </div>
                </div>
                <div>
                    <div>답변 완료</div>
                    <div>{answerCount || ''}건</div>
                </div>
                {thisRole !== 'customer' && (
                    <>
                        <div>
                            <div>협업</div>
                            <div>{colCount || 0}건</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default QuestionOverview;
