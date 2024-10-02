import React, { useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import ForwardedRow from './Row';

export default function CollapsibleTable({
    rows,
    currentPage,
    rowsPerPage,
    totalRows,
    handlePageChange,
    handleRowsPerPageChange,
    role,
}) {
    const rowRefs = useRef([]);

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
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700', paddingLeft: '40px' }}>Inquiry No.</TableCell>
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700' }}>문의유형</TableCell>
                            <TableCell className="custom-table-cell" sx={{ color: '#ffffff', fontWeight: '700' }}>판매계약자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>제품</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>고객사</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>국가</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>판매상사</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>법인코드</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>산업분류</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>판매담당자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>품질담당자</TableCell>
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700' }}>문의일자</TableCell>
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700' }}>진행현황</TableCell>
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700' }}>Inquiry 진행률</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <ForwardedRow
                                key={row.processedInquiryId}
                                row={row}
                                role={role}
                                ref={(el) => rowRefs.current[index] = el}
                            />
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
