import React from 'react';
import { QualityItemRow } from '../../../../assets/css/Form.css';
import { TextField } from '@mui/material';

const QualityForm = ({ formData, handleFormDataChange, register, errors }) => { // 품질검토정보 작성
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
                {...register('finalResult', { required: true })}
                error={!!errors.finalResult}
            />
            <TextField
                {...inputStyle}
                value={finalResultDetails}
                onChange={(e) => handleFormDataChange('finalResultDetails', e.target.value)}
                {...register('finalResultDetails', { required: true })}
                error={!!errors.finalResultDetails}
            />
            <TextField
                {...inputStyle}
                value={standard}
                onChange={(e) => handleFormDataChange('standard', e.target.value)}
                {...register('standard', { required: true })}
                error={!!errors.standard}
            />
            <TextField
                {...inputStyle}
                value={orderCategory}
                onChange={(e) => handleFormDataChange('orderCategory', e.target.value)}
                {...register('orderCategory', { required: true })}
                error={!!errors.orderCategory}
            />
            <TextField
                {...inputStyle}
                value={coatingMetalQuantity}
                onChange={(e) => handleFormDataChange('coatingMetalQuantity', e.target.value)}
                {...register('coatingMetalQuantity', { required: true })}
                error={!!errors.coatingMetalQuantity}
            />
            <TextField
                {...inputStyle}
                value={coatingOilQuantity}
                onChange={(e) => handleFormDataChange('coatingOilQuantity', e.target.value)}
                {...register('coatingOilQuantity', { required: true })}
                error={!!errors.coatingOilQuantity}
            />
            <TextField
                {...inputStyle}
                value={thicknessTolerance}
                onChange={(e) => handleFormDataChange('thicknessTolerance', e.target.value)}
                {...register('thicknessTolerance', { required: true })}
                error={!!errors.thicknessTolerance}
            />
            <TextField
                {...inputStyle}
                value={orderEdge}
                onChange={(e) => handleFormDataChange('orderEdge', e.target.value)}
                {...register('orderEdge', { required: true })}
                error={!!errors.orderEdge}
            />
            <TextField
                {...inputStyle}
                value={customerQReq}
                onChange={(e) => handleFormDataChange('customerQReq', e.target.value)}
                {...register('customerQReq', { required: true })}
                error={!!errors.customerQReq}
            />
            <TextField
                {...inputStyle}
                value={availableLab}
                onChange={(e) => handleFormDataChange('availableLab', e.target.value)}
                {...register('availableLab', { required: true })}
                error={!!errors.availableLab}
            />
        </div>
    );
};

export default QualityForm;
