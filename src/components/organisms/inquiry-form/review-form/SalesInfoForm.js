import React, { useState } from 'react';
import {
    Container,
    Sheet,
    Opend,
} from '../../../../assets/css/Form.css';
import ToggleBar from '../../../molecules/ToggleBar';
import { Select, MenuItem, TextField, Grid } from '@mui/material';

const SalesInfoForm = ({
    formData,
    handleFormDataChange,
    handleIsPreview,
    isPreviewData,
    register,
    errors,
}) => {
    if(!formData) {
        return;
    }

    const {
        contract,
        thicknessNotify,
    } = formData;

    const [isChecked, setCheck] = useState(true);

    const items = ['수주배경', '두께특이사항'];

    return (
        <div className={Container} style={{ marginTop: '-2vh' }}>
            <div className={Sheet}>
                <ToggleBar
                    title={'영업검토정보'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                    handleIsPreview={handleIsPreview}
                    isPreviewData={isPreviewData}
                />
                {isChecked ? (
                    <div className={Opend} style={{ padding: '3vh' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                                수주배경
                            </Grid>
                            <Grid item xs={9} style={{ fontWeight: 'bold' }}>
                                두께특이사항
                            </Grid>

                            <Grid item xs={3}>
                                <Select
                                    {...register('contract', { required: true })}
                                    error={!!errors.contract}
                                    value={contract}
                                    onChange={(e) => handleFormDataChange(
                                        'contract', e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    inputProps={{
                                        style: { color: '#000000', fontWeight: '700' },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>선택</em>
                                    </MenuItem>
                                    <MenuItem
                                        value="CUSTOMER_RELATIONSHIP">고객협력</MenuItem>
                                    <MenuItem
                                        value="MARKET_DEMAND">시장수요</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    {...register('thicknessNotify', { required: true })}
                                    error={!!errors.thicknessNotify}
                                    type="text"
                                    value={thicknessNotify}
                                    onChange={(e) => handleFormDataChange(
                                        'thicknessNotify', e.target.value)}
                                    variant="outlined"
                                    placeholder="내용을 입력하세요."
                                    fullWidth
                                    inputProps={{
                                        style: { color: '#000000', fontWeight: '500' },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default SalesInfoForm;
