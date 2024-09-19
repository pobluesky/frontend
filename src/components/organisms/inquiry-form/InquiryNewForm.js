import React, {useState} from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
    Wrapper,
    _Input,
    inputWrapper,
} from '../../../assets/css/Form.css';

const InquiryNewForm = ({ formData, handleFormDataChange, register, errors, title }) => {
    const {
        customerCode,
        customerName,
        name,
        email,
        phone,
        country,
        corporate,
        salesPerson,
        inquiryType,
        industry,
        corporationCode,
        productType,
        customerRequestDate,
    } = formData;
    const [isChecked, setCheck] = useState(true);

    return (
        <div className={Container}>
            <div className={Sheet}>
                <ToggleBar
                    title={title}
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
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.country ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>국가</label>
                                <select
                                    {...register('country', { required: '국가를 선택해 주세요.' })}
                                    className={_Input}
                                    value={country}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'country',
                                            e.target.value,
                                        )
                                    }
                                >
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
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.corporate ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>판매상사</label>
                                <input
                                    {...register('corporate', { required: '판매상사를 입력해 주세요.' })}
                                    type="text"
                                    className={_Input}
                                    value={corporate}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'corporate',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            {/* 2행 */}
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.salesPerson ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>판매계약자</label>
                                <input
                                    {...register('salesPerson', { required: '판매계약자를 입력해 주세요.' })}
                                    type="text"
                                    className={_Input}
                                    value={salesPerson}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'salesPerson',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.inquiryType ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>Inquiry 유형</label>
                                <select
                                    {...register('inquiryType', { required: '문의유형을 선택해 주세요.' })}
                                    className={_Input}
                                    value={inquiryType}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'inquiryType',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="" disabled>
                                        문의유형
                                    </option>
                                    <option value="COMMON_INQUIRY">
                                        품질 + 견적
                                    </option>
                                    <option value="QUOTE_INQUIRY">견적</option>
                                </select>
                            </div>
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.industry ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>산업분류</label>
                                <select
                                    {...register('industry', { required: '산업분류를 선택해 주세요.' })}
                                    className={_Input}
                                    value={industry}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'industry',
                                            e.target.value,
                                        )
                                    }
                                >
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
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>의뢰인 E-mail</label>
                                <input
                                    type="email"
                                    className={_Input}
                                    value={email}
                                />
                            </div>
                            <div className={inputWrapper}>
                                <label>의뢰인 연락처</label>
                                <input
                                    type="tel"
                                    className={_Input}
                                    value={phone}
                                />
                            </div>

                            {/* 4행 */}
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.corporationCode ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>법인코드</label>
                                <input
                                    {...register('corporationCode', { required: '법인코드를 입력해 주세요.' })}
                                    type="text"
                                    className={_Input}
                                    value={corporationCode}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'corporationCode',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.productType ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>제품유형</label>
                                <select
                                    {...register('productType', { required: '제품유형을 선택해 주세요.' })}
                                    className={_Input}
                                    value={productType}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'productType',
                                            e.target.value,
                                        )
                                    }
                                >
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
                            <div className={inputWrapper}
                                 style={{
                                     border: errors.customerRequestDate ? '1px solid #F02323' : '1px solid #c1c1c1',
                                 }}>
                                <label>고객요청일자</label>
                                <input
                                    {...register('customerRequestDate', { required: '고객요청일자를 선택해 주세요.' })}
                                    type="date"
                                    className={_Input}
                                    value={customerRequestDate}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'customerRequestDate',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
export default InquiryNewForm;
