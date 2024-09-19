import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getCustomerInquiriesByParameter } from '../../apis/api/inquirySearch';
import InqPath from '../../components/atoms/InqPath';
import SearchResult from '../../components/molecules/SearchResult';
import InquirySearchBox from '../../components/organisms/inquiry-form/InquirySearchBox';
import CollapsibleTable from '../../components/organisms/inquiry-form/CustomerTable';
import { InqTableContainer } from '../../assets/css/Inquiry.css';

const CustomerInqTableList = () => {
    const { userId, role } = useAuth();
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [searchParams, setSearchParams] = useState({});
    const contentRef = useRef(null);
    const paginationRef = useRef(null);

    const getInquiryDataByParameter = async (queryParams = {}) => {
        if (!userId) return;

        try {
            const response = await getCustomerInquiriesByParameter(
                userId,
                queryParams,
            );
            setRows(response);
            setCurrentPage(0);

            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.log('Error fetching Inquiry:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            getInquiryDataByParameter(searchParams);
        }
    }, [userId, searchParams]);

    const paginatedRows = rows.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage,
    );

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        if (paginationRef.current) {
            paginationRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 15));
        setCurrentPage(0);
    };

    const handleSearch = (newSearchParams) => {
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className={InqTableContainer}>
            <InqPath
                largeCategory={'Inquiry'}
                mediumCategory={'Inquiry 조회'}
            />
            <InquirySearchBox onSearch={handleSearch} title={'Inquiry 조회'} />
            <SearchResult searchResult={`${rows.length}`} />
            <CollapsibleTable
                rows={paginatedRows}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                totalRows={rows.length}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                paginationRef={paginationRef}
                role={role}
            />
        </div>
    );
};

export default CustomerInqTableList;
