import React, { useState } from 'react';
import ToggleBar from '../../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
    _TextArea,
} from '../../../../assets/css/Form.css';

const FinalReviewTextFormItem = ({ formData }) => {
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
                />
                {isChecked ? (
                    <div className={Opend}>
                        <textarea
                            className={_TextArea}
                            placeholder="내용을 입력해 주세요"
                            wrap="hard"
                            value={finalReviewText}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FinalReviewTextFormItem;
