import React from 'react';
import { _FileItem, _FileName, _FileNameColumn } from '../../assets/css/Form.css';

const FileItem = ({ files }) => {
    return (
        <div className={_FileItem}>
            {files.length === 1 ? (
                files.map((file, index) => {
                    return (
                        <div style={{ display: 'flex', marginLeft: '25px' }}>
                            <div className={_FileNameColumn}>첨부파일명</div>
                            |
                        <div key={index} className={_FileName}>
                            {file.name}
                        </div>
                        </div>
                    );
                })
            ) : (
                <div style={{ display: 'flex', marginLeft: '25px' }}>
                    <div className={_FileNameColumn}>첨부파일명</div>
                    |
                <div style={{ marginLeft: '30px' }}>파일 없음</div>
                </div>
            )}
        </div>
    );
};

export default FileItem;
