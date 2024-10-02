import React from 'react';
import { QualityItemRow } from '../../../../assets/css/Form.css';
import { TextField } from '@mui/material';

const QualityForm = ({ formData, handleFormDataChange }) => { // 품질검토정보 작성
    const {
        finalResult,
        finalResultDetails,
        standard,
        orderCategory,
        coatingMetalQuantity,
        coatingOilQuantity,
        thicknessTolerance,
        orderEdge,
        customerQReq,
        availableLab,
    } = formData;

    const excludeKeys = ['fileName', 'filePath'];
    const items = Object.entries(formData).filter(([key]) => !excludeKeys.includes(key));

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
            <TextField
                {...inputStyle}
                value={finalResult}
                onChange={(e) => handleFormDataChange('finalResult', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={finalResultDetails}
                onChange={(e) => handleFormDataChange('finalResultDetails', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={standard}
                onChange={(e) => handleFormDataChange('standard', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={orderCategory}
                onChange={(e) => handleFormDataChange('orderCategory', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={coatingMetalQuantity}
                onChange={(e) => handleFormDataChange('coatingMetalQuantity', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={coatingOilQuantity}
                onChange={(e) => handleFormDataChange('coatingOilQuantity', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={thicknessTolerance}
                onChange={(e) => handleFormDataChange('thicknessTolerance', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={orderEdge}
                onChange={(e) => handleFormDataChange('orderEdge', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={customerQReq}
                onChange={(e) => handleFormDataChange('customerQReq', e.target.value)}
            />
            <TextField
                {...inputStyle}
                value={availableLab}
                onChange={(e) => handleFormDataChange('availableLab', e.target.value)}
            />
        </div>
    );
};

export default QualityForm;
