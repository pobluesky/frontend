import React from 'react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Voc_Page_Button } from '../../assets/css/Voc.css';

export default function VocPageButton({ totalPages, currentPage, setPage }) {
    const goToPrevious = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setPage(currentPage + 1);
        }
    };

    const goToFirst = () => {
        setPage(1);
    };

    const goToLast = () => {
        setPage(totalPages);
    };

    const clickPageButton = (page) => {
        setPage(page);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages > 10) {
            if (currentPage <= 6) {
                pageNumbers.push(1, 2, 3, 4, 5, 6, 7, '...', totalPages);
            } else if (currentPage >= totalPages - 5) {
                pageNumbers.push(
                    1,
                    '...',
                    totalPages - 6,
                    totalPages - 5,
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                );
            } else {
                pageNumbers.push(
                    1,
                    '...',
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                    '...',
                    totalPages,
                );
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return (
        <div className={Voc_Page_Button}>
            <button onClick={goToFirst} disabled={currentPage === 1}>
                <FirstPageIcon />
            </button>

            <button onClick={goToPrevious} disabled={currentPage === 1}>
                <KeyboardArrowLeftOutlinedIcon />
            </button>

            <div>
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            typeof page === 'number' && clickPageButton(page)
                        }
                        style={{
                            fontWeight:
                                currentPage === page ? 'bold' : 'normal',
                        }}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button onClick={goToNext} disabled={currentPage === totalPages}>
                <KeyboardArrowRightOutlinedIcon />
            </button>

            <button onClick={goToLast} disabled={currentPage === totalPages}>
                <LastPageIcon />
            </button>
        </div>
    );
}
