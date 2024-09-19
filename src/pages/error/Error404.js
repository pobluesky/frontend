import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { Error_404 } from '../../assets/css/Error.css';

export default function Error404() {
    const navigate = useNavigate();

    return (
        <div className={Error_404}>
            <div>404</div>
            <div>올바르지 않은 접근입니다.</div>
            <Button
                btnName={'메인 페이지로 돌아가기'}
                width={'288px'}
                height={'48px'}
                border={'1px solid #c1c1c1'}
                borderRadius={'8px'}
                fontSize={'24px'}
                backgroundColor={'#ffffff'}
                onClick={() => {
                    navigate('/');
                }}
            />
        </div>
    );
}
