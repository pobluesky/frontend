import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import SearchInput from '../molecules/SearchInput';
import { FilterButton } from '../atoms/VocButton';
import search from '../../assets/css/icons/voc-search.svg';
import { Collaboration_Filter_Pannel } from '../../assets/css/Voc.css';

export default function ColResFilterPanel({
    colNo,
    colManager,
    startDate,
    endDate,
    
    searchCount,
    setColNo,
    setColManager,
    setStartDate,
    setEndDate,
    setTimeFilter,
    setProgressFilter,
}) {
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const [tempColNo, setTempColNo] = useState(colNo);
    const [tempColManager, setTempColManager] = useState(colManager);
    const [tempTimeFilter, setTempTimeFilter] = useState(null);
    const [tempProgressFilter, setTempProgressFilter] = useState(null);

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            startSearch();
        }
    };

    const clickTimeFilter = (filter) => {
        setTempTimeFilter(filter);
    };

    const selectProgressFilter = (filter) => {
        setTempProgressFilter(filter);
    };

    const startSearch = () => {
        setColNo(tempColNo);
        setColManager(tempColManager);
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setTimeFilter(tempTimeFilter);
        setProgressFilter(tempProgressFilter);
    };

    return (
        <>
            <div
                className={Collaboration_Filter_Pannel}
                onKeyDown={enterKeyDown}
            >
                <div>
                    {/* 아이콘 + VoC 협업 조회 */}
                    <div>
                        <img src={search} />
                        <div>VoC 협업 조회</div>
                    </div>

                    {/* 문의 제목 + 문의 등록일 + 조회 버튼 */}
                    <div>
                        <div>
                            <div>협업 번호</div>
                            <SearchInput
                                width={'144px'}
                                height={'24px'}
                                border={'solid 1px #c1c1c1'}
                                borderRadius={'8px'}
                                outline={'none'}
                                padding={'0 8px 0 8px'}
                                btnHeight={'24px'}
                                value={tempColNo}
                                onChange={(e) => setTempColNo(e.target.value)}
                            />
                            <div>협업 담당자</div>
                            <SearchInput
                                width={'144px'}
                                height={'24px'}
                                border={'solid 1px #c1c1c1'}
                                borderRadius={'8px'}
                                outline={'none'}
                                padding={'0 8px 0 8px'}
                                btnHeight={'24px'}
                                value={tempColManager}
                                onChange={(e) => setTempColManager(e.target.value)}
                            />
                            <Button
                                btnName={'조회'}
                                width={'84px'}
                                height={'28px'}
                                margin={'0 0 0 24px'}
                                backgroundColor={'#03507d'}
                                textColor={'#ffffff'}
                                border={'none'}
                                borderRadius={'20px'}
                                onClick={startSearch}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>문의 등록일</div>
                            <Input
                                type={'date'}
                                width={'144px'}
                                height={'24px'}
                                border={'solid 1px #c1c1c1'}
                                borderRadius={'8px'}
                                outline={'none'}
                                padding={'0 8px 0 8px'}
                                value={tempStartDate}
                                onChange={(e) => setTempStartDate(e.target.value)}
                            />
                            <div>~</div>
                            <Input
                                type={'date'}
                                width={'144px'}
                                height={'24px'}
                                border={'solid 1px #c1c1c1'}
                                borderRadius={'8px'}
                                outline={'none'}
                                padding={'0 8px 0 8px'}
                                value={tempEndDate}
                                onChange={(e) => setTempEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 정렬 버튼 */}
                    <div>
                        <div>정렬 조건</div>
                        <FilterButton
                            btnName={'최신순'}
                            width={'84px'}
                            onClick={() => clickTimeFilter('LATEST')}
                            backgroundColor={
                                tempTimeFilter === 'LATEST'
                                    ? '#03507d'
                                    : '#ffffff'
                            }
                            textColor={
                                tempTimeFilter === 'LATEST'
                                    ? '#ffffff'
                                    : '#000000'
                            }
                        />
                        <FilterButton
                            btnName={'과거순'}
                            width={'84px'}
                            margin={'0 12px 0 0'}
                            onClick={() => clickTimeFilter('OLDEST')}
                            backgroundColor={
                                tempTimeFilter === 'OLDEST'
                                    ? '#03507d'
                                    : '#ffffff'
                            }
                            textColor={
                                tempTimeFilter === 'OLDEST'
                                    ? '#ffffff'
                                    : '#000000'
                            }
                        />
                        <select
                            name="progress"
                            id="progress"
                            onChange={(e) =>
                                selectProgressFilter(e.target.value)
                            }
                        >
                            <option value="" disabled selected>
                                진행 현황
                            </option>
                            <option value="READY">협업 대기</option>
                            <option value="INPROGRESS">협업 진행 중</option>
                            <option value="REFUSE">협업 거절</option>
                            <option value="COMPLETE">협업 완료</option>
                        </select>
                    </div>

                    {/* 검색 결과 개수 */}
                    <div>
                        검색 결과: 총 <div>{searchCount}</div>건
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}
