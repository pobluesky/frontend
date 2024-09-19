import React, { useState, useEffect, useRef } from 'react';
import dompurify from 'dompurify';
import Input from '../atoms/Input';
import TextEditor from '../atoms/TextEditor';
import { ColReqResButton } from '../atoms/VocButton';
import {
    Col_Res_Modal_Container,
    Col_Res_Modal,
} from '../../assets/css/Voc.css';
import {
    putDecisionByQuality,
    putCompleteByQuality,
} from '../../apis/api/collaboration';
import { ColDoneAlert } from '../../utils/actions';
import { getCookie } from '../../apis/utils/cookies';

const sanitizer = dompurify.sanitize;

export default function ColResModal({
    colId,
    setStatus,
    status,
    setHeight,
    height,
    auth,
    colDetail,
    setOpenModal,
}) {
    const role = getCookie('userRole');

    const [colStatus, setColStatus] = useState('');
    const [editorValue, setEditorValue] = useState('');
    const [colReply, setColReply] = useState('');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [filePath, setFilePath] = useState('');

    const [tryAccept, isAccepting] = useState(false); // 협업 수락 버튼 클릭 후 수락 내용 작성 중
    const [tryReject, isRejecting] = useState(false); // 협업 거절 버튼 클릭 후 거절 내용 작성 중

    const [showDoneAlert, canShowDoneAlert] = useState(false);
    const [message, setMessage] = useState('');

    const fileInputRef = useRef(null);

    // 협업 진행 상황별로 모달창 높이 조절
    useEffect(() => {
        if (tryAccept || tryReject) {
            setHeight('85vh');
        }
    }, [tryAccept, tryReject]);

    const attachFile = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // 협업 수락, 협업 거절
    const fetchPutCol = async (isAccepted) => {
        try {
            const colData = {
                colReqId: colDetail.colManagerFromResponseDto.userId,
                colResId: colDetail.colManagerToResponseDto.userId,
                colReply: editorValue,
                isAccepted: isAccepted,
            };
            const response = await putDecisionByQuality(file, colId, colData);
            // 협업 수락 또는 거절 후 갱신되는 데이터
            setStatus(response.data.colStatus);
            setColStatus(response.data.colStatus);
            setColReply(response.data.colReply);
            setFileName(response.data.fileName);
            setFilePath(response.data.filePath);
            if (response.data.colStatus === 'REFUSE') {
                setMessage('협업이 거절되었습니다.');
            } else {
                setMessage('협업이 수락되었습니다.');
            }
            canShowDoneAlert(true);
            isRejecting(true);
        } catch (error) {
            console.error('협업 수락/거절 실패: ', error);
        }
    };

    // 협업 완료 (수락한 경우에만 가능, 품질 담당자만 가능)
    const fetchPutColDone = async () => {
        try {
            const response = await putCompleteByQuality(colId);
            setStatus(response.data.colStatus);
            setColStatus(response.data.colStatus);
            setMessage('협업이 완료되었습니다.');
            canShowDoneAlert(true);
            isAccepting(false);
            isRejecting(false);
        } catch (error) {
            console.error('협업 완료 실패: ', error);
        }
    };

    const filesEllipsis = {
        maxWidth: '144px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    return (
        <div className={Col_Res_Modal_Container}>
            <div className={Col_Res_Modal} style={{ height }}>
                {/* 고객사 정보, 협업 요청 사유, 고객사 첨부파일 */}
                <div>
                    <div>담당자</div>
                    <div>{colDetail.colManagerFromResponseDto.name}</div>
                    <div>{colDetail.colManagerFromResponseDto.empNo}</div>
                    <div>{colDetail.colManagerFromResponseDto.department}</div>
                </div>
                <div>협업 요청 사유</div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: sanitizer(
                            `${colDetail.colContents || colContents}`,
                        ),
                    }}
                ></div>
                <div>
                    <div>고객사 첨부파일</div>
                    <div>
                        <a href={colDetail.vocFilePath}>
                            {colDetail.vocFileName}
                        </a>
                    </div>
                </div>
                {/* 협업 수락에 대한 피드백 작성란 */}
                {status === 'READY' && tryAccept && (
                    <>
                        <div>협업 요청 피드백</div>
                        <div>
                            <TextEditor
                                margin={'0 3vw 0 3vw'}
                                inputHeight={'20vh'}
                                border={'1px solid #8b8b8b'}
                                value={editorValue}
                                onChange={setEditorValue}
                            />
                        </div>
                    </>
                )}
                {/* 협업 거절에 대한 사유 작성란 */}
                {status === 'READY' && tryReject && (
                    <>
                        <div>협업 거절 사유</div>
                        <div>
                            <TextEditor
                                margin={'0 3vw 0 3vw'}
                                inputHeight={'20vh'}
                                border={'1px solid #8b8b8b'}
                                value={editorValue}
                                onChange={setEditorValue}
                            />
                        </div>
                    </>
                )}
                {/* 피드백 작성 완료 */}
                {status !== 'READY' && (
                    <>
                        <div>
                            {status === 'REFUSE' ? (
                                <div>협업 거절 사유</div>
                            ) : (
                                <div>협업 수락 피드백</div>
                            )}
                        </div>
                        <div>
                            <div
                                style={{
                                    width: '62vw',
                                    height: '24vh',
                                    margin: '0 3vw 0 3vw',
                                    padding: '1vh 1vw 1vh 1vw',
                                    color: '#212121',
                                    border: '1px solid #8b8b8b',
                                    borderRadius: '12px',
                                    overflowY: 'auto',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizer(
                                        `${colDetail.colReply || colReply}`,
                                    ),
                                }}
                            />
                        </div>
                    </>
                )}
                {/* 버튼 그룹 */}
                <div>
                    {(status !== 'READY' || tryAccept !== tryReject) &&
                        role === 'quality' && (
                            <>
                                <div>담당자 첨부파일</div>
                                <div style={filesEllipsis}>
                                    {colDetail.filePath || filePath ? (
                                        <a
                                            href={
                                                colDetail.filePath || filePath
                                            }
                                            download
                                        >
                                            {file?.name ||
                                                colDetail.fileName ||
                                                fileName ||
                                                ''}
                                        </a>
                                    ) : (
                                        file?.name ||
                                        colDetail.fileName ||
                                        fileName ||
                                        ''
                                    )}
                                </div>
                            </>
                        )}
                    <ColReqResButton
                        btnName={'닫기'}
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        margin={'0 0 1vh 0'}
                    />
                    {/* 협업 거절 + 협업 수락 */}
                    {auth &&
                        !tryAccept &&
                        !tryReject &&
                        role === 'quality' &&
                        status === 'READY' && (
                            <>
                                <ColReqResButton
                                    btnName={'협업 거절'}
                                    onClick={() => {
                                        isRejecting(true);
                                    }}
                                    margin={'0 1vw 1vh 0'}
                                />
                                <ColReqResButton
                                    btnName={'협업 수락'}
                                    onClick={() => {
                                        isAccepting(true);
                                    }}
                                    margin={'0 1vw 1vh 0'}
                                />
                            </>
                        )}
                    {/* 협업 수락 피드백 작성 중 */}
                    {status === 'READY' && tryAccept && role === 'quality' && (
                        <>
                            <ColReqResButton
                                btnName={'피드백 등록'}
                                onClick={() => {
                                    fetchPutCol(true);
                                }}
                                margin={'0 1vw 1vh 0'}
                            />
                            <Input
                                type="file"
                                display={'none'}
                                ref={fileInputRef}
                                onChange={attachFile}
                            />
                            {file ? (
                                <ColReqResButton
                                    btnName={'파일 삭제'}
                                    onClick={() => setFile(null)}
                                    margin={'0 1vw 1vh 0'}
                                />
                            ) : (
                                <ColReqResButton
                                    btnName={'파일 업로드'}
                                    onClick={() => {
                                        fileInputRef.current.click();
                                    }}
                                    margin={'0 1vw 1vh 0'}
                                />
                            )}
                        </>
                    )}
                    {/* 협업 거절 사유 작성 중 */}
                    {status === 'READY' && tryReject && role === 'quality' && (
                        <>
                            <ColReqResButton
                                btnName={'사유 등록'}
                                onClick={() => {
                                    fetchPutCol(false);
                                }}
                                margin={'0 1vw 1vh 0'}
                            />
                            <Input
                                type="file"
                                display={'none'}
                                ref={fileInputRef}
                                onChange={attachFile}
                            />
                            {file ? (
                                <ColReqResButton
                                    btnName={'파일 삭제'}
                                    onClick={() => setFile(null)}
                                    margin={'0 1vw 1vh 0'}
                                />
                            ) : (
                                <ColReqResButton
                                    btnName={'파일 업로드'}
                                    onClick={() => {
                                        fileInputRef.current.click();
                                    }}
                                    margin={'0 1vw 1vh 0'}
                                />
                            )}
                        </>
                    )}
                    {/* 협업 수락 피드백 등록 후 */}
                    {status === 'INPROGRESS' && (
                        <>
                            <ColReqResButton
                                btnName={'협업 완료'}
                                onClick={() => {
                                    fetchPutColDone();
                                }}
                                margin={'0 1vw 1vh 0'}
                            />
                        </>
                    )}
                </div>
            </div>
            <ColDoneAlert
                showAlert={showDoneAlert}
                onClose={() => {
                    canShowDoneAlert(false);
                }}
                message={message}
                inert
            />
        </div>
    );
}
