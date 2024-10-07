import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { _Text, _searchCount } from '../../assets/css/Inquiry.css';

const SearchResult = ({ searchResult }) => {
    const navigate = useNavigate();
    const { role } = useAuth();

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className={_Text}>
                검색 결과 : 총&nbsp;
                <span className={_searchCount}>{searchResult}</span>
                &nbsp;건
            </p>
            {role === 'customer' && (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        marginLeft: '20px',
                        backgroundColor: '#ffffff',
                        color: '#03507d',
                        width: '100px',
                        height: '40px',
                        padding: '0',
                        borderRadius: '10px',
                        fontWeight: '700',
                        border: '1px solid #03507d',
                        '&:hover': {
                            backgroundColor: '#03507d',
                            color: '#ffffff',
                        },
                    }}
                    onClick={() => navigate('/inq-form/customer')}
                >
                    Inquiry 등록
                </Button>
            )}
        </div>
    );
};

export default SearchResult;
