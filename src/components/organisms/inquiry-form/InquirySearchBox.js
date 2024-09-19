import React, { useState } from 'react';
import {
    _InquirySearch,
    _InquirySearchBox,
    _Text,
    _SearchBox,
    _Title,
    _Input,
    _Date
} from '../../../assets/css/Inquiry.css';
import SelectBox from '../../atoms/SelectBox';
import Button from '../../atoms/Button';
import ToggleButton from '../../atoms/ToggleButton';
import { productTypeOptions, IndustryOptions, inquiryTypeOptions, sortOptions, progressOptions } from '../../../utils/inquiry';

const InquirySearchBox = ({ onSearch, title }) => {
    const [searchParams, setSearchParams] = useState({
        productType: '',
        inquiryType: '',
        customerName: '',
        salesPerson: '',
        salesManagerName: '',
        qualityManagerName: '',
        industry: '',
        startDate: '',
        endDate: '',
        sortBy: 'LATEST',
        progress: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    const handleSelectChange = (name, value) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    const handleToggleChange = (type, value) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            [type]: prevParams[type] === value ? '' : value,
        }));
    };

    const handleSortChange = (sortOrder) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            sortBy: sortOrder,
        }));
    };

    const handleSearch = () => {
        console.log("searchParams: ", searchParams);
        onSearch(searchParams);
    };

    return (
        <div className={_InquirySearch}>
            <div className={_InquirySearchBox}>
                <p className={_Text}>{title}</p>
                <div className={_SearchBox}>

                    {/* 1행 */}
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>제품구분&nbsp;&nbsp;&nbsp;</p>
                        <SelectBox
                            options={productTypeOptions}
                            defaultValue={searchParams.productType}
                            onChange={(value) => handleSelectChange(
                                'productType',
                                value)}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>문의유형&nbsp;&nbsp;&nbsp;</p>
                        <SelectBox
                            options={inquiryTypeOptions}
                            defaultValue={searchParams.inquiryType}
                            onChange={(value) => handleSelectChange(
                                'inquiryType',
                                value)}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>고객사명&nbsp;</p>
                        <input
                            className={_Input}
                            name="customerName"
                            value={searchParams.customerName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>판매계약자</p>
                        <input
                            className={_Input}
                            name="salesPerson"
                            value={searchParams.salesPerson}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* 2행 */}
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>판매담당자</p>
                        <input
                            className={_Input}
                            name="salesManagerName"
                            value={searchParams.salesManagerName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>품질담당자</p>
                        <input
                            className={_Input}
                            name="qualityManagerName"
                            value={searchParams.qualityManagerName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>산업분류&nbsp;</p>
                        <SelectBox
                            options={IndustryOptions}
                            defaultValue={searchParams.industry}
                            onChange={(value) => handleSelectChange(
                                'industry',
                                value)}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className={_Title}>접수기간&nbsp;</p>
                        <input
                            className={_Date}
                            type="date"
                            name="startDate"
                            value={searchParams.startDate}
                            onChange={handleInputChange}
                            style={{ margin: '0 0 0 35px' }}
                        />
                        <div style={{ padding: '4px 10px 0 10px' }}>~</div>
                        <input
                            className={_Date}
                            type="date"
                            name="endDate"
                            value={searchParams.endDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* 3행 */}
                <div style={{ display: 'flex', paddingBottom: '10px' }}>
                        <div style={{ margin: '5px 20px 10px 0' }}>
                            {sortOptions.map((option) => (
                                <ToggleButton
                                    width={'70px'}
                                    key={option.value}
                                    btnName={option.label}
                                    isActive={searchParams.sortBy
                                        === option.value}
                                    onClick={() => handleSortChange(
                                        option.value)}
                                />
                            ))}
                        </div>
                        <div style={{ margin: '5px 5px 10px 0' }}>
                            {progressOptions.map((option) => (
                                <ToggleButton
                                    width={'115px'}
                                    key={option.value}
                                    btnName={option.label}
                                    isActive={searchParams.progress
                                        === option.value}
                                    onClick={() => handleToggleChange(
                                        'progress',
                                        option.value)}
                                />
                            ))}
                        </div>
                    </div>
            </div>
            <Button
                btnName={'조회'}
                textColor={'#ffffff'}
                borderRadius={'17px'}
                width={'100px'}
                height={'35px'}
                fontWeight={'800'}
                fontSize={'15px'}
                backgroundColor={'#03507D'}
                border={'none'}
                alignSelf={'center'}
                margin={'10px 30px 0 0'}
                onClick={handleSearch}
            />
        </div>
    );
};

export default InquirySearchBox;
