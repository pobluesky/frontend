import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuestionViewer from '../organisms/QuestionViewer';
import ColReqViewer from '../organisms/ColReqViewer';
import ColResInput from '../organisms/ColResInput';
import ColResViewer from '../organisms/ColResViewer';
import { getCookie } from '../../apis/utils/cookies';
import { getFileDownloadUrl } from '../../apis/api/file';

export default function ColResForm() {
    const role = getCookie('userRole');

    const location = useLocation();
    const questionDetail =
        location.state?.questionDetail ||
        JSON.parse(sessionStorage.getItem('questionDetail'));
    const initialColDetail =
        location.state?.colDetail ||
        JSON.parse(sessionStorage.getItem('colDetail'));
    const [colDetail, setColDetail] = useState(() => {
        const savedColDetail = localStorage.getItem('colDetail');
        return savedColDetail ? JSON.parse(savedColDetail) : initialColDetail;
    });

    const [editMode, setEditMode] = useState(false);

    const [secretPathQuestion, setSecretPathQuestion] = useState('');
    const [secretPathCol, setSecretPathCol] = useState('');

    const fetchSecretFile = async (data, setPathFunction) => {
        if (data?.filePath != null) {
            const response = await getFileDownloadUrl(data.filePath);
            setPathFunction(response);
        }
    };

    useEffect(() => {
        fetchSecretFile(questionDetail, setSecretPathQuestion);
    }, [questionDetail]);

    useEffect(() => {
        fetchSecretFile(colDetail, setSecretPathCol);
    }, [colDetail]);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        if (colDetail) {
            localStorage.setItem('colDetail', JSON.stringify(colDetail));
        }
    }, [colDetail]);

    useEffect(() => {
        if (location.state?.questionDetail) {
            sessionStorage.setItem(
                'questionDetail',
                JSON.stringify(location.state.questionDetail),
            );
        }
    }, [location.state]);

    return (
        <div>
            <QuestionViewer
                questionDetail={questionDetail}
                secretPath={secretPathQuestion}
            />
            <ColReqViewer
                colDetail={colDetail}
                questionDetail={questionDetail}
            />
            {colDetail.colStatus !== 'READY' && !editMode ? (
                <ColResViewer
                    colDetail={colDetail}
                    setEditMode={setEditMode}
                    setColDetail={setColDetail}
                    secretPathCol={secretPathCol}
                />
            ) : role === 'quality' ? (
                <ColResInput
                    colDetail={colDetail}
                    setColDetail={setColDetail}
                    secretPathCol={secretPathCol}
                />
            ) : (
                ''
            )}
        </div>
    );
}
