import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColReqManager from '../molecules/ColReqManager';
import ColResManager from '../molecules/ColResManager';
import ColStatus from '../molecules/ColStatus';
import ColCreatedDate from '../molecules/ColCreatedDate';
import VocPageButton from './VocPageButton';
import { getCookie } from '../../apis/utils/cookies';
import { getQuestionByQuestionIdForManager } from '../../apis/api/question';
import { getCollaborationDetail } from '../../apis/api/collaboration';
import { Col_Table } from '../../assets/css/Voc.css';

export default function ColTable({
    collabs,
    totalPages,
    currentPage,
    setCurrentPage,
    setTimeFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setColReqFilter,
    setColResFilter,
    setProgressFilter,
}) {
    const navigate = useNavigate();

    const role = getCookie('userRole');

    const fetchGetColDetail = async (questionId, colId) => {
        try {
            const responseC = await getCollaborationDetail(questionId, colId);
            const responseQ = await getQuestionByQuestionIdForManager(
                responseC.data?.questionId,
            );
            navigate(
                `/voc-form/collaboration/res/${responseC.data.colId}/${responseC.data.questionId}`,
                {
                    state: {
                        colDetail: responseC.data,
                        questionDetail: responseQ.data,
                    },
                },
            );
        } catch (error) {
            console.error('협업 상세 조회 또는 질문 상세 조회 실패: ', error);
        }
    };

    const progressBackgroundColor = (status) => {
        switch (status) {
            case 'COMPLETE':
                return '#DBEDDB';
            case 'READY':
                return '#F5E0E9';
            case 'REFUSE':
                return '#EFEFEE';
            case 'INPROGRESS':
                return '#D3E5EF';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'READY':
                return '협업 대기';
            case 'REFUSE':
                return '협업 거절';
            case 'COMPLETE':
                return '협업 완료';
            case 'INPROGRESS':
                return '협업 수락';
        }
    };

    const [openColReqManager, setOpenColReqManager] = useState(false);
    const [openColResManager, setOpenColResManager] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openDate, setOpenDate] = useState(false);

    const titleEllipsis = {
        maxWidth: '360px',
        margin: '0 auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    return (
        <>
            <table className={Col_Table}>
                <thead>
                    <tr>
                        <th>협업 번호</th>
                        <th
                            onClick={() => {
                                role === 'sales' &&
                                    setOpenColReqManager(!openColReqManager);
                            }}
                        >
                            요청 담당자
                            {role === 'sales' && openColReqManager ? (
                                <ColReqManager
                                    setColReqFilter={setColReqFilter}
                                />
                            ) : (
                                ''
                            )}
                        </th>
                        <th
                            onClick={() => {
                                role === 'quality' &&
                                    setOpenColResManager(!openColResManager);
                            }}
                        >
                            응답 담당자
                            {role === 'quality' && openColResManager ? (
                                <ColResManager
                                    setColResFilter={setColResFilter}
                                />
                            ) : (
                                ''
                            )}
                        </th>
                        <th>요청 사유</th>
                        <th
                            onClick={() => {
                                setOpenStatus(!openStatus);
                            }}
                        >
                            협업 상태
                            {openStatus ? (
                                <ColStatus
                                    setProgressFilter={setProgressFilter}
                                />
                            ) : (
                                ''
                            )}
                        </th>
                        <th
                            onClick={() => {
                                setOpenDate(!openDate);
                            }}
                        >
                            요청일
                            {openDate ? (
                                <ColCreatedDate
                                    setTimeFilter={setTimeFilter}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                />
                            ) : (
                                ''
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {collabs.map((col, idx) => (
                        <tr
                            key={idx}
                            onClick={() => {
                                fetchGetColDetail(col.questionId, col.colId);
                            }}
                        >
                            <td>
                                {col.createdDate
                                    .substring(0, 10)
                                    .replace(/-/g, '') +
                                    col.colId.toString().padStart(3, '0')}
                            </td>
                            <td>{col.colReqManager}</td>
                            <td>{col.colResManager}</td>
                            <td>
                                <div style={titleEllipsis}>
                                    {col.colContents.replace(
                                        /<\/?[^>]+(>|$)/g,
                                        '',
                                    )}
                                </div>
                            </td>
                            <td>
                                <div
                                    style={{
                                        backgroundColor:
                                            progressBackgroundColor(
                                                col.colStatus,
                                            ),
                                    }}
                                >
                                    {getStatusLabel(col.colStatus)}
                                </div>
                            </td>
                            <td>{col.createdDate.substring(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <VocPageButton
                totalPages={totalPages}
                currentPage={currentPage}
                setPage={setCurrentPage}
            />
        </>
    );
}
