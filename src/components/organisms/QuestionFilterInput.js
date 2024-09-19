import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
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

    setTitle,
    setStartDate,
    setEndDate,
    setQuestionNo,
    setCustomerName,

    searchCount,
    setTimeFilter,
    setStatusFilter,
    setTypeFilter,
}) {
    const [tempTitle, setTempTitle] = useState(title);
    const [tempQuestionNo, setTempQuestionNo] = useState(questionNo);
    const [tempCustomerName, setTempCustomerName] = useState(customerName);
    const [tempStatus, setTempStatus] = useState('TOTAL');
    const [tempType, setTempType] = useState('');
    const [isLatest, setLatest] = useState(true);

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

    // 전체 문의, 답변 완료, 답변 대기 선택 시 필터링 조건 초기화
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
                        textColor={tempStatus === '' ? '#25262b' : '#adb0b4'}
                        outline={'none'}
                        backgroundColor={'#ffffff'}
                        onClick={() => {
                            setTempStatus('TOTAL');
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
                            resetFilter();
                            setStatusFilter('READY');
                        }}
                    />
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
                    <div className={NotSelected}>
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
                {/* 문의 유형 검색 */}
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
                {/* 문의 번호 검색 */}
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
                {/* 문의 제목 검색 */}
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
                {/* 고객사명 검색 */}
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
                    onChange={(e) => setTempCustomerName(e.target.value)}
                />
                <div>
                    <Input
                        type={'date'}
                        width={'180px'}
                        height={'28px'}
                        border={'none'}
                        borderRadius={'8px'}
                        outline={'none'}
                        padding={'0 8px 0 8px'}
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
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}

export default QuestionFilterInput;
