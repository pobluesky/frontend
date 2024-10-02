import React, { useState } from 'react';
import Toggle from '../atoms/Toggle';
import { _ToggleOpen, _ToggleClose } from '../../assets/css/Form.css';
import { Button, Chip } from '@mui/material';
import ManagerModal from './ManagerModal';
import { useAuth } from '../../hooks/useAuth';
import { _reviewButton } from '../../assets/css/Form.css';

const ToggleBar = ({
    title,
    isChecked,
    setCheck,
    isForm,
    isUpdate,
    progress,
    setManagerId,
    salesManagerName,
    qualityManagerName,
    onManagerSelect,
    handleIsPreview,
    isPreviewData,
}) => {

    const borderRadius = isChecked ? '7px 7px 0 0' : '7px 7px 7px 7px';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [managerInfo, setManagerInfo] = useState([]);
    const { role } = useAuth();

    const handleSelect = (selectedData) => {
        closeModal();
        setManagerInfo(selectedData);
        onManagerSelect(selectedData[0]?.userId);
        if (setManagerId) {
            setManagerId(selectedData[0]?.userId);
        }
    }

    return (
        <div>
            {/* 토글 바 */}
            {isChecked ? (
                <div className={_ToggleOpen} style={{ borderRadius }}>
                    <Toggle isChecked={isChecked} setCheck={setCheck} />
                    &nbsp;&nbsp;
                    <span
                        style={{
                            color: '#ffffff',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        &nbsp;&nbsp;{title}
                    </span>
                    {(role === 'customer' && title === '기본정보' && isForm && !isUpdate) && (
                        <>
                            <Button
                                style={{
                                    marginLeft: 'auto',
                                    color: '#ffffff',
                                    backgroundColor: '#03507D',
                                    fontSize: '15px',
                                    fontWeight: '800',
                                }}
                                disabled
                            >
                                {managerInfo[0]?.name || '-'}
                            </Button>
                        <Button
                            style={{
                                marginLeft: '10px',
                                color: '#03507D',
                                backgroundColor: '#ffffff',
                                cursor: 'pointer',
                            }}
                            onClick={openModal}
                        >
                            담당자 지정
                        </Button>
                            {isForm && (
                                <ManagerModal
                                    title={'판매 담당자 지정'}
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    onSelect={handleSelect}
                                />
                            )}
                            {progress === 'FIRST_REVIEW_COMPLETED' && (
                                <ManagerModal
                                    title={'품질 담당자 지정'}
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    onSelect={handleSelect}
                                />
                            )}
                        </>
                    )}

                    {(role === 'customer' && title === '기본정보' && !isForm && isUpdate) && (
                        <>
                            <Button
                                style={{
                                    marginLeft: 'auto',
                                    color: '#ffffff',
                                    backgroundColor: '#03507D',
                                    fontSize: '15px',
                                    fontWeight: '800',
                                }}
                                disabled
                            >
                                {salesManagerName}
                            </Button>
                        </>
                    )}

                    {(role === 'sales' && title === '기본정보' && progress === 'FIRST_REVIEW_COMPLETED') && (
                        <>
                            <Button
                                style={{
                                    marginLeft: 'auto',
                                    color: '#ffffff',
                                    backgroundColor: '#03507D',
                                    fontSize: '17px',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                disabled
                            >
                                <Chip
                                    label="판매담당자"
                                    style={{
                                        marginRight: '10px',
                                        backgroundColor: '#007FFF',
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                    }}
                                    size="medium"
                                />
                                {salesManagerName}
                            </Button>
                            <Button
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: '#03507D',
                                    fontSize: '17px',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                disabled
                            >
                                <Chip
                                    label="품질담당자"
                                    style={{
                                        marginRight: '10px',
                                        backgroundColor: '#007FFF',
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                    }}
                                    size="medium"
                                />
                                {managerInfo[0]?.name || '-'}
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '10px',
                                    color: '#03507D',
                                    backgroundColor: '#ffffff',
                                    cursor: 'pointer',
                                }}
                                onClick={openModal}
                            >
                                담당자 지정
                            </Button>
                            {isForm && (
                                <ManagerModal
                                    title={'판매 담당자 지정'}
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    onSelect={handleSelect}
                                />
                            )}
                            {progress === 'FIRST_REVIEW_COMPLETED' && (
                                <ManagerModal
                                    title={'품질 담당자 지정'}
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                    onSelect={handleSelect}
                                />
                            )}
                        </>
                    )}

                    {(title === '기본정보' && !isForm && role === 'customer' && !isUpdate) && (
                        <Button
                            style={{
                                marginLeft: 'auto',
                                color: '#ffffff',
                                backgroundColor: '#03507D',
                                fontSize: '17px',
                                fontWeight: '900',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            disabled
                        >
                            <Chip
                                label="담당자"
                                style={{
                                    marginRight: '10px',
                                    backgroundColor: '#007FFF',
                                    color: '#ffffff',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                }}
                                size="medium"
                            />
                            {salesManagerName}
                        </Button>
                    )}
                    {(title === '기본정보' && !isForm && progress !== 'FIRST_REVIEW_COMPLETED' && (role === 'sales' || role === 'quality')) && (
                        <>
                        <Button
                            style={{
                                marginLeft: 'auto',
                                color: '#ffffff',
                                backgroundColor: '#03507D',
                                fontSize: '17px',
                                fontWeight: '900',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            disabled
                        >
                            <Chip
                                label="판매담당자"
                                style={{
                                    marginRight: '10px',
                                    backgroundColor: '#007FFF',
                                    color: '#ffffff',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                }}
                                size="medium"
                            />
                            {salesManagerName}
                        </Button>
                        <Button
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#03507D',
                                fontSize: '17px',
                                fontWeight: '900',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            disabled
                        >
                            <Chip
                                label="품질담당자"
                                style={{
                                    marginRight: '10px',
                                    backgroundColor: '#007FFF',
                                    color: '#ffffff',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                }}
                                size="medium"
                            />
                            {qualityManagerName}
                        </Button>
                        </>
                    )}
                    {isPreviewData && (
                        <button
                            className={_reviewButton}
                            onClick={handleIsPreview}
                        >시연용</button>
                    )}
                </div>
            ) : (
                <div className={_ToggleClose} style={{ borderRadius }}>
                    <Toggle isChecked={isChecked} setCheck={setCheck} />
                    &nbsp;&nbsp;
                    <span
                        style={{
                            color: '#03507D',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        {title}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ToggleBar;
