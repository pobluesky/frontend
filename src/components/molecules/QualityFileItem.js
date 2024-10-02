import React from 'react';
import { _FileItem, _FileName, _FileNameColumn } from '../../assets/css/Form.css';

const QualityFileItem = ({ qualityFiles }) => {
    return (
        <div className={_FileItem}>
            {qualityFiles.length === 1 ? (
                qualityFiles.map((file, index) => {
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

export default QualityFileItem;