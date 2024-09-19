import React, { useState } from 'react';
import ToggleBar from '../../../molecules/ToggleBar';
import { Container, Sheet, Opend } from '../../../../assets/css/Form.css';
import ReviewText from './ReviewText';

const ReviewTextForm = ({ formData, handleFormDataChange }) => {
    if(!formData) {
        return;
    }

    const [isChecked, setCheck] = useState(true);

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'검토내용'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />
                {isChecked ? (
                    <div className={Opend}>
                        <ReviewText
                            title={'1차검토'}
                            width="80px"
                            height="80px"
                            formData={formData}
                            handleFormDataChange={handleFormDataChange}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ReviewTextForm;
