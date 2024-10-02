import React, { useEffect, useState } from 'react';
import Input from '../../atoms/Input';
import { Offer_Table } from '../../../assets/css/Form.css';

function OfferTable({ rows, onRowSelect, onInputChange, selectedRows = [], isPreviewData, receipts = [] }) {
    const columnSample = [
        '',
        'Product',
        'Specification',
        'Surface Finish',
        'Usage',
        'Thickness',
        'Diameter',
        'Width',
        'Quantity(mt)',
        'Price',
        'Edge',
        'Unit Weight Max',
        'Unit Weight Min'
    ];
    const productSample = [
        '자동차',
        '열연',
        '냉연',
        '후판',
        '선재',
    ];

    useEffect(() => {
        if (isPreviewData) {
            receipts.forEach((receipt, index) => {
                const row = rows[index];

                if (row) {
                    if (receipt && Object.keys(receipt).length > 0) {
                        onInputChange(row.id, 'product', receipt.product || '');
                        onInputChange(row.id, 'specification', receipt.specification || '');
                        onInputChange(row.id, 'surfaceFinish', receipt.surfaceFinish || '');
                        onInputChange(row.id, 'usage', receipt.usage || '');
                        onInputChange(row.id, 'thickness', receipt.thickness || '');
                        onInputChange(row.id, 'diameter', receipt.diameter || '');
                        onInputChange(row.id, 'width', receipt.width || '');
                        onInputChange(row.id, 'quantity', receipt.quantity || '');
                        onInputChange(row.id, 'price', receipt.price || '');
                        onInputChange(row.id, 'edge', receipt.edge || '');
                        onInputChange(row.id, 'unitMaxWeight', receipt.unitMaxWeight || '');
                        onInputChange(row.id, 'unitMinWeight', receipt.unitMinWeight || '');
                    } else {
                        console.warn(`Empty receipt at Index: ${index}`);
                    }
                } else {
                    console.warn(`No row found for Index: ${index}`);
                }
            });
        }
    }, [rows]);

    return (
        <div className={Offer_Table}>
            <div>
                <table>
                    <thead>
                    <tr>
                        {columnSample.map((column, idx) => (
                            <React.Fragment key={idx}>
                                <th>{column}</th>
                            </React.Fragment>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => onRowSelect(row.id)}
                                />
                            </td>
                            <td>
                                <select
                                    name={`product-${row.id}`}
                                    value={row.items.product || 'default'}
                                    onChange={(e) =>
                                        onInputChange(
                                            row.id,
                                            'product',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="default" disabled>
                                        select
                                    </option>
                                    {productSample.map(
                                        (product, productIdx) => (
                                            <option
                                                key={productIdx}
                                                value={product}
                                            >
                                                {product}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </td>
                            {columnSample.slice(2).map((column, idx) => {
                                const baseIdx = idx + 1;
                                return (
                                    <React.Fragment key={idx}>
                                        {column === 'Specification' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.specification || ''}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'specification',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Surface Finish' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.surfaceFinish || ''}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'surfaceFinish',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Usage' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.usage || ''}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'usage',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Thickness' ? (
                                                <td>
                                                    <Input
                                                        height={'24px'}
                                                        border={'solid 1px #c1c1c1'}
                                                        borderRadius={'8px'}
                                                        padding={'0 8px'}
                                                        value={row.items.thickness}
                                                        onChange={(e) =>
                                                            onInputChange(
                                                                row.id,
                                                                'thickness',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
                                        ) : column === 'Diameter' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.diameter}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'diameter',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Width' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.width}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'width',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Quantity(mt)' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.quantity || ''}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'quantity',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Price' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.price || ''}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'price',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Edge' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.edge || ''}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'edge',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Unit Weight Max' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.unitMaxWeight}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'unitMaxWeight',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : column === 'Unit Weight Min' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.items.unitMinWeight}
                                                    onChange={(e) =>
                                                        onInputChange(
                                                            row.id,
                                                            'unitMinWeight',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : (
                                            ''
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OfferTable;
