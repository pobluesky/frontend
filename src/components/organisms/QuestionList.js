import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VocPageButton from './VocPageButton';
import {
    Question_List_Container,
    Question_List,
    Ready,
    Completed,
} from '../../assets/css/Voc.css';

export default function QuestionList({
    questionSummary,
    totalPages,
    currentPage,
    setCurrentPage,
}) {
    const navigate = useNavigate();

    const contentsEllipsis = {
        maxWidth: '1320px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'INQ':
                return 'Inquiry 문의';
            case 'SITE':
                return '사이트 문의';
            case 'ETC':
                return '기타 문의';
        }
    };

    return (
        <div className={Question_List_Container}>
            {questionSummary
                .filter((data) => data.isActivated)
                .map((data, idx) => (
                    <div key={idx}>
                        {!idx && <hr />}
                        <div
                            className={Question_List}
                            onClick={() => {
                                navigate(`/voc-form/answer/${data.questionId}`);
                            }}
                        >
                            <div>
                                <div>{getTypeLabel(data?.type)}</div>
                                {data.status === 'READY' ? (
                                    <div className={Ready}>답변 대기</div>
                                ) : (
                                    <div className={Completed}>답변 완료</div>
                                )}
                                <div>{data.title}</div>
                            </div>
                            <div style={contentsEllipsis}>
                                {data.contents.replace(/<\/?[^>]+(>|$)/g, '')}
                            </div>
                            <div>
                                <div>
                                    {data.questionCreatedAt.substring(0, 10)}
                                </div>
                                <div>{data.customerName}</div>
                            </div>
                            <hr />
                        </div>
                    </div>
                ))}
            <VocPageButton
                totalPages={totalPages}
                currentPage={currentPage}
                setPage={setCurrentPage}
            />
        </div>
    );
}
