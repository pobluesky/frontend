import React, { useState } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
    _TextArea,
} from '../../../assets/css/Form.css';

const AdditionalRequestForm = ({ formData, handleFormDataChange, readOnly }) => {
    if(!formData) {
        return;
    }

    // 추가요청사항
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
                    <div className={Opend}>
                        <textarea
                            className={_TextArea}
                            placeholder="내용을 입력해 주세요"
                            wrap="hard"
                            value={additionalRequests}
                            readOnly={readOnly}
                            onChange={(e) =>
                                handleFormDataChange(
                                    'additionalRequests',
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default AdditionalRequestForm;
