import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Radio,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllSalesManager, getAllQualityManager } from '../../apis/api/manager';
import { useAuth } from '../../hooks/useAuth';

const ManagerModal = ({ title, isOpen, onClose, onSelect }) => {
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const { role } = useAuth();

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                if (role === 'customer') {
                    const response = await getAllSalesManager();
                    setManagers(Array.isArray(response.data) ? response.data : []);
                } else if (role === 'sales'){
                    const response = await getAllQualityManager();
                    setManagers(Array.isArray(response.data) ? response.data : []);
                }
            } catch (error) {
                console.error('Error fetching Managers:', error);
                setManagers([]);
            }
        };

        if (isOpen) {
            fetchManagers();
        }
    }, [isOpen]);

    const handleSelect = () => {
        if (selectedManager) {
            const selectedData = managers.find(managers => managers.userId === selectedManager);
            onSelect([selectedData]);
            onClose();
            return [selectedData];
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '780px',
                    maxWidth: '780px',
                },
            }}
        >
            <DialogTitle sx={{ position: 'relative', fontWeight: '800' }}>
                {title}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ marginRight: '10px' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper} sx={{ maxHeight: '400px', borderRadius: '0px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: '0 0 auto' }}>
                            <Table style={{ tableLayout: 'fixed' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: '#eeefff', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">선택</TableCell>
                                        <TableCell style={{ backgroundColor: '#eeefff', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">사번</TableCell>
                                        <TableCell style={{ backgroundColor: '#eeefff', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">이름</TableCell>
                                        <TableCell style={{ backgroundColor: '#eeefff', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">부서</TableCell>
                                        <TableCell style={{ backgroundColor: '#eeefff', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">이메일</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </div>
                        <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
                            <Table style={{ tableLayout: 'fixed' }}>
                                <TableBody>
                                    {managers?.map((manager) => {
                                        return (
                                            <React.Fragment
                                                key={manager.userId}>
                                                <TableRow
                                                    hover={true}
                                                    sx={{
                                                        cursor: 'pointer',
                                                        '&:hover': { backgroundColor: '#f6f6f6' },
                                                        borderBottom: 'none'
                                                    }}>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            padding: '3px',
                                                            width: '130px'
                                                        }}>
                                                        <Radio
                                                            checked={selectedManager
                                                                === manager.userId}
                                                            onChange={() => setSelectedManager(
                                                                manager.userId)}
                                                            value={manager.userId}
                                                            sx={{
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: 18,
                                                                },
                                                                color: '#d3d3d3',
                                                                '&.Mui-checked': {
                                                                    color: '#03507d',
                                                                },
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ padding: '3px' }}>{manager.empNo}</TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ padding: '3px' }}>{manager.name}</TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ padding: '3px' }}>{manager.department}</TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ padding: '3px', fontSize: '12.9px' }}>{manager.email}</TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSelect}
                        disabled={!selectedManager}
                        style={{ backgroundColor: '#03507d', color: '#e8f2f8' }}
                    >
                        선택
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ManagerModal;
