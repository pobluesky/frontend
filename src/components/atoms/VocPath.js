import React from 'react';
import arrow from '../../assets/css/icons/arrow.svg';
import { Link } from 'react-router-dom';
import { _Link } from '../../assets/css/Inquiry.css';

function VocPath({ largeCategory, mediumCategory, smallCategory }) {
    return (
        <div
            style={{
                width: '95%',
                margin: '50px 0 0 50px',
                color: '#616161',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Link to="/voc-main" className={_Link}>
                <span>{largeCategory}</span>
            </Link>
            <img src={arrow} alt="arrow" />
            <Link to="/voc-list/question" className={_Link}>
                <span>{mediumCategory}</span>
            </Link>
            {smallCategory && (
                <img src={arrow} alt="arrow" />
            )}
            <Link to="/voc-list/question" className={_Link}>
                <span>{smallCategory}</span>
            </Link>
        </div>
    );
}

export default VocPath;
