import React, { useState } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
    Wrapper,
    _Input,
    inputWrapper,
} from '../../../assets/css/Form.css';

const ManagerBasicInfoForm = ({ formData }) => {
    if(!formData) {
        return;
    }

    const {
        corporate,
        corporationCode,
        country,
        customerRequestDate,
        industry,
        inquiryType,
        productType,
        salesPerson,
        customerCode,
        customerName,
        name,
        email,
        phone
    } = formData;


    const [isChecked, setCheck] = useState(true);

    return (
        <div className={Container} style={{ marginTop: '2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'기본정보'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />
                {isChecked ? (
                    <div className={Opend}>
                        <div className={Wrapper}>
                            {/* 1행 */}
                            <div className={inputWrapper}>
                                <label>고객사명</label> {/* customerName */}
                                <input
                                    type="text"
                                    className={_Input}
                                    value={customerName}
                                    readOnly={true}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>국가</label>
                                <select className={_Input} value={country} aria-readonly={true}>
                                    <option value="" disabled>
                                        선택
                                    </option>
                                    <option value="USA">미국</option>
                                    <option value="CANADA">캐나다</option>
                                    <option value="KOREA">한국</option>
                                    <option value="JAPAN">일본</option>
                                    <option value="CHINA">중국</option>
                                    <option value="GERMANY">독일</option>
                                    <option value="FRANCE">프랑스</option>
                                </select>
                            </div>
                            <div className={inputWrapper}>
                                <label>판매상사</label>
                                <input
                                    type="text"
                                    className={_Input}
                                    placeholder="POA"
                                    value={corporate}
                                    readOnly={true}
                                />
                            </div>

                            {/* 2행 */}
                            <div className={inputWrapper}>
                                <label>판매계약자</label>
                                <input
                                    type="text"
                                    className={_Input}
                                    value={salesPerson}
                                    readOnly={true}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>Inquiry 유형</label>
                                <select className={_Input} value={inquiryType} aria-readonly={true}>
                                    <option value="" disabled>
                                        문의유형
                                    </option>
                                    <option value="COMMON_INQUIRY">
                                        품질 + 견적
                                    </option>
                                    <option value="QUOTE_INQUIRY">견적</option>
                                </select>
                            </div>
                            <div className={inputWrapper}>
                                <label>산업분류</label>
                                <select className={_Input} value={industry} aria-readonly={true}>
                                    <option value="" disabled>
                                        선택
                                    </option>
                                    <option value="AUTOMOBILE">
                                        Automobile
                                    </option>
                                    <option value="CONSTRUCTION">
                                        Construction
                                    </option>
                                    <option value="DISTRIBUTION">
                                        Distribution
                                    </option>
                                    <option value="ELECTRIC">Electric</option>
                                    <option value="FURNITURE">Furniture</option>
                                    <option value="PLATING">Plating</option>
                                    <option value="HIGH_CARBON">
                                        High-Carbon
                                    </option>
                                    <option value="KITCHEN">Kitchen</option>
                                    <option value="LOW_CARBON">
                                        Low-Carbon
                                    </option>
                                    <option value="MARCHINERY">
                                        Machinery
                                    </option>
                                    <option value="PIPE">Pipe</option>
                                    <option value="REROLLING">Rerolling</option>
                                    <option value="SHIPBUILDING">
                                        Shipbuilding
                                    </option>
                                    <option value="TRANSPORTATION">
                                        Transportation
                                    </option>
                                    <option value="VESSEL">Vessel</option>
                                    <option value="BEAM">Beam</option>
                                    <option value="OTHER">Others</option>
                                </select>
                            </div>

                            {/* 3행 */}
                            <div className={inputWrapper}>
                                <label>의뢰인명</label>
                                <input
                                    type="text"
                                    className={_Input}
                                    value={name}
                                    readOnly={true}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>의뢰인 E-mail</label>
                                <input
                                    type="email"
                                    className={_Input}
                                    value={email}
                                    readOnly={true}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>의뢰인 연락처</label>
                                <input
                                    type="tel"
                                    className={_Input}
                                    value={phone}
                                    readOnly={true}
                                />
                            </div>

                            {/* 4행 */}
                            <div className={inputWrapper}>
                                <label>법인코드</label>
                                <input
                                    type="text"
                                    className={_Input}
                                    placeholder="(주)포스코"
                                    value={corporationCode}
                                    readOnly={true}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>제품</label>
                                <select className={_Input} value={productType} aria-readonly={true}>
                                    <option value="" disabled>
                                        선택
                                    </option>
                                    <option value="CAR">자동차</option>
                                    <option value="HOT_ROLLED">열연</option>
                                    <option value="COLD_ROLLED">냉연</option>
                                    <option value="THICK_PLATE">후판</option>
                                    <option value="WIRE_ROD">선재</option>
                                </select>
                            </div>
                            <div className={inputWrapper}>
                                <label>고객요청일자</label>
                                <input
                                    type="date"
                                    className={_Input}
                                    value={customerRequestDate}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ManagerBasicInfoForm;
