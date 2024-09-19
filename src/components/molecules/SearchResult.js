import React from 'react';
import {
    _Text,
    _searchCount,
} from '../../assets/css/Inquiry.css';
import Button from '../atoms/Button';

const SearchResult = ({ searchResult }) => {
    return (
        <div>
            <p className={_Text}>
                검색 결과 : 총&nbsp;
                <span className={_searchCount}>{searchResult}</span>
                &nbsp;건
            </p>
            {/*
            <Button
                btnName={'엑셀 다운로드'}
                textColor={'#ffffff'}
                borderRadius={'17px'}
                width={'120px'}
                height={'35px'}
                fontWeight={'800'}
                backgroundColor={'#03507D'}
                border={'none'}
                margin={'25px 0 0 20px'}
            />*/}
        </div>
    );
};

export default SearchResult;
