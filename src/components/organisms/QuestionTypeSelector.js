import React from 'react';
import Button from '../atoms/Button';
import { Question_Type_Selector } from '../../assets/css/Voc.css';

function QuestionTypeSelector({
    selectedType,
    setSelectedType,
    setOpenModal,
    inquiryId,
}) {
    const optionSelect = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className={Question_Type_Selector}>
            <div>
                {/* 1 */}
                <div>문의 유형을 선택하세요</div>
                {/* 2 */}
                <div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="inquiryType"
                                value="INQ"
                                checked={selectedType === 'INQ'}
                                onChange={optionSelect}
                            />
                        </label>
                    </div>
                    <div>Inquiry 문의</div>

                    <div>
                        <label>
                            <input
                                type="radio"
                                name="inquiryType"
                                value="SITE"
                                checked={selectedType === 'SITE'}
                                onChange={optionSelect}
                            />
                        </label>
                    </div>
                    <div>사이트 이용 문의</div>

                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                name="inquiryType"
                                value="ETC"
                                checked={selectedType === 'ETC'}
                                onChange={optionSelect}
                            />
                        </label>
                    </div>
                    <div>기타 문의</div>
                    {selectedType === 'INQ' && (
                        <>
                            <div>
                                <Button
                                    btnName={'Inquiry 조회'}
                                    width={'96px'}
                                    height={'28px'}
                                    backgroundColor={'#ffffff'}
                                    textColor={'#1748ac'}
                                    border={'1px solid #1748ac'}
                                    onClick={() => {
                                        setOpenModal(true);
                                    }}
                                />
                            </div>
                            <div>{inquiryId && `No. ${inquiryId}`}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuestionTypeSelector;
