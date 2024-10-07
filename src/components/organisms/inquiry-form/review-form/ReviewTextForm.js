import React, { useState } from 'react';
import ToggleBar from '../../../molecules/ToggleBar';
import { Container, Sheet, Opend } from '../../../../assets/css/Form.css';
import ReviewText from './ReviewText';

const ReviewTextForm = ({
    formData,
    handleFormDataChange,
    register,
    errors,
}) => {
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
                    <div className={Opend} style={{ padding: '3vh' }}>
                        <ReviewText
                            formData={formData}
                            handleFormDataChange={handleFormDataChange}
                            register={register}
                            errors={errors}
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
