import React, { useEffect, useState } from 'react';
import { VocButton } from '../atoms/VocButton';
import { Col_Find_Manager_Button } from '../../assets/css/Voc.css';

export default function ColFindManagerButton({
    setOpenModal,
    colResManagerName,
    colResManagerDept,
    colDetail,
}) {
    useEffect(() => {
        if (colResManagerName) {
            setManagerName(colResManagerName);
        }
        if (colResManagerDept) {
            setManagerDept(colResManagerDept);
        }
    }, [colResManagerName, colResManagerDept]);

    const [managerName, setManagerName] = useState(
        colDetail?.colManagerToResponseDto.name || '',
    );
    const [managerDept, setManagerDept] = useState(
        colDetail?.colManagerToResponseDto.department || '',
    );

    const getDeptLabel = (dept) => {
        switch (dept) {
            case 'CRM':
                return '냉연마케팅실';
            case 'HWM':
                return '열연선재마케팅실';
            case 'EM':
                return '에너지조선마케팅실';
            case 'CMM':
                return '자동차소재마케팅실';
            case 'SFM':
                return '강건재가전마케팅실';
            case 'SM':
                return '스테인리스마케팅실';
        }
    };

    let managerInfo = `${getDeptLabel(
        managerDept,
    )} ${managerName} 품질 담당자에게 협업을 요청합니다.`;
    const warningMsg =
        '협업 요청 시 반드시 희망하는 협업 응답자를 선택해야 합니다.';

    return (
        <div className={Col_Find_Manager_Button}>
            <div>
                <VocButton
                    btnName={'검색'}
                    backgroundColor={'#ffffff'}
                    textColor={'#03507d'}
                    onClick={() => {
                        setOpenModal(true);
                    }}
                />
                {managerName || managerDept ? (
                    <div>{managerInfo}</div>
                ) : (
                    <div style={{ color: 'red' }}>{warningMsg}</div>
                )}
            </div>
        </div>
    );
}
