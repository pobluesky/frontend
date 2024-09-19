import React, { useState } from 'react';
import ColResFilterPanel from '../organisms/ColResFilterPannel';
import ColTable from '../organisms/ColTable';
import ColResModal from '../molecules/ColResModal';

export default function ColDashboard() {
    const [status, setStatus] = useState('READY');
    const [openModal, setOpenModal] = useState(false);
    const [questionId, setQuestionId] = useState('');
    const [colId, setColId] = useState('');
    const [height, setHeight] = useState('');
    const [auth, setAuth] = useState(true);
    const [colDetail, setColDetail] = useState([]);

    const [colNo, setColNo] = useState('');
    const [colManager, setColManager] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeFilter, setTimeFilter] = useState('');
    const [progressFilter, setProgressFilter] = useState('');

    const [searchCount, setSearchCount] = useState(0);

    return (
        <>
            <ColResFilterPanel
                searchCount={searchCount}
                colNo={colNo}
                colManager={colManager}
                startDate={startDate}
                endDate={endDate}
                setColNo={setColNo}
                setColManager={setColManager}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setTimeFilter={setTimeFilter}
                setProgressFilter={setProgressFilter}
            />
            <ColTable
                colNo={colNo}
                colManager={colManager}
                startDate={startDate}
                endDate={endDate}
                timeFilter={timeFilter}
                progressFilter={progressFilter}
                setSearchCount={setSearchCount}
                setQuestionId={setQuestionId}
                setColId={setColId}
                setStatus={setStatus}
                status={status}
                setAuth={setAuth}
                setColDetail={setColDetail}
                setHeight={setHeight}
                setOpenModal={setOpenModal}
            />
            {openModal && (
                <ColResModal
                    questionId={questionId}
                    colId={colId}
                    setStatus={setStatus}
                    status={status}
                    setHeight={setHeight}
                    height={height}
                    auth={auth}
                    colDetail={colDetail}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                />
            )}
        </>
    );
}
