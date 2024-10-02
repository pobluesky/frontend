import React, { useState } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import {
    Container,
    Sheet,
    Opend,
} from '../../../assets/css/Form.css';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const InquiryNewForm = ({
    formData,
    handleFormDataChange,
    register,
    errors,
    title,
    setManagerId,
    isForm,
    isUpdate,
    onManagerSelect,
}) => {
    const {
        customerCode,
        customerName,
        salesManagerName,
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

    const inputStyle = {
        inputProps: {
            style: { color: '#000000', fontWeight: '700' },
        },
        variant: "outlined",
        fullWidth: true,
    };

    return (
        <div className={Container}>
            <div className={Sheet}>
                {isUpdate && (
                    <ToggleBar
                        title={title}
                        isChecked={isChecked}
                        setCheck={setCheck}
                        isPreviewButton={true}
                        progress={'FORM'}
                        setManagerId={setManagerId}
                        salesManagerName={salesManagerName}
                        onManagerSelect={onManagerSelect}
                    />
                )}
                {isForm && (
                    <ToggleBar
                        title={title}
                        isChecked={isChecked}
                        setCheck={setCheck}
                        isPreviewButton={true}
                        isForm={isForm}
                        progress={'FORM'}
                        setManagerId={setManagerId}
                        onManagerSelect={onManagerSelect}
                    />
                )}
                {isChecked ? (
                    <div className={Opend}>
                        <Grid container spacing={2}>
                            {/* 1행 */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="고객사명"
                                    value={customerName}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl variant="outlined" fullWidth error={!!errors.country}>
                                    <InputLabel>국가</InputLabel>
                                    <Select
                                        {...register('country', { required: true })}
                                        value={country}
                                        onChange={(e) => handleFormDataChange('country', e.target.value)}
                                        sx={{
                                            color: '#000000',
                                            fontWeight: '700',
                                        }}>
                                        <MenuItem value="" disabled>선택</MenuItem>
                                        <MenuItem value="USA">미국</MenuItem>
                                        <MenuItem value="CANADA">캐나다</MenuItem>
                                        <MenuItem value="KOREA">한국</MenuItem>
                                        <MenuItem value="JAPAN">일본</MenuItem>
                                        <MenuItem value="CHINA">중국</MenuItem>
                                        <MenuItem value="GERMANY">독일</MenuItem>
                                        <MenuItem value="FRANCE">프랑스</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    {...register('corporate', { required: true })}
                                    label="판매상사"
                                    onChange={(e) => handleFormDataChange('corporate', e.target.value)}
                                    {...inputStyle}
                                    value={corporate}
                                    error={!!errors.corporate}
                                />
                            </Grid>

                            {/* 2행 */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    {...register('salesPerson', { required: true })}
                                    label="판매계약자"
                                    onChange={(e) => handleFormDataChange('salesPerson', e.target.value)}
                                    {...inputStyle}
                                    value={salesPerson}
                                    error={!!errors.salesPerson}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl variant="outlined" fullWidth error={!!errors.inquiryType}>
                                    <InputLabel>Inquiry 유형</InputLabel>
                                    <Select
                                        {...register('inquiryType', { required: true })}
                                        value={inquiryType}
                                        onChange={(e) => handleFormDataChange('inquiryType', e.target.value)}
                                        sx={{
                                            color: '#000000',
                                            fontWeight: '700',
                                        }}>
                                        <MenuItem value="" disabled>문의유형</MenuItem>
                                        <MenuItem value="COMMON_INQUIRY">품질 + 견적</MenuItem>
                                        <MenuItem value="QUOTE_INQUIRY">견적</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl variant="outlined" fullWidth error={!!errors.industry}>
                                    <InputLabel>산업분류</InputLabel>
                                    <Select
                                        {...register('industry', { required: true })}
                                        value={industry}
                                        onChange={(e) => handleFormDataChange('industry', e.target.value)}
                                        sx={{
                                            color: '#000000',
                                            fontWeight: '700',
                                        }}>
                                        <MenuItem value="" disabled>선택</MenuItem>
                                        <MenuItem value="AUTOMOBILE">Automobile</MenuItem>
                                        <MenuItem value="CONSTRUCTION">Construction</MenuItem>
                                        <MenuItem value="DISTRIBUTION">Distribution</MenuItem>
                                        <MenuItem value="ELECTRIC">Electric</MenuItem>
                                        <MenuItem value="FURNITURE">Furniture</MenuItem>
                                        <MenuItem value="PLATING">Plating</MenuItem>
                                        <MenuItem value="HIGH_CARBON">High-Carbon</MenuItem>
                                        <MenuItem value="KITCHEN">Kitchen</MenuItem>
                                        <MenuItem value="LOW_CARBON">Low-Carbon</MenuItem>
                                        <MenuItem value="MARCHINERY">Machinery</MenuItem>
                                        <MenuItem value="PIPE">Pipe</MenuItem>
                                        <MenuItem value="REROLLING">Rerolling</MenuItem>
                                        <MenuItem value="SHIPBUILDING">Shipbuilding</MenuItem>
                                        <MenuItem value="TRANSPORTATION">Transportation</MenuItem>
                                        <MenuItem value="VESSEL">Vessel</MenuItem>
                                        <MenuItem value="BEAM">Beam</MenuItem>
                                        <MenuItem value="OTHER">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* 3행 */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="의뢰인명"
                                    value={name}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="의뢰인 E-mail"
                                    type="email"
                                    value={email}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    label="의뢰인 연락처"
                                    type="tel"
                                    value={phone}
                                    {...inputStyle}
                                />
                            </Grid>

                            {/* 4행 */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    {...register('corporationCode', { required: true })}
                                    label="법인코드"
                                    onChange={(e) => handleFormDataChange('corporationCode', e.target.value)}
                                    {...inputStyle}
                                    value={corporationCode}
                                    error={!!errors.corporationCode}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl variant="outlined" fullWidth error={!!errors.productType}>
                                    <InputLabel>제품유형</InputLabel>
                                    <Select
                                        {...register('productType', { required: true })}
                                        value={productType}
                                        onChange={(e) => handleFormDataChange('productType', e.target.value)}
                                        sx={{
                                            color: '#000000',
                                            fontWeight: '700',
                                        }}>
                                        <MenuItem value="" disabled>선택</MenuItem>
                                        <MenuItem value="CAR">자동차</MenuItem>
                                        <MenuItem value="HOT_ROLLED">열연</MenuItem>
                                        <MenuItem value="COLD_ROLLED">냉연</MenuItem>
                                        <MenuItem value="THICK_PLATE">후판</MenuItem>
                                        <MenuItem value="WIRE_ROD">선재</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    {...register('customerRequestDate', { required: true })}
                                    label="고객요청일자"
                                    type="date"
                                    onChange={(e) => handleFormDataChange('customerRequestDate', e.target.value)}
                                    {...inputStyle}
                                    value={customerRequestDate}
                                    error={!!errors.customerRequestDate}
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    inputProps={{
                                        style: {
                                            color: customerRequestDate ? 'black' : 'transparent',
                                            textAlign: 'center'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default InquiryNewForm;
