import React from 'react';
import { QualityItemRow, QualityItemInput } from '../../../../assets/css/Form.css';

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

    return (
        <div className={QualityItemRow}>
            <input
                type="text"
                className={QualityItemInput}
                value={finalResult}
                onChange={(e) => handleFormDataChange(
                    'finalResult',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={finalResultDetails}
                onChange={(e) => handleFormDataChange(
                    'finalResultDetails',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={standard}
                onChange={(e) => handleFormDataChange(
                    'standard',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={orderCategory}
                onChange={(e) => handleFormDataChange(
                    'orderCategory',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={coatingMetalQuantity}
                onChange={(e) => handleFormDataChange(
                    'coatingMetalQuantity',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={coatingOilQuantity}
                onChange={(e) => handleFormDataChange(
                    'coatingOilQuantity',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={thicknessTolerance}
                onChange={(e) => handleFormDataChange(
                    'thicknessTolerance',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={orderEdge}
                onChange={(e) => handleFormDataChange(
                    'orderEdge',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={customerQReq}
                onChange={(e) => handleFormDataChange(
                    'customerQReq',
                    e.target.value,
                )}
            />
            <input
                type="text"
                className={QualityItemInput}
                value={availableLab}
                onChange={(e) => handleFormDataChange(
                    'availableLab',
                    e.target.value,
                )}
            />
        </div>
    );
};

export default QualityForm;
