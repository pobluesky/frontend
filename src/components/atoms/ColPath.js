import React from 'react';
import arrow from '../../assets/css/icons/arrow.svg';
import { Link } from 'react-router-dom';
import { _Link } from '../../assets/css/Inquiry.css';

export default function ColPath({
    largeCategory,
    mediumCategory,
    smallCategory,
}) {
    return (
        <div
            style={{
                width: '95%',
                margin: '10px 0 0 0',
                padding: '50px 50px 30px 50px',
                color: '#616161',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <span>{largeCategory}</span>
            <img src={arrow} alt="arrow" />
            <Link to="/voc-list/collaboration" className={_Link}>
                <span>{mediumCategory}</span>
            </Link>
            {smallCategory && <img src={arrow} alt="arrow" />}
            <span>{smallCategory}</span>
        </div>
    );
}
