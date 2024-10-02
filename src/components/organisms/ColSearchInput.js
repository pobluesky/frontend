import React, { useEffect, useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { Col_Search_Input } from '../../assets/css/Voc.css';

export default function ColSearchInput({
    setColNo,
    setColReqManager,
    setColResManager,
    setColReqFilter,
    setColResFilter,
    setProgressFilter,
    setTimeFilte,
    setStartDate,
    setEndDate,
}) {
    const [tempColNo, setTempColNo] = useState('');
    const [tempColReqManager, setTempColReqManager] = useState('');
    const [tempColResManager, setTempColResManager] = useState('');
    const [keyword, setKeyword] = useState('no');

    const filterSend = () => {
        setColNo(tempColNo);
        setColReqManager(tempColReqManager);
        setColResManager(tempColResManager);
    };

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterSend();
        }
    };

    useEffect(() => {
        if (keyword === 'no') {
            setTempColNo('');
            setColReqManager('all');
            setTempColReqManager('');
            setColResManager('all');
            setTempColResManager('');
            setColReqFilter('');
            setColResFilter('');
            setProgressFilter('');
            setTimeFilte('');
            setStartDate('');
            setEndDate('');
        } else if (keyword === 'reqManager') {
            setTempColReqManager('');
            setColNo('all');
            setTempColNo('');
        } else if (keyword === 'resManager') {
            setTempColResManager('');
            setColNo('all');
            setTempColNo('');
        }
    }, [keyword]);

    return (
        <div className={Col_Search_Input}>
            <select
                name="keyword"
                id="keyword"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
            >
                <option value="no" defaultValue>
                    협업 번호
                </option>
                <option value="reqManager">요청 담당자</option>
                <option value="resManager">응답 담당자</option>
            </select>
            {keyword === 'no' ? (
                <Input
                    width={'924px'}
                    height={'36px'}
                    margin={'0 auto 0 auto'}
                    padding={'0px 12px 0px 12px'}
                    border={'1px solid #8b8b8b'}
                    placeholder={'협업 번호를 검색하세요.'}
                    outline={'none'}
                    value={tempColNo}
                    onChange={(e) => setTempColNo(e.target.value)}
                    onKeyDown={enterKeyDown}
                />
            ) : keyword === 'reqManager' ? (
                <Input
                    width={'924px'}
                    height={'36px'}
                    margin={'0 auto 0 auto'}
                    padding={'0px 12px 0px 12px'}
                    border={'1px solid #8b8b8b'}
                    placeholder={'요청 담당자를 검색하세요.'}
                    outline={'none'}
                    value={tempColReqManager}
                    onChange={(e) => setTempColReqManager(e.target.value)}
                    onKeyDown={enterKeyDown}
                />
            ) : (
                <Input
                    width={'924px'}
                    height={'36px'}
                    margin={'0 auto 0 auto'}
                    padding={'0px 12px 0px 12px'}
                    border={'1px solid #8b8b8b'}
                    placeholder={'응답 담당자를 검색하세요.'}
                    outline={'none'}
                    value={tempColResManager}
                    onChange={(e) => setTempColResManager(e.target.value)}
                    onKeyDown={enterKeyDown}
                />
            )}
            <Button
                btnName={'검색'}
                width={'144px'}
                height={'38px'}
                backgroundColor={'#8b8b8b'}
                border={'1px solid #8b8b8b'}
                textColor={'#ffffff'}
                fontWeight={'600'}
                onClick={filterSend}
            />
        </div>
    );
}
