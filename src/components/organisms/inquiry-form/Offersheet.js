import React, { useEffect, useState } from 'react';
import ToggleBar from '../../molecules/ToggleBar';
import { Button } from '@mui/material';
import TextEditor from '../../atoms/TextEditor';
import Category from '../../atoms/Category';
import Input from '../../atoms/Input';
import OfferTable from '../../organisms/inquiry-form/Offertable';
import { Offer_Sheet } from '../../../assets/css/Form.css';
import OfferTableItem from '../../organisms/inquiry-form/OffertableItem';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

function Offersheet({
    formData,
    inquiryData,
    onLineItemsChange,
    lineItemData,
    handleFormDataChange,
    isOfferSheetItem,
    isPreviewData,
    receipts,
}) {
    if(!formData || !inquiryData) {
        return;
    }

    const [lineItems, setLineItems] = useState([]);

    const [isChecked, setCheck] = useState(true);
    const borderRadius = isChecked ? '20px 20px 0 0' : '20px 20px 20px 20px';

    const [rows, setRows] = useState([
        { id: Date.now(), items: Array(8).fill('') },
    ]);

    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        if (receipts && receipts.length > 0) {
            const newRows = receipts.map((receipt, index) => ({
                id: Date.now() + index,
                items: Array(8).fill(''),
            }));
            setRows(newRows);
        }
    }, [receipts]);

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

    // ExcelJS로 엑셀 다운로드 함수
    const handleExportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('OfferSheet');
        const { htmlToText } = require('html-to-text');

        const titleStyle = {
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } },
            },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'B5B5B2' } },
            font: { bold: true, size: 18 },
        }

        const columnStyle = {
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } },
            },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E8E8E7' } },
            font: { bold: true, size: 14 },
        }

        const dataStyle = {
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } },
            },
            font: { size: 14 },
        }

        const offerTableHeadStyle = {
            font: { bold: true, size: 11, color: { argb: 'FFFFFF'} },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '808080' } },
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            },
        };

        const offerTableBodyStyle = {
            font: { size: 11 },
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            },
        };

        // 병합된 셀 범위에 테두리 적용하는 함수
        const applyBorderToMergedCells = (worksheet, startCell, endCell, style) => {
            const [startColumn, startRow] = worksheet.getCell(startCell).address.match(/([A-Z]+)(\d+)/).slice(1);
            const [endColumn, endRow] = worksheet.getCell(endCell).address.match(/([A-Z]+)(\d+)/).slice(1);

            for (let row = parseInt(startRow); row <= parseInt(endRow); row++) {
                for (let col = startColumn.charCodeAt(0); col <= endColumn.charCodeAt(0); col++) {
                    const cellAddress = String.fromCharCode(col) + row;
                    const cell = worksheet.getCell(cellAddress);
                    cell.border = style.border;
                }
            }
        };

        // OfferSheet 제목
        worksheet.mergeCells('B2:M3');
        worksheet.getCell('B2').value = 'OfferSheet';
        worksheet.getCell('B2').style =  { ...titleStyle, border: undefined };
        applyBorderToMergedCells(worksheet, 'B2', 'M3', titleStyle);

        // 고객사명
        worksheet.mergeCells('B4:C5');
        worksheet.getCell('B4').value = '고객사명';
        worksheet.getCell('B4').style =  { ...columnStyle, border: undefined };
        worksheet.columns[1].width = 16;
        worksheet.columns[2].width = 16;
        applyBorderToMergedCells(worksheet, 'B4', 'C5', columnStyle);

        // 고객사명 값
        worksheet.mergeCells('D4:E5');
        worksheet.getCell('D4').value = inquiryData.customerName;
        worksheet.getCell('D4').style = { ...dataStyle, border: undefined };
        worksheet.columns[3].width = 16;
        worksheet.columns[4].width = 16;
        applyBorderToMergedCells(worksheet, 'D4', 'E5', dataStyle);

        // 판매계약자
        worksheet.mergeCells('F4:G5');
        worksheet.getCell('F4').value = '판매계약자';
        worksheet.getCell('F4').style =  { ...columnStyle, border: undefined };
        worksheet.columns[5].width = 16;
        worksheet.columns[6].width = 16;
        applyBorderToMergedCells(worksheet, 'F4', 'G5', columnStyle);

        // 판매계약자 값
        worksheet.mergeCells('H4:I5');
        worksheet.getCell('H4').value = inquiryData.salesPerson;
        worksheet.getCell('H4').style = { ...dataStyle, border: undefined };
        worksheet.columns[7].width = 16;
        worksheet.columns[8].width = 16;
        applyBorderToMergedCells(worksheet, 'H4', 'I5', dataStyle);

        // 의뢰인명
        worksheet.mergeCells('J4:K4');
        worksheet.getCell('J4').value = '의뢰인명';
        worksheet.getCell('J4').style =  { ...columnStyle, border: undefined };
        worksheet.columns[9].width = 16;
        applyBorderToMergedCells(worksheet, 'J4', 'K4', columnStyle);

        // 의뢰인명 값
        worksheet.mergeCells('L4:M4');
        worksheet.getCell('L4').value = inquiryData.name;
        worksheet.getCell('L4').style = { ...dataStyle, border: undefined };
        worksheet.columns[10].width = 16;
        applyBorderToMergedCells(worksheet, 'L4', 'M4', dataStyle);

        // 의뢰인 E-mail
        worksheet.mergeCells('J5:K5');
        worksheet.getCell('J5').value = '의뢰인 E-mail';
        worksheet.getCell('J5').style  =  { ...columnStyle, border: undefined };
        worksheet.columns[11].width = 16;
        applyBorderToMergedCells(worksheet, 'J5', 'K5', columnStyle);

        // 의뢰인 E-mail 값
        worksheet.mergeCells('L5:M5');
        worksheet.getCell('L5').value = inquiryData.email;
        worksheet.getCell('L5').style = { ...dataStyle, border: undefined };
        worksheet.columns[12].width = 16;
        applyBorderToMergedCells(worksheet, 'L5', 'M5', dataStyle);

        // Product Details
        worksheet.mergeCells('B6:M7');
        worksheet.getCell('B6').value = 'Product Details';
        worksheet.getCell('B6').style  =  { ...columnStyle, border: undefined };
        applyBorderToMergedCells(worksheet, 'B6', 'M7', columnStyle);

        // Product OfferTable
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

        // B8부터 오른쪽으로 한 칸씩 데이터 입력
        columnSample?.forEach((column, index) => {
            const cell = worksheet.getCell(8, 2 + index); // B열은 2이므로 2+index
            cell.value = column;
            cell.style = offerTableHeadStyle;
        });

        // lineItemData에서 데이터 가져오기
        lineItemData?.forEach((row, rowIndex) => {
            const rowData = [
                row.product || '',
                row.specification || '',
                row.surfaceFinish || '',
                row.usage || '',
                row.thickness || '',
                row.diameter || '',
                row.width || '',
                row.quantity || '',
                row.price || '',
                row.edge || '',
                row.unitMaxWeight || '',
                row.unitMinWeight || '',
            ];

            rowData?.forEach((data, colIndex) => {
                const cell = worksheet.getCell(9 + rowIndex, 2 + colIndex); // B9부터 시작
                cell.value = data;

                if (colIndex === 0) { // 첫 번째 데이터가 row.product
                    cell.style = {
                        ...offerTableBodyStyle,
                        fill: {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'F1F8E9' }
                        },
                    };
                } else {
                    cell.style = offerTableBodyStyle;
                }
            });
        });

        // lineItemData가 끝난 후의 행 번호 계산
        const lastRow = 9 + lineItemData.length;

        // Price Terms
        worksheet.mergeCells(`B${lastRow}:C${lastRow + 1}`);
        worksheet.getCell(`B${lastRow}`).value = 'Price Terms';
        worksheet.getCell(`B${lastRow}`).style = { ...columnStyle, border: undefined };
        applyBorderToMergedCells(worksheet, `B${lastRow}`, `C${lastRow + 1}`, columnStyle);

        worksheet.mergeCells(`D${lastRow}:M${lastRow + 1}`);
        worksheet.getCell(`D${lastRow}`).value = formData.priceTerms;
        worksheet.getCell(`D${lastRow}`).style = { ...dataStyle, border: undefined };
        applyBorderToMergedCells(worksheet, `D${lastRow}`, `M${lastRow + 1}`, dataStyle);

        // 다음 섹션들을 Price Terms 이후에 동적으로 배치
        const sections = [
            { label: 'Shipment', value: formData.shipment },
            { label: 'Payment Terms', value: formData.paymentTerms },
            { label: 'Destination', value: formData.destination },
            { label: 'Validity', value: formData.validity },
            { label: 'Remark', value: formData.remark },
            { label: 'Additional Message', value: formData.message || '전달사항 없음' },
        ];

        let startRow = lastRow + 2;

        sections.forEach(section => {
            worksheet.mergeCells(`B${startRow}:C${startRow + 1}`);
            worksheet.getCell(`B${startRow}`).value = section.label;
            worksheet.getCell(`B${startRow}`).style = { ...columnStyle, border: undefined };
            applyBorderToMergedCells(worksheet, `B${startRow}`, `C${startRow + 1}`, columnStyle);

            // HTML 콘텐츠를 Plain Text로 변환
            const plainText = section.label === 'Additional Message' ? htmlToText(section.value, { wordwrap: 130 }) : section.value;

            worksheet.mergeCells(`D${startRow}:M${startRow + 1}`);
            worksheet.getCell(`D${startRow}`).value = plainText;
            worksheet.getCell(`D${startRow}`).style = { ...dataStyle, border: undefined };
            applyBorderToMergedCells(worksheet, `D${startRow}`, `M${startRow + 1}`, dataStyle);

            startRow += 2; // 다음 섹션을 위해 두 행씩 이동
        });

        // 엑셀 파일 생성 및 다운로드
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${inquiryData.name}님의 OfferSheet.xlsx`);
    };

    return (
        <div className={Offer_Sheet} style={{ marginTop: '-2vh' }}>
            <div>
                {/* 토글 바 */}
                <ToggleBar
                    title={'OfferSheet'}
                    isChecked={isChecked}
                    setCheck={setCheck}
                />

                {/* 토글 클릭 후 오퍼시트 열림 */}
                {isChecked && (
                    <div>
                        <div>
                            {isOfferSheetItem === true ? (
                                <Button
                                    variant="outlined"
                                    onClick={handleExportToExcel}
                                    sx={{
                                        margin: '0 0 0 9vw',
                                        width: '120px',
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid #03507d',
                                        color: '#03507d',
                                        borderRadius: '7px',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            backgroundColor: '#03507d',
                                            color: '#FFFFFF',
                                        },
                                    }}
                                >엑셀로 추출</Button>
                            ) : (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={addRow}
                                        sx={{
                                            margin: '0.5vw 0.2vw 0 0.2vw',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #03507d',
                                            color: '#03507d',
                                            borderRadius: '7px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#03507d',
                                                color: '#FFFFFF',
                                            },
                                        }}
                                    >행 추가</Button>
                                    <Button
                                        variant="outlined"
                                        onClick={deleteRows}
                                        sx={{
                                            margin: '0.5vw 0.2vw 0 0.2vw',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #03507d',
                                            color: '#03507d',
                                            borderRadius: '7px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#03507d',
                                                color: '#FFFFFF',
                                            },
                                        }}
                                    >행 삭제</Button>
                                    <Button
                                        variant="outlined"
                                        onClick={copyRows}
                                        sx={{
                                            margin: '0.5vw 0.2vw 0 0.2vw',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #03507d',
                                            color: '#03507d',
                                            borderRadius: '7px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#03507d',
                                                color: '#FFFFFF',
                                            },
                                        }}
                                    >행 복사</Button>
                                </>
                            )}
                        </div>
                        {/* 텍스트 에디터 */}
                        <TextEditor
                            width={'85vw'}
                            margin={'0 auto 0 auto'}
                            inputHeight={'120px'}
                            inputMaxHeight={'120px'}
                            value={formData.message}
                            onChange={(content) =>
                                handleFormDataChange(
                                    'message', content)}
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
                            {isOfferSheetItem === true ? (
                                <OfferTableItem
                                    lineItems={lineItemData}
                                />
                            ) : (
                                <OfferTable
                                    rows={rows}
                                    onRowSelect={handleRowSelect}
                                    onInputChange={handleInputChange}
                                    selectedRows={selectedRows}
                                    receipts={receipts}
                                    isPreviewData={isPreviewData}
                                />
                            )}
                        </div>
                        {/* 그 외 카테고리 */}
                        <div>
                            <div>
                                <Category categoryName={'3. Price Term'} />
                                <Input
                                    width={'214px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px'}
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
                                    padding={'0 8px'}
                                    value={formData.shipment}
                                    onChange={(e) =>
                                        handleFormDataChange(
                                            'shipment', e.target.value)}
                                />
                            </div>
                            <div>
                                <Category categoryName={'5. Payment Term'} />
                                <Input
                                    width={'314px'}
                                    height={'28px'}
                                    border={'solid 1px #c1c1c1'}
                                    borderRadius={'8px'}
                                    padding={'0 8px'}
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
                                    padding={'0 8px'}
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
                                    padding={'0 8px'}
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
                                    padding={'0 8px'}
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

export default Offersheet;
