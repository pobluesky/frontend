import React, { useEffect, useState } from 'react';
import {
    Container,
    Sheet,
    Opend,
    buttonWrapper,
} from '../../../assets/css/Form.css';
import ToggleBar from '../../molecules/ToggleBar';
import { Button } from '@mui/material';
import FileItem from '../../molecules/FileItem';

const FileForm = ({ fileForm, formData, handleFormDataChange, onRefFile }) => {
    const [isChecked, setCheck] = useState(true);
    const [files, setFiles] = useState(formData.files || []);
    const [inputKey, setInputKey] = useState(Date.now());

    const btnName = ['파일업로드', '파일삭제'];

    const onResetFiles = () => {
        setFiles([]);
        handleFormDataChange('files', []);
        setInputKey(Date.now());
    }

    useEffect(() => {
        if (onRefFile) {
            onRefFile(onResetFiles);
        }
    }, [onRefFile]);

    const handleFileUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const updatedFiles = [...selectedFiles];
        setFiles(updatedFiles);
        handleFormDataChange('files', updatedFiles[0]);
        event.target.value = null;
    };

    const handleFileDelete = () => {
        setFiles([]);
        handleFormDataChange('files', []);
        setInputKey(Date.now());
    };

    const isUploadSection = fileForm === '파일첨부' || fileForm === '첨부파일';

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={fileForm}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />
                {isChecked ? (
                    <div className={Opend}>
                        {isUploadSection ? (
                            <div>
                                <div className={buttonWrapper}>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                        id="fileUploadInput"
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            document
                                            .getElementById(
                                                'fileUploadInput',
                                            )
                                            .click()
                                        }
                                        sx={{
                                            margin: '-0.5vw 0 0 1vw',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #03507d',
                                            color: '#03507d',
                                            borderRadius: '7px',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#03507d',
                                                color: '#FFFFFF',
                                            },
                                        }}
                                    >
                                        {btnName[0]}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleFileDelete}
                                        sx={{
                                            margin: '-0.5vw -1vw 0 0.6vw',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #03507d',
                                            color: '#03507d',
                                            borderRadius: '7px',
                                            fontSize: '17px',
                                            fontWeight: '500',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#03507d',
                                                color: '#FFFFFF',
                                            },
                                        }}
                                    >
                                        {btnName[1]}
                                    </Button>
                                </div>
                                {/* 파일 목록 */}
                                <FileItem
                                    inquiryId={formData.inquiryId}
                                    files={files}
                                />
                            </div>
                        ) : (
                            <div>
                                {/* 첨부파일의 경우 */}
                                <FileItem
                                    files={files}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FileForm;
