import React from 'react';
import { QualityItemRow, QualityItemInput } from '../../../../assets/css/Form.css';

const QualityItem = ({ formData }) => { // 품질검토정보 조회
    const qualityReviewInfo = formData.qualityReviewInfo || {};

    const excludeKeys = ['fileName', 'filePath'];
    const items = Object.entries(qualityReviewInfo).filter(([key]) => !excludeKeys.includes(key));

    return (
        <div className={QualityItemRow}>
            {items.map(([key, value], index) => (
                <input
                    key={index}
                    type="text"
                    className={QualityItemInput}
                    value={value}
                />
            ))}
        </div>
    );
};

export default QualityItem;
