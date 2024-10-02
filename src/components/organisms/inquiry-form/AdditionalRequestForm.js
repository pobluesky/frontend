import React, { useState } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
} from '../../../assets/css/Form.css';
import { TextField } from '@mui/material';

const AdditionalRequestForm = ({ formData, handleFormDataChange, readOnly }) => {
    if (!formData) {
        return null;
    }

    const [isChecked, setCheck] = useState(true);
    const { additionalRequests } = formData;

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'추가요청내용'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />
                {isChecked ? (
                    <div className={Opend} style={{ padding: '3vh'}}>
                        <TextField
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="내용을 입력해 주세요"
                            value={additionalRequests}
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            onChange={(e) =>
                                handleFormDataChange(
                                    'additionalRequests',
                                    e.target.value,
                                )
                            }
                            fullWidth
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AdditionalRequestForm;
