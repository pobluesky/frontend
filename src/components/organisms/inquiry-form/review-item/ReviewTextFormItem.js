import React, { useState } from 'react';
import ToggleBar from '../../../molecules/ToggleBar';
import { Container, Sheet, Opend } from '../../../../assets/css/Form.css';
import ReviewTextItem from './ReviewTextItem';

const ReviewTextFormItem = ({ formData }) => { // 1차 검토 조회
    if(!formData) {
        return;
    }

    const [isChecked, setCheck] = useState(true);

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'1차검토내용'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />
                {isChecked ? (
                    <div className={Opend} style={{ padding: '3vh'}}>
                        <ReviewTextItem
                            formData={formData}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ReviewTextFormItem;
