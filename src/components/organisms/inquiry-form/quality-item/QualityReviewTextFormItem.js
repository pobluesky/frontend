import React from 'react';
import { Container, Sheet, Opend, QualityItemColumn } from '../../../../assets/css/Form.css';
import ToggleBar from '../../../molecules/ToggleBar';
import QualityItem from './QualityItem';
import QualityTextItem from './QualityTextItem';

const QualityReviewTextFormItem = ({ formData }) => { // 품질검토정보 조회
  const isDataAvailable = formData && Object.keys(formData).length > 0;

  const defaultFormData = {
    finalResult: '',
    finalResultDetails: '',
    standard: '',
    orderCategory: '',
    coatingMetalQuantity: '',
    coatingOilQuantity: '',
    thicknessTolerance: '',
    orderEdge: '',
    customerQReq: '',
    availableLab: '',
  };

  const defaultComments = {
    qualityComments: ''
  }

  const dataToDisplay = isDataAvailable ? formData : defaultFormData;
  const commentsToDisplay = isDataAvailable? formData : defaultComments;

  const lineItems = {
    '종합결과': dataToDisplay.finalResult,
    '종합결과세부사항': dataToDisplay.finalResultDetails,
    '제품규격': dataToDisplay.standard,
    '주문용도': dataToDisplay.orderCategory,
    '도금량(코드)': dataToDisplay.coatingMetalQuantity,
    '도유량(코드)': dataToDisplay.coatingOilQuantity,
    '두께공차': dataToDisplay.thicknessTolerance,
    '주문edge': dataToDisplay.orderEdge,
    '고객품질요구사항': dataToDisplay.customerQReq,
    '생산가능소구분': dataToDisplay.availableLab,
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
            <QualityTextItem
                title={'품질검토내용'}
                width="115px"
                height="100px"
                content={commentsToDisplay.qualityComments}
            />

            {/* 컬럼 라벨 */}
            <div className={QualityItemColumn}>
              {Object.entries(lineItems).map(([label, value], index) => (
                  <div key={index}>
                    {label}
                  </div>
              ))}
            </div>
            <QualityItem formData={dataToDisplay} />
          </div>
        </div>
      </div>
  );
};

export default QualityReviewTextFormItem;
