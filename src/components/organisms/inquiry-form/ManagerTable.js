import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { putManagerAllocate } from '../../../apis/api/inquiry';
import { Button } from '@mui/material';

function Row({ row, role, onCheckboxChange, salesAllocate, qualityAllocate, ref }) {
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/inq-list/${role}/${row.processedInquiryId}`);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        onCheckboxChange(e.target.checked, row.processedInquiryId);
    };

    const handleSubmit = async () => {
        try {
            if (salesAllocate) {
                await putManagerAllocate(row.processedInquiryId);
                console.log('Manager Allocation Success:', row.processedInquiryId);
            } else {
                return;
            }
        } catch (error) {
            console.log('Error putting Manager Allocation:', error);
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }))

    return (
        <React.Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' }}}
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
            >
                <TableCell
                            component="th"
                            scope="row"
                           className="custom-table-cell"
                           sx={{ paddingLeft: '90px' }}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleCheckboxChange}
                    />
                </TableCell>
                <TableCell className="custom-table-cell" align="left">{row.processedInquiryId}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.salesPerson}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.inquiryType}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.productType}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.customerName}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.salesManagerName}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.qualityManagerName}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.progress}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.country}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.corporate}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.corporationCode}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.industry}</TableCell>
            </TableRow>
            <TableRow>
            </TableRow>
        </React.Fragment>
    );
}

const ForwardedRow = forwardRef(Row);

export default function CollapsibleTable({
    rows,
    currentPage,
    rowsPerPage,
    totalRows,
    handlePageChange,
    handleRowsPerPageChange,
    role
}) {
    const rowRef = useRef();

    const [salesAllocate, setSalesAllocate] = useState(false);
    const [qualityAllocate, setQualityAllocate] = useState(false);
    console.log("salesAllocate: ", salesAllocate);
    console.log("qualityAllocate: ", qualityAllocate);

    const handleCheckboxChange = async (isChecked) => {
        if (isChecked === true) {
                if (role === 'sales') {
                    setSalesAllocate(true);
                } else {
                    setQualityAllocate(true);
                }
            } else {
                setSalesAllocate(false);
                setQualityAllocate(false);
                return;
            }
    };

    return (
        <Paper>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '10px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#03507d' }}>
                            <TableCell className="custom-table-cell" sx={{ color: '#ffffff', paddingLeft: '60px'}}>
                                <Button
                                    onClick={() => {
                                        rowRef.current.handleSubmit();
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        color: '#03507d',
                                        width: '85px',
                                        borderRadius: '10px',
                                        fontWeight: '700',
                                        '&:hover': {
                                            backgroundColor: '#03507d',
                                            color: '#ffffff',
                                        },
                                    }}>담당자 배정
                                </Button>
                            </TableCell>
                            <TableCell className="custom-table-cell" sx={{ color: '#ffffff' }}>Inquiry No.</TableCell>
                            <TableCell className="custom-table-cell" sx={{ color: '#ffffff' }}>판매계약자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>문의유형</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>제품</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>고객사</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>판매담당자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>품질담당자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>진행현황</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>국가</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>판매상사</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>법인코드</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff' }}>산업분류</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.processedInquiryId} row={row} role={role}
                                 onCheckboxChange={handleCheckboxChange} salesAllocate={salesAllocate} qualityAllocate={qualityAllocate}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalRows}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                labelRowsPerPage="Rows per page:"
                rowsPerPageOptions={[10, 15, 25]}
            />
        </Paper>
    );
}
