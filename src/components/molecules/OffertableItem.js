import React from 'react';
import Input from '../atoms/Input';
import SearchInput from './SearchInput';
import { Offer_Table } from '../../assets/css/Form.css';

function OfferTableItem({ rows, onRowSelect, onInputChange, selectedRows = [], lineItems }) { // OfferTable 조회
    const columnSample = [
        '',
        'Product',
        'Specification',
        'Surface',
        'Usage',
        'Size',
        'Quantity(mt)',
        'Price',
        'Unit Weight(kg)',
    ];
    const sizeSample = ['Thickness', 'Diameter', 'Width'];
    const weightSample = ['Max', 'Min'];
    const productSample = [
        '자동차',
        '후판(건설용)',
        '후판(육상플랜트)',
        '표면처리(일반)',
    ];
    const countrySample = ['Australian Dollar', 'Japan Yen', 'Korean Won'];

    return (
        <div className={Offer_Table}>
            <div>
                <table>
                    <thead>
                        <tr>
                            {columnSample.map((column, idx) => (
                                <React.Fragment key={idx}>
                                    {column === 'Size' ? (
                                        <th colSpan={3}>
                                            <div>{column}</div>
                                        </th>
                                    ) : column === 'Unit Weight(kg)' ? (
                                        <th colSpan={2}>
                                            <div>{column}</div>
                                        </th>
                                    ) : (
                                        <th>{column}</th>
                                    )}
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr>
                            {columnSample.map((column, idx) => (
                                <React.Fragment key={idx}>
                                    {column === 'Size' ? (
                                        sizeSample.map((size, sizeIdx) => (
                                            <th key={sizeIdx}>{size}</th>
                                        ))
                                    ) : column === 'Unit Weight(kg)' ? (
                                        weightSample.map(
                                            (weight, weightIdx) => (
                                                <th key={weightIdx}>
                                                    {weight}
                                                </th>
                                            ),
                                        )
                                    ) : (
                                        <th />
                                    )}
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
                                    const baseIdx = idx + 1; // Adjust base index for subsequent columns
                                    return (
                                        <React.Fragment key={idx}>
                                            {column === 'Specification' ? (
                                                <td>
                                                    <SearchInput
                                                        display={'flex'}
                                                        height={'24px'}
                                                        border={
                                                            'solid 1px #c1c1c1'
                                                        }
                                                        borderRadius={'8px'}
                                                        padding={'0 8px 0 8px'}
                                                        value={
                                                            row.items
                                                                .specification ||
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            onInputChange(
                                                                row.id,
                                                                'specification',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
                                            ) : column === 'Price' ? (
                                                <td>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <td>
                                                                    <select
                                                                        name={`country-${row.id}`}
                                                                        value={
                                                                            row
                                                                                .items
                                                                                .country ||
                                                                            'Australian Dollar'
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            onInputChange(
                                                                                row.id,
                                                                                'country',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                    >
                                                                        {countrySample.map(
                                                                            (
                                                                                country,
                                                                                countryIdx,
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        countryIdx
                                                                                    }
                                                                                    value={
                                                                                        country
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        country
                                                                                    }
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <Input
                                                                        height={
                                                                            '24px'
                                                                        }
                                                                        border={
                                                                            'solid 1px #c1c1c1'
                                                                        }
                                                                        borderRadius={
                                                                            '8px'
                                                                        }
                                                                        padding={
                                                                            '0 8px 0 8px'
                                                                        }
                                                                        value={
                                                                            row
                                                                                .items
                                                                                .price ||
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            onInputChange(
                                                                                row.id,
                                                                                'price',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </td>
                                            ) : column === 'Size' ? (
                                                sizeSample.map(
                                                    (size, sizeIdx) => (
                                                        <td key={sizeIdx}>
                                                            <Input
                                                                height={'24px'}
                                                                border={
                                                                    'solid 1px #c1c1c1'
                                                                }
                                                                borderRadius={
                                                                    '8px'
                                                                }
                                                                padding={
                                                                    '0 8px 0 8px'
                                                                }
                                                                value={
                                                                    row.items[
                                                                        `size-${sizeIdx}`
                                                                    ] || ''
                                                                }
                                                                onChange={(e) =>
                                                                    onInputChange(
                                                                        row.id,
                                                                        `size-${sizeIdx}`,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    ),
                                                )
                                            ) : column === 'Unit Weight(kg)' ? (
                                                weightSample.map(
                                                    (weight, weightIdx) => (
                                                        <td key={weightIdx}>
                                                            <Input
                                                                height={'24px'}
                                                                border={
                                                                    'solid 1px #c1c1c1'
                                                                }
                                                                borderRadius={
                                                                    '8px'
                                                                }
                                                                padding={
                                                                    '0 8px 0 8px'
                                                                }
                                                                value={
                                                                    row.items[
                                                                        `weight-${weightIdx}`
                                                                    ] || ''
                                                                }
                                                                onChange={(e) =>
                                                                    onInputChange(
                                                                        row.id,
                                                                        `weight-${weightIdx}`,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    ),
                                                )
                                            ) : (
                                                <td>
                                                    <Input
                                                        height={'24px'}
                                                        border={
                                                            'solid 1px #c1c1c1'
                                                        }
                                                        borderRadius={'8px'}
                                                        padding={'0 8px 0 8px'}
                                                        value={
                                                            row.items[
                                                                column.toLowerCase()
                                                            ] || ''
                                                        }
                                                        onChange={(e) =>
                                                            onInputChange(
                                                                row.id,
                                                                column.toLowerCase(),
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </td>
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

export default OfferTableItem;
