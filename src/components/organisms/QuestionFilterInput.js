import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { getCookie } from '../../apis/utils/cookies';
import {
    Selected,
    NotSelected,
    Question_Filter_Input_Container,
    Question_Filter_Input,
} from '../../assets/css/Voc.css';

function QuestionFilterInput({
    title,
    questionNo,
    customerName,
    startDate,
    endDate,
    setTitle,
    setStartDate,
    setEndDate,
    setQuestionNo,
    setCustomerName,
    setTimeFilter,
    setStatusFilter,
    setIdFilter,
    setTypeFilter,
}) {
    const [tempTitle, setTempTitle] = useState(title);
    const [tempQuestionNo, setTempQuestionNo] = useState(questionNo);
    const [tempCustomerName, setTempCustomerName] = useState(customerName);
    const [tempStatus, setTempStatus] = useState('TOTAL');
    const [tempId, setTempId] = useState('');
    const [tempType, setTempType] = useState('');
    const [isLatest, setLatest] = useState(true);

    const role = getCookie('userRole');
    const userId = getCookie('userId');

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            startSearch();
        }
    };

    const startSearch = () => {
        setTitle(tempTitle);
        setQuestionNo(tempQuestionNo);
        setCustomerName(tempCustomerName);
    };

    const resetFilter = () => {
        setTitle('');
        setQuestionNo('');
        setCustomerName('');
        setTimeFilter('LATEST');
        setTypeFilter('');
        setStartDate('');
        setEndDate('');

        setTempTitle('');
        setTempQuestionNo('');
        setTempCustomerName('');
        setTempType('');
        setLatest(true);
    };

    const resetStatusFilter = () => {
        setStatusFilter('');
    };

    return (
        <>
            <div className={Question_Filter_Input_Container}>
                <div>
                    <Button
                        btnName={'전체 문의'}
                        width={'108px'}
                        height={'34px'}
                        border={'none'}
                        fontWeight={'600'}
                        textColor={
                            tempStatus === 'TOTAL' ? '#25262b' : '#adb0b4'
                        }
                        outline={'none'}
                        backgroundColor={'#ffffff'}
                        onClick={() => {
                            setTempStatus('TOTAL');
                            setTempId('');
                            setIdFilter('');
                            resetFilter();
                            setStatusFilter('');
                        }}
                    />
                    <Button
                        btnName={'답변 완료'}
                        width={'108px'}
                        height={'34px'}
                        border={'none'}
                        fontWeight={'600'}
                        textColor={
                            tempStatus === 'COMPLETED' ? '#25262b' : '#adb0b4'
                        }
                        outline={'none'}
                        backgroundColor={'#ffffff'}
                        onClick={() => {
                            setTempStatus('COMPLETED');
                            setTempId('');
                            setIdFilter('');
                            resetFilter();
                            setStatusFilter('COMPLETED');
                        }}
                    />
                    <Button
                        btnName={'답변 대기'}
                        width={'108px'}
                        height={'34px'}
                        border={'none'}
                        fontWeight={'600'}
                        textColor={
                            tempStatus === 'READY' ? '#25262b' : '#adb0b4'
                        }
                        outline={'none'}
                        backgroundColor={'#ffffff'}
                        onClick={() => {
                            setTempStatus('READY');
                            setTempId('');
                            setIdFilter('');
                            resetFilter();
                            setStatusFilter('READY');
                        }}
                    />
                    {role !== 'customer' && (
                        <Button
                            btnName={'나의 답변'}
                            width={'108px'}
                            height={'34px'}
                            border={'none'}
                            fontWeight={'600'}
                            textColor={
                                tempId === userId ? '#25262b' : '#adb0b4'
                            }
                            outline={'none'}
                            backgroundColor={'#ffffff'}
                            onClick={() => {
                                setTempId(userId);
                                setTempStatus('');
                                resetFilter();
                                resetStatusFilter();
                                setIdFilter(userId);
                            }}
                        />
                    )}
                </div>
                <div>
                    {tempStatus === 'TOTAL' ? (
                        <div className={Selected}>
                            <hr />
                        </div>
                    ) : (
                        <div className={NotSelected}>
                            <hr />
                        </div>
                    )}
                    {tempStatus === 'COMPLETED' ? (
                        <div className={Selected}>
                            <hr />
                        </div>
                    ) : (
                        <div className={NotSelected}>
                            <hr />
                        </div>
                    )}
                    {tempStatus === 'READY' ? (
                        <div className={Selected}>
                            <hr />
                        </div>
                    ) : (
                        <div className={NotSelected}>
                            <hr />
                        </div>
                    )}
                    {role !== 'customer' ? (
                        tempId === userId ? (
                            <div className={Selected}>
                                <hr />
                            </div>
                        ) : (
                            <div className={NotSelected}>
                                <hr />
                            </div>
                        )
                    ) : (
                        ''
                    )}
                    <div
                        className={NotSelected}
                        style={{
                            width: role === 'customer' ? '996px' : '888px',
                        }}
                    >
                        <hr />
                    </div>
                </div>
            </div>
            <div className={Question_Filter_Input} onKeyDown={enterKeyDown}>
                {isLatest ? (
                    <Button
                        btnName={'최신순'}
                        width={'84px'}
                        height={'34px'}
                        border={'solid 1px #c1c1c1'}
                        borderRadius={'8px'}
                        fontWeight={'600'}
                        textColor={'#adb0b4'}
                        outline={'none'}
                        backgroundColor={'#ffffff'}
                        onClick={() => {
                            setTimeFilter('OLDEST');
                            setLatest(false);
                        }}
                    />
                ) : (
                    <Button
                        btnName={'과거순'}
                        width={'84px'}
                        height={'34px'}
                        border={'solid 1px #c1c1c1'}
                        borderRadius={'8px'}
                        fontWeight={'600'}
                        textColor={'#adb0b4'}
                        outline={'none'}
                        backgroundColor={'#ffffff'}
                        onClick={() => {
                            setTimeFilter('LATEST');
                            setLatest(true);
                        }}
                    />
                )}
                <select
                    name="type"
                    id="type"
                    value={tempType}
                    onChange={(e) => {
                        setTempType(e.target.value);
                        setTypeFilter(e.target.value);
                    }}
                >
                    <option value="" defaultValue>
                        문의 유형
                    </option>
                    <option value="INQ">Inquiry</option>
                    <option value="SITE">사이트</option>
                    <option value="ETC">기타</option>
                </select>
                <Input
                    type={'text'}
                    width={'84px'}
                    height={'32px'}
                    border={'solid 1px #c1c1c1'}
                    borderRadius={'8px'}
                    outline={'none'}
                    padding={'0 8px 0 8px'}
                    placeholder={'문의 번호'}
                    value={tempQuestionNo}
                    onChange={(e) => setTempQuestionNo(e.target.value)}
                />
                {role !== 'customer' ? (
                    <>
                        <Input
                            type={'text'}
                            width={'180px'}
                            height={'32px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'8px'}
                            outline={'none'}
                            padding={'0 8px 0 8px'}
                            placeholder={'문의 제목을 검색하세요.'}
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                        />
                        <Input
                            type={'text'}
                            width={'180px'}
                            height={'32px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'8px'}
                            outline={'none'}
                            padding={'0 8px 0 8px'}
                            placeholder={'고객사명을 검색하세요.'}
                            value={tempCustomerName}
                            onChange={(e) =>
                                setTempCustomerName(e.target.value)
                            }
                        />
                    </>
                ) : (
                    <Input
                        type={'text'}
                        width={'384px'}
                        height={'32px'}
                        border={'solid 1px #c1c1c1'}
                        borderRadius={'8px'}
                        outline={'none'}
                        padding={'0 8px 0 8px'}
                        placeholder={'문의 제목을 검색하세요.'}
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                    />
                )}
                <div>
                    <Input
                        type={'date'}
                        width={'180px'}
                        height={'28px'}
                        border={'none'}
                        borderRadius={'8px'}
                        outline={'none'}
                        padding={'0 8px 0 8px'}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Input
                        type={'date'}
                        width={'180px'}
                        height={'28px'}
                        border={'none'}
                        borderRadius={'8px'}
                        outline={'none'}
                        padding={'0 8px 0 8px'}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}

export default QuestionFilterInput;
