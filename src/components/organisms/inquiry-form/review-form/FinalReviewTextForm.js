import React, { useState } from 'react';
import ToggleBar from '../../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
    _TextArea,
} from '../../../../assets/css/Form.css';
import { TextField } from '@mui/material';

const FinalReviewTextForm = ({
    formData,
    handleFormDataChange,
    handleIsPreview,
    isPreviewData,
}) => {
    if(!formData) {
        return;
    }

    const {
        finalReviewText
    } = formData;

    const [isChecked, setCheck] = useState(true);

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'최종검토내용'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                    handleIsPreview={handleIsPreview}
                    isPreviewData={isPreviewData}
                />
                {isChecked ? (
                    <div className={Opend} style={{ padding: '3vh'}}>
                        <TextField
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="내용을 입력해 주세요"
                            value={finalReviewText}
                            onChange={(e) =>
                                handleFormDataChange(
                                    'finalReviewText',
                                    e.target.value
                                )}
                            fullWidth
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FinalReviewTextForm;
