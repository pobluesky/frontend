import React, { useEffect, useState } from 'react';
import close from '../../assets/css/icons/close.svg';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { VocButton } from '../atoms/VocButton';
import { useAuth } from '../../hooks/useAuth';
import { getAllManager } from '../../apis/api/manager';
import { Col_Find_Manager_Modal } from '../../assets/css/Voc.css';

export default function ColFindManagerModal({
    openModal,
    setOpenModal,
    setColResId,
    setColResManagerName,
    setColResManagerDept,
}) {
    const { userId } = useAuth();
    const [managerInfo, setManagerInfo] = useState([]);
    const [managerName, setManagerName] = useState('');
    const [filteredManagerInfo, setFilteredManagerInfo] = useState([]);

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            managerSearch();
        }
    };

    // 담당자 전체 조회
    const fetchGetAllManager = async () => {
        try {
            const response = await getAllManager();
            setManagerInfo(response.data);
            setFilteredManagerInfo(response.data);
        } catch (error) {
            console.log('담당자 전체 조회 실패: ', error);
        }
    };

    const managerSearch = () => {
        const filtered = managerInfo.filter((manager) =>
            manager.name.includes(managerName),
        );
        setFilteredManagerInfo(filtered);
    };

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

    useEffect(() => {
        fetchGetAllManager();
    }, [userId, openModal]);

    return (
        <div className={Col_Find_Manager_Modal}>
            <div>
                <div>
                    <Input
                        type="text"
                        value={managerName}
                        width={'196px'}
                        height={'36px'}
                        margin={'0 24px 0 0'}
                        padding={'0px 12px 0px 12px'}
                        border={'1px solid #8b8b8b'}
                        placeholder={'담당자 이름 조회'}
                        onChange={(e) => setManagerName(e.target.value)}
                        onKeyDown={enterKeyDown}
                    />
                    <VocButton
                        btnName={'검색'}
                        backgroundColor={'#03507d'}
                        textColor={'#ffffff'}
                        margin={'0 24px 0 0'}
                        onClick={() => {
                            managerSearch();
                        }}
                    />
                    <VocButton
                        btnName={'전체 보기'}
                        backgroundColor={'#ffffff'}
                        textColor={'#03507d'}
                        onClick={() => {
                            setFilteredManagerInfo(managerInfo);
                        }}
                    />
                    <div>
                        <Button
                            width={'36px'}
                            height={'36px'}
                            backgroundColor={'transparent'}
                            border={'none'}
                            imgSrc={close}
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        />
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>회원번호</th>
                                <th>이름</th>
                                <th>부서</th>
                                <th>사번</th>
                                <th>권한</th>
                                <th>이메일</th>
                                <th>연락처</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredManagerInfo
                                .filter((manager) => manager.role === 'QUALITY')
                                .map((manager) => (
                                    <tr
                                        key={manager.userId}
                                        onClick={() => {
                                            setColResId(manager.userId);
                                            setColResManagerName(manager.name);
                                            setColResManagerDept(
                                                manager.department,
                                            );
                                            setOpenModal(false);
                                        }}
                                    >
                                        <td>{manager.userId}</td>
                                        <td>{manager.name}</td>
                                        <td>
                                            {getDeptLabel(manager.department)}
                                        </td>
                                        <td>{manager.empNo}</td>
                                        <td>품질팀</td>
                                        <td>{manager.email}</td>
                                        <td>{manager.phone}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
