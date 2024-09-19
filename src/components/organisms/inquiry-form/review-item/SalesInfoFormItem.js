import React, { useState } from 'react';
import {
    Container,
    Sheet,
    Opend,
    SalesInfoItem,
    LineItemInput,
    SalesInfoRow,
} from '../../../../assets/css/Form.css';
import ToggleBar from '../../../molecules/ToggleBar';

const SalesInfoForm = ({ formData }) => { // 영업 검토 조회
    if(!formData) {
        return;
    }

    // 최종 검토 내용
    const [isChecked, setCheck] = useState(true);

    const items = ['수주배경', '두께특이사항'];

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'영업검토정보'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />
                {isChecked ? (
                    <div className={Opend}>
                        <div className={SalesInfoItem}>
                            {items.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                        <div className={SalesInfoRow}>
                            <select value={formData.salesInfo.contract} className={LineItemInput}> {/* contract */}
                                <option value="CUSTOMER_RELATIONSHIP">고객협력</option>
                                <option value="MARKET_DEMAND">시장수요</option>
                            </select>

                            {/* thicknessNotify */}
                            <input
                                type="text"
                                className={LineItemInput}
                                value={formData.salesInfo.thicknessNotify}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default SalesInfoForm;
