import React, { useState } from 'react';
import {
    Container,
    Sheet,
    Opend,
} from '../../../../assets/css/Form.css';
import ToggleBar from '../../../molecules/ToggleBar';
import { Select, MenuItem, TextField, Grid } from '@mui/material';

const SalesInfoForm = ({ formData }) => { // 영업 검토 조회
    if (!formData) {
        return null;
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
                                    value={formData.salesInfo.contract}
                                    placeholder={formData.salesInfo.contract}
                                    fullWidth
                                    inputProps={{
                                        style: { color: '#000000', fontWeight: '700' },
                                        readOnly: true,
                                    }}
                                >
                                    <MenuItem value="CUSTOMER_RELATIONSHIP">고객협력</MenuItem>
                                    <MenuItem value="MARKET_DEMAND">시장수요</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    type="text"
                                    value={formData.salesInfo.thicknessNotify}
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{
                                        style: { color: '#000000', fontWeight: '500' },
                                        readOnly: true,
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

export default SalesInfoForm;
