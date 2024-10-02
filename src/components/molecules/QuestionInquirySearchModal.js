import React, { useEffect, useState } from 'react';
import close from '../../assets/css/icons/close.svg';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { VocButton } from '../atoms/VocButton';
import { useAuth } from '../../hooks/useAuth';
import { WarningAlert } from '../../utils/actions';
import { getAllInquiries } from '../../apis/api/inquiry';
import { Question_Inquiry_Modal } from '../../assets/css/Voc.css';

export default function QuestionInquirySearchModal({
    setInquiryId,
    setFormattedId,
    openModal,
    setOpenModal,
}) {
    useEffect(() => {
        fetchGetAllInquiry();
    }, [userId, openModal]);

    const { userId } = useAuth();

    const [inquiryData, setInquiries] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredInquiryData, setFilteredInquiryData] = useState([]);
    const [tempInquiryId, setTempInquiryId] = useState(null);
    const [tempProcessedInquiryId, setTempProcessedInquiryId] = useState(null);

    const [showWarningAlert, canShowWarningAlert] = useState(false);
    const [message, setMessage] = useState('');

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            inqSearch();
        }
    };

    // Inquiry 전체 조회
    const fetchGetAllInquiry = async () => {
        try {
            const response = await getAllInquiries(userId);
            setInquiries(response.inquiryInfo);
            setFilteredInquiryData(response.inquiryInfo);
        } catch (error) {
            console.log('Inquiry 전체 조회 실패: ', error);
        }
    };

    const inqSearch = () => {
        const filtered = inquiryData.filter(
            (inq) => String(inq.inquiryId) === String(searchId),
        );
        setFilteredInquiryData(filtered);
    };

    const checkSelectedInquiry = (selectedId) => {
        if (!selectedId) {
            setMessage('Inquiry를 선택하세요.');
            canShowWarningAlert(true);
        } else {
            setInquiryId(tempInquiryId);
            setFormattedId(tempProcessedInquiryId);
            setOpenModal(false);
        }
    };

    return (
        <>
            <div className={Question_Inquiry_Modal}>
                <div>
                    <div>
                        <Input
                            type="text"
                            value={searchId}
                            width={'196px'}
                            height={'36px'}
                            margin={'0 24px 0 0'}
                            padding={'0px 12px 0px 12px'}
                            border={'1px solid #03507d'}
                            placeholder={'Inquiry 번호 조회'}
                            onChange={(e) => setSearchId(e.target.value)}
                            onKeyDown={enterKeyDown}
                        />
                        <VocButton
                            btnName={'검색'}
                            backgroundColor={'#03507d'}
                            textColor={'#ffffff'}
                            margin={'0 24px 0 0'}
                            onClick={() => {
                                inqSearch(searchId);
                            }}
                        />
                        <VocButton
                            btnName={'선택'}
                            backgroundColor={'#03507d'}
                            textColor={'#ffffff'}
                            margin={'0 24px 0 0'}
                            onClick={() => {
                                checkSelectedInquiry(tempInquiryId);
                            }}
                        />
                        <VocButton
                            btnName={'전체 보기'}
                            backgroundColor={'#ffffff'}
                            textColor={'#03507d'}
                            onClick={() => {
                                setFilteredInquiryData(inquiryData);
                            }}
                        />
                        <div>
                            <Button
                                width={'36px'}
                                height={'36px'}
                                backgroundColor={'transparent'}
                                border={'none'}
                                imgSrc={close}
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Inquiry No.</th>
                                    <th>문의유형</th>
                                    <th>판매계약자</th>
                                    <th>제품</th>
                                    <th>고객사</th>
                                    <th>국가</th>
                                    <th>판매상사</th>
                                    <th>법인코드</th>
                                    <th>산업분류</th>
                                    <th>문의일자</th>
                                    <th>진행현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInquiryData?.map((inq) => (
                                    <>
                                        <tr
                                            key={inq.inquiryId}
                                            style={{
                                                backgroundColor:
                                                    tempInquiryId ===
                                                    inq.inquiryId
                                                        ? '#f3f3f3'
                                                        : 'transparent',
                                            }}
                                            onClick={() => {
                                                setTempInquiryId(inq.inquiryId);
                                                setTempProcessedInquiryId(
                                                    inq.processedInquiryId,
                                                );
                                            }}
                                        >
                                            <td
                                                onClick={() => {
                                                    sessionStorage.setItem(
                                                        'userId',
                                                        userId,
                                                    );
                                                    window.open(
                                                        `/inq-list/customer/${inq.inquiryId}`,
                                                        '_blank',
                                                    );
                                                }}
                                            >
                                                {inq.processedInquiryId}
                                            </td>
                                            <td>{inq.inquiryType}</td>
                                            <td>{inq.salesPerson}</td>
                                            <td>{inq.productType}</td>
                                            <td>{inq.customerName}</td>
                                            <td>{inq.country}</td>
                                            <td>{inq.corporate}</td>
                                            <td>{inq.corporationCode}</td>
                                            <td>{inq.industry}</td>
                                            <td>{inq.createdDate}</td>
                                            <td>{inq.progress}</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <WarningAlert
                showAlert={showWarningAlert}
                onClose={() => {
                    canShowWarningAlert(false);
                }}
                message={message}
                color={'standard'}
                inert
            />
        </>
    );
}
