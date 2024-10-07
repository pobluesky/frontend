import React, { useEffect, useState } from 'react';
import {
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Button,
} from '@mui/material';
import { Add, DeleteOutline, FileCopy, Remove } from '@mui/icons-material';
import { productTypes } from '../../../utils/inquiry';
import LineItemToggleBar from '../../molecules/LineItemToggleBar';

const InquiryHistoryForm = ({
    productType,
    lineItemData,
    onLineItemsChange,
    onRefLineItems,
    isUpdate,
    setError,
}) => {
    const [localData, setLocalData] = useState(lineItemData);
    const [isChecked, setChecked] = useState(true);

    const fields = productTypes[productType] || productTypes['CAR'];

    const onResetLineItems = () => {
        setLocalData([]);
        onLineItemsChange([]);
    }

    useEffect(() => {
        if (onRefLineItems) {
            onRefLineItems(onResetLineItems);
        }
    }, [onRefLineItems]);

    const handleFieldChange = (index, field, value, data) => {
        const updatedData = data ? data : localData;

        setLocalData(prevData => {
            const newData = [...updatedData];
            if (index !== null && field !== null) {
                newData[index] = {
                    ...newData[index],
                    [field]: value || newData[index][field],
                };
            }
            return newData;
        });
        onLineItemsChange(updatedData);
    };

    const handleSelect = (selectedData) => {
        if (selectedData) {
            handleFieldChange(null, null, null, selectedData);
        } else {
            handleFieldChange(null, null, null, localData);
        }
    };

    useEffect(() => {
        if (lineItemData && lineItemData.length > 0) {
            setLocalData(lineItemData);
        }
    }, [lineItemData]);

    const addRow = () => {
        const newRow = Object.keys(fields).reduce(
            (acc, key) => ({ ...acc, [key]: '' }),
            {},
        );
        const updatedData = [...localData, newRow];
        setLocalData(updatedData);
        onLineItemsChange(updatedData);
    };

    const deleteRow = (index) => {
        const updatedData = localData.filter((_, i) => i !== index);
        setLocalData(updatedData);
        onLineItemsChange(updatedData);
    };

    const deleteAllRows = () => {
        setLocalData([]);
        onLineItemsChange([]);
    };

    const copyRow = (index) => {
        const rowToCopy = localData[index];
        const updatedData = [...localData, { ...rowToCopy }];
        setLocalData(updatedData);
        onLineItemsChange(updatedData);
    };

    const handleLineItemsChangeByOCR = (newLineItems) => {
        const updatedData = [...localData, ...newLineItems];
        setLocalData(updatedData);
        onLineItemsChange(updatedData);
    };

    return (
        <Paper
            style={{
                overflowX: 'scroll',
                width: '95vw',
                margin: '0 auto',
                borderRadius: '7px',
                marginBottom: '100px',
                backgroundColor: '#ffffff',
                boxShadow: 'none'
            }}
        >
            <LineItemToggleBar
                title={'라인아이템'}
                isChecked={isChecked}
                setCheck={setChecked}
                productType={productType}
                onLineItemsChange={onLineItemsChange}
                handleLineItemsChangeByOCR={handleLineItemsChangeByOCR}
                onSelect={handleSelect}
                isUpdate={isUpdate}
                setError={setError}
            />
            {isChecked ? (
                <>
                    <TableContainer>
                        <Table style={{ backgroundColor: '#ffffff' }}>
                            <TableHead style={{ backgroundColor: '#f3f4ff' }}>
                                <TableRow>
                                    <TableCell
                                        style={{ minWidth: 100 }}
                                    ></TableCell>
                                    {Object.keys(fields).map((key) => (
                                        key !== 'lineItemId' && (
                                            <TableCell
                                                key={key}
                                                style={{
                                                    minWidth: 200,
                                                    fontSize: '20px',
                                                    fontWeight: '800',
                                                    color: '#000000',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                &nbsp;&nbsp;&nbsp;
                                                {fields[key].label}
                                            </TableCell>
                                        )
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {localData.length === 0 ? (
                                    <TableRow></TableRow>
                                ) : (
                                    localData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell style={{ width: 100 }}>
                                                <IconButton
                                                    onClick={() =>
                                                        copyRow(index)
                                                    }
                                                    aria-label="copy"
                                                >
                                                    <FileCopy />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        deleteRow(index)
                                                    }
                                                    aria-label="delete"
                                                >
                                                    <DeleteOutline />
                                                </IconButton>
                                            </TableCell>
                                            {Object.keys(fields).map((key) => {
                                                const field = fields[key];
                                                return (
                                                    key !== 'lineItemId' && (
                                                        <TableCell key={key}>
                                                            {field.type ===
                                                            'enum' ? (
                                                                <Select
                                                                    style={{
                                                                        width: '100%',
                                                                        backgroundColor:
                                                                            '#ffffff',
                                                                    }}
                                                                    value={
                                                                        item[key] ||
                                                                        ''
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            index,
                                                                            key,
                                                                            e.target
                                                                                .value,
                                                                        )
                                                                    }
                                                                >
                                                                    {field.options.map(
                                                                        (
                                                                            option,
                                                                        ) => (
                                                                            <MenuItem
                                                                                key={
                                                                                    option
                                                                                }
                                                                                value={
                                                                                    option
                                                                                }
                                                                            >
                                                                                {
                                                                                    option
                                                                                }
                                                                            </MenuItem>
                                                                        ),
                                                                    )}
                                                                </Select>
                                                            ) : field.type ===
                                                            'boolean' ? (
                                                                <Select
                                                                    style={{
                                                                        width: '100%',
                                                                        backgroundColor:
                                                                            '#ffffff',
                                                                    }}
                                                                    value={
                                                                        item[key]
                                                                            ? 'true'
                                                                            : 'false'
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            index,
                                                                            key,
                                                                            e.target
                                                                                .value ===
                                                                            'true',
                                                                        )
                                                                    }
                                                                >
                                                                    <MenuItem value="true">
                                                                        Yes
                                                                    </MenuItem>
                                                                    <MenuItem value="false">
                                                                        No
                                                                    </MenuItem>
                                                                </Select>
                                                            ) : (
                                                                <TextField
                                                                    value={
                                                                        item[key] ||
                                                                        ''
                                                                    }
                                                                    type={
                                                                        field.type
                                                                    }
                                                                    style={{
                                                                        width: '100%',
                                                                        backgroundColor:
                                                                            '#ffffff',
                                                                    }}
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            index,
                                                                            key,
                                                                            e.target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    InputProps={
                                                                        field.type ===
                                                                        'int'
                                                                            ? {
                                                                                inputProps:
                                                                                    {
                                                                                        min: 0,
                                                                                    },
                                                                            }
                                                                            : {}
                                                                    }
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
                    <Button
                        startIcon={<Add />}
                        style={{
                            margin: '15px',
                            backgroundColor: '#03507d',
                            color: '#ffffff',
                            fontWeight: '800',
                        }}
                        onClick={addRow}
                    >
                        행추가
                    </Button>
                    <Button
                        startIcon={<Remove />}
                        style={{
                            backgroundColor: '#03507d',
                            color: '#ffffff',
                            fontWeight: '800',
                        }}
                        onClick={deleteAllRows}
                    >
                        전체삭제
                    </Button>
                </>
            ) : (
                ''
            )}
        </Paper>
    );
};

export default InquiryHistoryForm;
