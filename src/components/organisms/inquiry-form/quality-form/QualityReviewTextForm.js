import React from 'react';
import { Container, Sheet, Opend, QualityItemColumn } from '../../../../assets/css/Form.css';
import ToggleBar from '../../../molecules/ToggleBar';
import QualityText from '../quality-form/QualityText';
import QualityForm from '../quality-form/QualityForm';

const QualityReviewTextForm = ({ formData, handleFormDataChange }) => { // 품질검토 작성

    const lineItems = {
        '종합결과': '',
        '종합결과세부사항': '',
        '제품규격': '',
        '주문용도': '',
        '도금량(코드)': '',
        '도유량(코드)': '',
        '두께공차': '',
        '주문edge': '',
        '고객품질요구사항': '',
        '생산가능소구분': '',
    };

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'품질검토정보'}
                    isChecked={true}
                    setCheck={() => {}}
                />
                <div className={Opend}>
                    <QualityText
                        title={'품질검토내용'}
                        width="115px"
                        height="100px"
                        formData={formData}
                        handleFormDataChange={handleFormDataChange}
                    />

                    {/* 컬럼 라벨 */}
                    <div className={QualityItemColumn}>
                        {Object.entries(lineItems).map(([label, value], index) => (
                            <div key={index}>
                                {label}
                            </div>
                        ))}
                    </div>
                    <QualityForm formData={formData} handleFormDataChange={handleFormDataChange} />
                </div>
            </div>
        </div>
    );
};

export default QualityReviewTextForm;
