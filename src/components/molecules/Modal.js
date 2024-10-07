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
    Alert,
    Tabs,
    Tab,
    Box,
    Radio,
    Button, Grid, CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import { getInquiriesByProductType, putFavoriteInquiry, getFavoriteInquiriesByProductType } from '../../apis/api/inquiry';
import { productTypes } from '../../utils/inquiry';
import { useAuth } from '../../hooks/useAuth';

const Modal = ({ isOpen, onClose, productType, onSelect }) => {
    const { userId } = useAuth();

    const [loading, setLoading] = useState(true);
    const [inquiries, setInquiries] = useState([]);
    const [favoriteInquiries, setFavoriteInquiries] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() => {
        const fetchInquiries = async () => {
            if (productType === "") {
                setError("제품유형을 선택해 주세요.");
                return;
            }

            setError('')
            setLoading(true);
            try {
                const response = await getInquiriesByProductType(userId, productType);
                setInquiries(response || []);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
                setError('문제가 발생했습니다. 다시 시도해 주세요.');
            }
            setLoading(false);
        };

        const fetchFavoriteInquiries = async () => {
            if (productType === "") {
                setError("제품유형을 선택해 주세요.");
                return;
            }

            setError('');
            setLoading(true);
            try {
                const response = await getFavoriteInquiriesByProductType(userId, productType);
                setFavoriteInquiries(response || []);
            } catch (error) {
                console.error('Error fetching favorite inquiries:', error);
                setError('문제가 발생했습니다. 다시 시도해 주세요.');
            }
            setLoading(false);
        };

        if (isOpen) {
            fetchInquiries();
            fetchFavoriteInquiries();
        }
    }, [isOpen, userId, productType]);

    const handleExpandToggle = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleFavoriteToggle = async (inquiryId, index) => {
        try {
            const updatedInquiries = inquiries?.map((inquiry, i) =>
                i === index ? { ...inquiry, isFavorite: !inquiry.isFavorite } : inquiry
            );
            setInquiries(updatedInquiries);

            const updatedFavoriteInquiries = favoriteInquiries.map((inquiry) =>
                inquiry.inquiryId === inquiryId ? { ...inquiry, isFavorite: !inquiry.isFavorite } : inquiry
            );
            setFavoriteInquiries(updatedFavoriteInquiries);

            await putFavoriteInquiry(inquiryId);

            const response = await getFavoriteInquiriesByProductType(userId, productType);
            setFavoriteInquiries(response || []);
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            setInquiries(inquiries);
            setFavoriteInquiries(favoriteInquiries);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSelect = () => {
        if (selectedInquiry) {
            const selectedData = inquiries.find(inquiry => inquiry.inquiryId === selectedInquiry);
            onSelect([selectedData]);
            onClose();
            return [selectedData];
        }
    };

    const getColumnLabels = () => {
        const productTypeFields = productTypes[productType] || productTypes['CAR'];
        const labels = {};
        Object.keys(productTypeFields).forEach(key => {
            labels[key] = productTypeFields[key].label || key;
        });
        return labels;
    };

    const columnLabels = getColumnLabels();

    const getSequentialLineItemIds = (lineItems) => {
        const lineItemIds = lineItems.map(item => item.lineItemId);
        Math.min(...lineItemIds);
        const lineItemIdMap = lineItemIds
        .sort((a, b) => a - b)
        .reduce((acc, id, index) => {
            acc[id] = index + 1;
            return acc;
        }, {});

        return lineItemIdMap;
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle sx={{ position: 'relative', fontWeight: '800' }}>
                과거 주문 이력 조회
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
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {!error && (
                    <>
                        {loading ? (
                            <Grid container justifyContent="center" alignItems="center">
                                <CircularProgress />
                            </Grid>
                        ) : (
                          <>
                              <Box sx={{ bgcolor: '#ffffff', borderColor: 'divider', border: 'none' }}>
                                  <Tabs
                                      value={tabValue}
                                      onChange={handleTabChange}
                                      aria-label="customized tabs"
                                      sx={{
                                          '& .MuiTab-root': {
                                              transition: 'none',
                                              borderBottom: 'none',
                                              minWidth: 90,
                                              textAlign: 'center',
                                              padding: '10px 16px',
                                              bgcolor: '#ffffff',
                                              fontWeight: '700',
                                              color: '#c1c1c1 !important'
                                          },
                                          '& .Mui-selected': {
                                              color: '#03507d !important',
                                              bgcolor: '#ffffff',
                                          },
                                          '& .MuiTabs-indicator': {
                                              color: '#03507d',
                                          },
                                      }}
                                  >
                                      <Tab label="전체" />
                                      <Tab label="즐겨찾기" />
                                  </Tabs>
                              </Box>
                              <TableContainer component={Paper} sx={{ maxHeight: '400px', borderRadius: '0px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                      <div style={{ flex: '0 0 auto' }}>
                                          <Table style={{ tableLayout: 'fixed' }}>
                                              <TableHead>
                                                  <TableRow>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px', width: '60px' }} align="center"></TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">라인아이템 조회</TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">Inquiry 번호</TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">제품유형</TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">판매계약자</TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">산업분류</TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">고객사</TableCell>
                                                      <TableCell style={{ backgroundColor: '#e8f2f8', color: '#000000', fontWeight: '700', padding: '10px' }} align="center">즐겨찾기</TableCell>
                                                  </TableRow>
                                              </TableHead>
                                          </Table>
                                      </div>
                                      <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
                                          <Table style={{ tableLayout: 'fixed' }}>
                                              <TableBody>
                                                  {(tabValue === 0 ? inquiries : favoriteInquiries).map((inquiry, inquiryIndex) => {
                                                      const isExpanded = expandedRows[inquiryIndex];
                                                      const borderStyle = isExpanded ? '2.5px solid #7BCEFF' : 'none';

                                                      return (
                                                          <React.Fragment
                                                              key={inquiry.inquiryId}>
                                                              <TableRow
                                                                  hover={true}
                                                                  sx={{
                                                                      cursor: 'pointer',
                                                                      '&:hover': { backgroundColor: '#f6f6f6' },
                                                                      border: borderStyle,
                                                                      borderBottom: 'none'
                                                                  }}>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{
                                                                          padding: '5px',
                                                                          width: '60px'
                                                                      }}>
                                                                      <Radio
                                                                          checked={selectedInquiry
                                                                              === inquiry.inquiryId}
                                                                          onChange={() => setSelectedInquiry(
                                                                              inquiry.inquiryId)}
                                                                          value={inquiry.inquiryId}
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
                                                                      style={{ padding: '5px' }}>
                                                                      <IconButton
                                                                          onClick={() => handleExpandToggle(
                                                                              inquiryIndex)}
                                                                      >
                                                                          {expandedRows[inquiryIndex]
                                                                              ?
                                                                              <ExpandLessIcon
                                                                                  style={{ color: '#d3d3d3' }} />
                                                                              :
                                                                              <ExpandMoreIcon
                                                                                  style={{ color: '#d3d3d3' }} />}
                                                                      </IconButton>
                                                                  </TableCell>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{ padding: '5px' }}>{inquiry.inquiryId}</TableCell>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{ padding: '5px' }}>{inquiry.productType}</TableCell>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{ padding: '5px' }}>{inquiry.salesPerson}</TableCell>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{ padding: '5px' }}>{inquiry.industry}</TableCell>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{ padding: '5px' }}>{inquiry.customerName}</TableCell>
                                                                  <TableCell
                                                                      align="center"
                                                                      style={{ padding: '5px' }}>
                                                                      <IconButton
                                                                          color={inquiry.isFavorite
                                                                              ? 'primary'
                                                                              : 'default'}
                                                                          onClick={() => handleFavoriteToggle(
                                                                              inquiry.inquiryId,
                                                                              inquiryIndex)}
                                                                      >
                                                                          {inquiry.isFavorite
                                                                              ?
                                                                              <Star />
                                                                              :
                                                                              <StarBorder />}
                                                                      </IconButton>
                                                                  </TableCell>
                                                              </TableRow>
                                                              {expandedRows[inquiryIndex]
                                                                  && inquiry.lineItemList
                                                                  && (
                                                                      <TableRow sx={{ border: borderStyle, borderTop: 'none' }}>
                                                                          <TableCell
                                                                              colSpan={8}
                                                                              sx={{ padding: 0 }}>
                                                                              <div
                                                                                  style={{
                                                                                      overflowX: 'auto',
                                                                                      whiteSpace: 'nowrap',
                                                                                      borderTop: '1px solid #e0e0e0',
                                                                                      padding: '12px'
                                                                                  }}>
                                                                                  <Table
                                                                                      style={{
                                                                                          tableLayout: 'auto',
                                                                                          border: '1px solid #e0e0e0'
                                                                                      }}>
                                                                                      <TableHead
                                                                                          style={{ backgroundColor: '#ebebeb' }}>
                                                                                          <TableRow>
                                                                                              {Object.keys(
                                                                                                  inquiry.lineItemList[0]
                                                                                                  || {}).map(
                                                                                                  (key) => (
                                                                                                      key
                                                                                                      !== 'inquiryId'
                                                                                                      && key
                                                                                                      !== 'isActivated'
                                                                                                      && (
                                                                                                          <TableCell
                                                                                                              key={key}
                                                                                                              style={{
                                                                                                                  fontWeight: '700',
                                                                                                                  padding: '7px',
                                                                                                                  fontSize: '14px'
                                                                                                              }}
                                                                                                              align="center">
                                                                                                              {columnLabels[key]
                                                                                                                  || key}
                                                                                                          </TableCell>
                                                                                                      )
                                                                                                  ))}
                                                                                          </TableRow>
                                                                                      </TableHead>
                                                                                      <TableBody>
                                                                                          {inquiry.lineItemList.map(
                                                                                              (lineItem,
                                                                                                  lineIndex) => {
                                                                                                  const lineItemIdMap = getSequentialLineItemIds(
                                                                                                      inquiry.lineItemList);
                                                                                                  return (
                                                                                                      <TableRow
                                                                                                          key={lineIndex}
                                                                                                          sx={{ height: '40px' }}>
                                                                                                          {Object.entries(
                                                                                                              lineItem).map(
                                                                                                              ([key, value]) => (
                                                                                                                  key
                                                                                                                  !== 'inquiryId'
                                                                                                                  && key
                                                                                                                  !== 'isActivated'
                                                                                                                  && (
                                                                                                                      <TableCell
                                                                                                                          key={key}
                                                                                                                          align="center"
                                                                                                                          sx={{
                                                                                                                              padding: '7px',
                                                                                                                              fontSize: '14px'
                                                                                                                          }}>
                                                                                                                          {key
                                                                                                                          === 'lineItemId'
                                                                                                                              ? lineItemIdMap[lineItem[key]]
                                                                                                                              : (typeof value
                                                                                                                              === 'boolean'
                                                                                                                                  ? (value
                                                                                                                                      ? 'Yes'
                                                                                                                                      : 'No')
                                                                                                                                  : value)}
                                                                                                                      </TableCell>
                                                                                                                  )
                                                                                                              ))}
                                                                                                      </TableRow>
                                                                                                  );
                                                                                              })}
                                                                                      </TableBody>
                                                                                  </Table>
                                                                              </div>
                                                                          </TableCell>
                                                                      </TableRow>
                                                                  )}
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
                                      disabled={!selectedInquiry}
                                      style={{ backgroundColor: '#03507d', color: '#e8f2f8' }}
                                  >
                                      선택
                                  </Button>
                              </Box>
                          </>
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
