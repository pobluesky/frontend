import React, { useState } from 'react';
import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import ToggleBar from '../../molecules/ToggleBar';
import { productTypes } from '../../../utils/inquiry';

const InquiryHistoryFormItem = ({ productType, lineItemData }) => { // 라인아이템 조회
    const fields = productTypes[productType] || {};
    const [isChecked, setChecked] = useState(true);

    return (
        <Paper
            style={{
                overflowX: 'scroll',
                width: '95vw',
                margin: '0 auto',
                borderRadius: '20px',
                marginBottom: '90px',
                backgroundColor: '#ffffff',
            }}>
            <ToggleBar title={"라인아이템"} isChecked={isChecked} setCheck={setChecked} />
            {isChecked ? (
                <TableContainer>
                    <Table style={{ backgroundColor: '#ffffff' }}>
                        <TableHead style={{ backgroundColor: '#d8e1e9' }}>
                            <TableRow>
                                {Object.keys(fields).map((key) => (
                                    key !== 'lineItemId' && (
                                    <TableCell key={key} style={{
                                        minWidth: 200,
                                        fontSize: '20px',
                                        fontWeight: '800',
                                        color: '#49454F',
                                        textAlign: 'center'
                                    }}>
                                        &nbsp;&nbsp;&nbsp;
                                        {fields[key].label}
                                    </TableCell>
                                    )
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: '#fffffff' }}>
                            {lineItemData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={Object.keys(fields).length}>데이터 없음</TableCell>
                                </TableRow>
                            ) : (
                                lineItemData.map((item, index) => (
                                    <TableRow key={index}>
                                        {Object.keys(fields).map((key) => {
                                            const field = fields[key];
                                            return (
                                                key !== 'lineItemId' && (
                                                <TableCell key={key}>
                                                    {field.type === 'enum' ? (
                                                        <Select
                                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                                            value={item[key] || ''}>
                                                            {field.options.map(option => (
                                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    ) : field.type === 'boolean' ? (
                                                        <Select
                                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                                            value={item[key] ? 'true' : 'false'}>
                                                            <MenuItem value="true">Yes</MenuItem>
                                                            <MenuItem value="false">No</MenuItem>
                                                        </Select>
                                                    ) : field.type === 'string' ? (
                                                        <TextField
                                                            value={item[key] || ''}
                                                            type={field.type}
                                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                                        />
                                                    ) : field.type === 'int' ? (
                                                        <TextField
                                                            value={item[key] || ''}
                                                            type={field.type}
                                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                                            InputProps={{
                                                                inputProps: {
                                                                    min: 0,
                                                                },
                                                            }}
                                                        />
                                                    ) : field.type === 'date' ? (
                                                        <TextField
                                                            value={item[key] || ''}
                                                            type={field.type}
                                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                                            InputProps={{
                                                                inputProps: {
                                                                    min: field.type === 'date'? new Date() : undefined,
                                                                },
                                                            }}
                                                        />
                                                    ) : (
                                                        <TextField
                                                            value={item[key] || ''}
                                                            type={field.type}
                                                            style={{ width: '100%', backgroundColor: '#ffffff' }}
                                                            InputProps={{
                                                                inputProps: {
                                                                    min: field.type === 'date'? new Date() : undefined,
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                </TableCell>
                                                )
                                            );
                                        })}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                ''
                )}
        </Paper>
    );
};

export default InquiryHistoryFormItem;
