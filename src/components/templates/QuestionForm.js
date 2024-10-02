import React, { useState, useEffect } from 'react';
import QuestionInput from '../organisms/QuestionInput';
import QuestionTypeSelector from '../organisms/QuestionTypeSelector';
import QuestionInquirySearchModal from '../molecules/QuestionInquirySearchModal';
import { getCookie } from '../../apis/utils/cookies';
import {
    getInquiryDetail,
    getInquiryDetailByManagers,
} from '../../apis/api/inquiry';

export default function QuestionForm({ questionDetail }) {
    const userId = getCookie('userId');
    const role = getCookie('userRole');

    const [openModal, setOpenModal] = useState(false);
    const [selectedType, setSelectedType] = useState(
        questionDetail?.type || 'INQ',
    );
    const [inquiryId, setInquiryId] = useState(questionDetail?.inquiryId || '');
    const [formattedId, setFormattedId] = useState('');
    const [replaceId, setReplacedId] = useState('');

    if (openModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const getInquiryRuleNo = (date, id) => {
        const newId = id.toString().padStart(3, '0');
        return `${date}${newId}`;
    };

    const fetchGetInquiryDetail = async () => {
        try {
            if (role === 'customer') {
                const response = await getInquiryDetail(userId, inquiryId);
                setReplacedId(
                    getInquiryRuleNo(response.data.createdDate, inquiryId),
                );
            } else if (role === 'quality' || role === 'sales') {
                const response = await getInquiryDetailByManagers(userId);
                setReplacedId(
                    getInquiryRuleNo(response.data.createdDate, inquiryId),
                );
            }
        } catch (error) {
            console.log('Inquiry 상세 조회 실패: ', error);
        }
    };

    useEffect(() => {
        if (questionDetail?.type === 'INQ') {
            fetchGetInquiryDetail();
        }
    }, [userId, role, questionDetail]);

    return (
        <div>
            <QuestionTypeSelector
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                setOpenModal={setOpenModal}
                inquiryId={inquiryId}
                formattedId={formattedId || replaceId}
            />
            <QuestionInput
                selectedType={selectedType}
                inquiryId={inquiryId}
                questionDetail={questionDetail}
            />
            {openModal && (
                <QuestionInquirySearchModal
                    setInquiryId={setInquiryId}
                    setFormattedId={setFormattedId}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                />
            )}
        </div>
    );
}
