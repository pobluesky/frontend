import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import search from '../../assets/css/icons/voc-search.svg';
import { Col_Find_Manager_Filter_Panel } from '../../assets/css/Voc.css';

export default function ColReqFilterPannel({
    setOpenModal,
    colResManagerName,
    colResManagerDept,
}) {
    const [managerInfo, setManagerInfo] = useState('');

    const selectedManager = () => {
        if (colResManagerDept && colResManagerName) {
            setManagerInfo(
                `${colResManagerDept} 부서 품질 담당자 ${colResManagerName}님에게 협업 요청을 보냅니다.`,
            );
        }
    };

    useEffect(() => {
        selectedManager();
    }, [colResManagerName, colResManagerDept]);

    return (
        <>
            <div className={Col_Find_Manager_Filter_Panel}>
                <div>
                    {/* 아이콘 + 협업 요청 */}
                    <div>
                        <img src={search} />
                        <div>협업 요청</div>
                    </div>
                    {/* 담당자 조회 */}
                    <div>
                        <div>
                            <div>담당자 조회</div>
                            <Button
                                btnName={'검색'}
                                width={'84px'}
                                height={'28px'}
                                margin={'0 0 0 24px'}
                                backgroundColor={'#03507d'}
                                textColor={'#ffffff'}
                                border={'none'}
                                borderRadius={'20px'}
                                onClick={() => {
                                    setOpenModal(true);
                                }}
                            />
                            <div>{managerInfo}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
