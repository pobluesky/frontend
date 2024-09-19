import React from 'react';
import Input from '../../atoms/Input';
import { Offer_Table } from '../../../assets/css/Form.css';

function OffertableItem({ lineItems }) {

    const columnSample = [
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
                    {lineItems.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <select
                                    name={`product-${rowIndex}`}
                                    value={row.product || 'default'}
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
                            {columnSample.slice(1).map((column, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        {column === 'Specification' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.specification || ''}
                                                />
                                            </td>
                                        ) : column === 'Surface Finish' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.surfaceFinish || ''}
                                                />
                                            </td>
                                        ) : column === 'Usage' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.usage || ''}
                                                />
                                            </td>
                                        ) : column === 'Thickness' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.thickness || ''}
                                                />
                                            </td>
                                        ) : column === 'Diameter' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.diameter || ''}
                                                />
                                            </td>
                                        ) : column === 'Width' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.width || ''}
                                                />
                                            </td>
                                        ) : column === 'Quantity(mt)' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.quantity || ''}
                                                />
                                            </td>
                                        ) : column === 'Price' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.price || ''}
                                                />
                                            </td>
                                        ) : column === 'Edge' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.edge || ''}
                                                />
                                            </td>
                                        ) : column === 'Unit Weight Max' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.unitMaxWeight || ''}
                                                />
                                            </td>
                                        ) : column === 'Unit Weight Min' ? (
                                            <td>
                                                <Input
                                                    height={'24px'}
                                                    border={'solid 1px #c1c1c1'}
                                                    borderRadius={'8px'}
                                                    padding={'0 8px'}
                                                    value={row.unitMinWeight || ''}
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

export default OffertableItem;
