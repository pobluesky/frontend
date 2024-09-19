import React, { useState, useEffect } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import Button from '../../atoms/Button';
import TextEditor from '../../atoms/TextEditor';
import Category from '../../atoms/Category';
import Input from '../../atoms/Input';
import OfferTable from './Offertable';
import { Offer_Sheet } from '../../../assets/css/Form.css';
import OfferTableItem from '../../organisms/inquiry-form/OffertableItem';

function OffersheetBefore({ formData, inquiryData, onLineItemsChange, lineItemData, handleFormDataChange, isOfferSheetItem }) {
    if(!formData || !inquiryData) {
        return;
    }

    const [lineItems, setLineItems] = useState([]);

    const [isChecked, setCheck] = useState(true); // 토글 버튼 클릭 여부
    const borderRadius = isChecked ? '20px 20px 0 0' : '20px 20px 20px 20px';

    const [rows, setRows] = useState([
        { id: Date.now(), items: Array(8).fill('') },
    ]);

    const [selectedRows, setSelectedRows] = useState([]);

    const addRow = () => {
        const newRow = { id: Date.now(), items: Array(8).fill('') };
        setRows([...rows, newRow]);
    };

    const deleteRows = () => {
        const remainingRows = rows.filter(row => !selectedRows.includes(row.id));
        setRows(remainingRows);
        setSelectedRows([]);
    };

    const copyRows = () => {
        const copiedRows = selectedRows.map(id => {
            const rowToCopy = rows.find(row => row.id === id);
            return { ...rowToCopy, id: Date.now() + Math.random() };
        });
        setRows([...rows, ...copiedRows]);
        setSelectedRows([]);
        onLineItemsChange([...rows, ...copiedRows].map(row => ({
            id: row.id,
            ...Object.fromEntries(lineItems.map((label, index) => [label, row.items[index]]))
        })));
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(rowId => rowId !== id)
                : [...prevSelected, id]
        );
    };

    const handleInputChange = (rowId, field, value) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === rowId
                    ? { ...row, items: { ...row.items, [field]: value } }
                    : row
            )
        );

        const updatedRows = rows.map(row =>
            row.id === rowId
                ? { ...row, items: { ...row.items, [field]: value } }
                : row
        );

        onLineItemsChange(
            updatedRows.map(row => ({
                id: row.id,
                ...row.items
            }))
        );
    };

    return (
        <div className={Offer_Sheet} style={{ marginTop: '-2vh' }}>
            <div>
                {/* 토글 바 */}
                <ToggleBar
                    title={'Offersheet'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />

                {/* 토글 클릭 후 오퍼시트 열림 */}
                {isChecked && (
                    <div>
                        <div>
                            { isOfferSheetItem === true ? (
                                ''
                            ) : (
                                <>
                                    <Button
                                        onClick={addRow}
                                        btnName={'행 추가'}
                                        width={'96px'} // 추가
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        border={'none'}
                                        borderRadius={'18px'}
                                        fontSize={'17px'}
                                        fontWeight={'500'}
                                        padding={'10px'}
                                    />
                                    <Button
                                        onClick={deleteRows}
                                        btnName={'행 삭제'}
                                        width={'96px'} // 추가
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        border={'none'}
                                        borderRadius={'18px'}
                                        fontSize={'17px'}
                                        fontWeight={'500'}
                                        padding={'10px'}
                                    />
                                    <Button
                                        onClick={copyRows}
                                        btnName={'행 복사'}
                                        width={'96px'} // 추가
                                        backgroundColor={'#03507d'}
                                        textColor={'#ffffff'}
                                        border={'none'}
                                        borderRadius={'18px'}
                                        fontSize={'17px'}
                                        fontWeight={'500'}
                                        padding={'10px'}
                                    />
                                </>
                            )}
                        </div>
                        {/* 텍스트 에디터 */}
                        <TextEditor
                            width={'85vw'} // 원하는 대로
                            margin={'0 auto 0 auto'} // 원하는 대로
                            inputHeight={'120px'} // 입력창 높이 (원하는 대로)
                            inputMaxHeight={'120px'} // 입력창 높이와 동일하게
                            value={formData.message} // 입력값
                            onChange={(content) =>
                                handleFormDataChange(
                                    'message', content)} // 입력값 상태 변화
                        />
                        {/* 고객사 카테고리 */}
                        <div>
                            <Category categoryName={'1. 고객사'} />
                            <Input
                                width={'314px'}
                                height={'28px'}
                                border={'solid 1px #c1c1c1'}
                                borderRadius={'8px'}
                                padding={'0 8px 0 8px'}
                                value={inquiryData.customerName}
                            />
                        </div>
                        {/* 오퍼 시트 카테고리 */}
                        <div>
                            <Category categoryName={'2. Offer-Sheet'} />
                            { isOfferSheetItem === true ? (
                                <OfferTableItem
                                    rows={rows}
                                    onRowSelect={handleRowSelect}
                                    selectedRows={selectedRows}
                                    lineItems={lineItemData}
                                />
                            ) : (
                                <OfferTable
                                    rows={rows}
                                    onRowSelect={handleRowSelect}
                                    onInputChange={handleInputChange}
                                    selectedRows={selectedRows}
                                />
                            ) }
                        </div>
                        {/* 그 외 카테고리 */}
                        <div>
                            <div>
                                <Category categoryName={'3. Price Term'} />
                                {/*<Terms />*/}
                                <Input
                                    width={'214px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px 0 8px'}
                                    value={formData.priceTerms}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'priceTerms', e.target.value)}
                                />
                            </div>
                            <div>
                                <Category categoryName={'4. Shipment'} />
                                <Input
                                    type="date"
                                    width={'125px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px 0 8px'}
                                    value={formData.shipment}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'shipment', e.target.value)}
                                />
                            </div>
                            <div>
                                <Category categoryName={'5. Payment Term'} />
                                {/*<Terms />*/}
                                <Input
                                    width={'314px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px 0 8px'}
                                    value={formData.paymentTerms}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'paymentTerms', e.target.value)}
                                />
                            </div>
                            <div>
                                <Category categoryName={'6. Destination'} />
                                <Input
                                    width={'214px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px 0 8px'}
                                    value={formData.destination}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'destination', e.target.value)}
                                />
                            </div>
                            <div>
                                <Category categoryName={'7. Validity'} />
                                <Input
                                    type="date"
                                    width={'125px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px 0 8px'}
                                    value={formData.validity}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'validity', e.target.value)}
                                />
                            </div>
                            <div>
                                <Category categoryName={'8. Remark'} />
                                <Input
                                    width={'314px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px 0 8px'}
                                    value={formData.remark}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'remark', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OffersheetBefore;