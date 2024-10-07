import React, { useEffect, useState } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import { Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Container, Sheet, Opend } from '../../../assets/css/Form.css';
import { getInquiryDetailByManagers } from '../../../apis/api/inquiry';

const ManagerBasicInfoForm = ({
    formData,
    progress,
    salesManagerName,
    qualityManagerName,
    onManagerSelect,
}) => {
    if (!formData) {
        return null;
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

    const inputStyle = {
        inputProps: {
            style: { color: '#000000', fontWeight: '700' },
            readOnly: true,
        },
        variant: "outlined",
        fullWidth: true,
    };

    return (
        <div className={Container} style={{ marginTop: '2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'기본정보'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                    progress={progress}
                    salesManagerName={salesManagerName}
                    qualityManagerName={qualityManagerName}
                    onManagerSelect={onManagerSelect}
                    inquiryType={inquiryType}
                />
                {isChecked && (
                    <div className={Opend}>
                        <Grid container spacing={2}>
                            {/* 1행 */}
                            <Grid item xs={3}>
                                <TextField
                                    label="고객사명"
                                    value={customerName}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>국가</InputLabel>
                                    <Select
                                        value={country}
                                        {...inputStyle}
                                    >
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
                            <Grid item xs={3}>
                                <TextField
                                    label="판매상사"
                                    value={corporate}
                                    placeholder="POA"
                                    {...inputStyle}
                                />
                            </Grid>

                            {/* 2행 */}
                            <Grid item xs={3}>
                                <TextField
                                    label="판매계약자"
                                    value={salesPerson}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Inquiry 유형</InputLabel>
                                    <Select
                                        value={inquiryType}
                                        {...inputStyle}
                                    >
                                        <MenuItem value="COMMON_INQUIRY">품질 + 견적</MenuItem>
                                        <MenuItem value="QUOTE_INQUIRY">견적</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>산업분류</InputLabel>
                                    <Select
                                        value={industry}
                                        {...inputStyle}
                                    >
                                        <MenuItem value="AUTOMOBILE">Automobile</MenuItem>
                                        <MenuItem value="CONSTRUCTION">Construction</MenuItem>
                                        <MenuItem value="DISTRIBUTION">Distribution</MenuItem>
                                        <MenuItem value="ELECTRIC">Electric</MenuItem>
                                        <MenuItem value="FURNITURE">Furniture</MenuItem>
                                        <MenuItem value="PLATING">Plating</MenuItem>
                                        <MenuItem value="HIGH_CARBON">High-Carbon</MenuItem>
                                        <MenuItem value="KITCHEN">Kitchen</MenuItem>
                                        <MenuItem value="LOW_CARBON">Low-Carbon</MenuItem>
                                        <MenuItem value="MACHINERY">Machinery</MenuItem>
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
                            <Grid item xs={3}>
                                <TextField
                                    label="의뢰인명"
                                    value={name}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="의뢰인 E-mail"
                                    type="email"
                                    value={email}
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="의뢰인 연락처"
                                    type="tel"
                                    value={phone}
                                    {...inputStyle}
                                />
                            </Grid>

                            {/* 4행 */}
                            <Grid item xs={3}>
                                <TextField
                                    label="법인코드"
                                    value={corporationCode}
                                    placeholder="(주)포스코"
                                    {...inputStyle}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel>제품</InputLabel>
                                    <Select
                                        value={productType}
                                        {...inputStyle}
                                    >
                                        <MenuItem value="CAR">자동차</MenuItem>
                                        <MenuItem value="HOT_ROLLED">열연</MenuItem>
                                        <MenuItem value="COLD_ROLLED">냉연</MenuItem>
                                        <MenuItem value="THICK_PLATE">후판</MenuItem>
                                        <MenuItem value="WIRE_ROD">선재</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="고객요청일자"
                                    type="date"
                                    value={customerRequestDate}
                                    {...inputStyle}
                                />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagerBasicInfoForm;
