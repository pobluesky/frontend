import React from 'react';
import { QualityItemRow, QualityItemInput } from '../../../../assets/css/Form.css';
import { TextField } from '@mui/material';

const QualityItem = ({ formData }) => { // 품질검토정보 조회
    const qualityReviewInfo = formData.qualityReviewInfo || {};

    const excludeKeys = ['fileName', 'filePath'];
    const items = Object.entries(qualityReviewInfo).filter(([key]) => !excludeKeys.includes(key));

    const inputStyle = {
        inputProps: {
            style: { color: '#000000', fontWeight: '500', height: '10px' },
        },
        variant: "outlined",
        fullWidth: true,
        margin: 'normal',
    };

    return (
        <div className={QualityItemRow}>
            {items.map(([key, value], index) => (
                <TextField
                    key={index}
                    value={value}
                    {...inputStyle}
                />
            ))}
        </div>
    );
};

export default QualityItem;
