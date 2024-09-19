import React, { useEffect, useRef, useState } from 'react';
import InquiryItem from '../../components/organisms/InquiryItem';
import InqPath from "../../components/atoms/InqPath";
import InquirySearchBox from "../../components/organisms/InquirySearchBox";
import SearchResult from "../../components/molecules/SearchResult";
import { _Link, Paging, PagingButton, PagingArrowButton } from "../../assets/css/Inquiry.css";
import { useAuth } from '../../hooks/useAuth';
import { getInquiry } from '../../apis/api/inquiry';
import { Link } from 'react-router-dom';

const CustomerInqList = () => {
    const { userId } = useAuth();
    const [inquiryData, setInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const contentRef = useRef(null);

    const getInquiryData = async (page) => {
        if (!userId) {
            return;
        }
        try {
            const response = await getInquiry(userId, page);
            setInquiries(response.inquiryInfo);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
            // 페이지 데이터 로드 후, 화면을 상단으로 스크롤
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.log('Error fetching Inquiry:', error);
        }
    };

    useEffect(() => {
        getInquiryData(currentPage);
    }, [userId, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <InqPath largeCategory={'Inquiry'} mediumCategory={'Inquiry 조회'} />
            <InquirySearchBox />
            <SearchResult searchResult={`${totalElements}`} />

            <div ref={contentRef} className={_Link}>
                {inquiryData.length > 0 ? (
                    inquiryData.map(data => (
                        <Link
                            to={`/inq-list/customer/${data.inquiryId}`}
                            key={data.inquiryId}
                            style={{ paddingBottom: "20px", textDecoration: "none" }}
                        >
                            <InquiryItem inquiryData={data} />
                        </Link>
                    ))
                ) : (
                    <p>데이터가 없습니다.</p>
                )}
            </div>

            <div className={Paging}>
                {/* 페이지 버튼 */}
                <button
                    className={PagingArrowButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    ◀
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        className={PagingButton}
                        key={index}
                        onClick={() => handlePageChange(index)}
                        disabled={index === currentPage}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={PagingArrowButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    ►
                </button>
            </div>
        </div>
    );
};

export default CustomerInqList;
