import React, { useState } from 'react';
import Toggle from '../atoms/Toggle';
import { _ToggleOpen, _ToggleClose } from '../../assets/css/Form.css';
import { Button } from '@mui/material';
import Modal from './Modal';

const LineItemToggleBar = ({ title, isChecked, setCheck, productType, onLineItemsChange, onSelect, isUpdate }) => {
    const borderRadius = isChecked ? '20px 20px 0 0' : '20px 20px 20px 20px';

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelect = (selectedData) => {
        onLineItemsChange(selectedData);
        onSelect(selectedData[0]?.lineItemList);
        closeModal();
        return selectedData[0]?.lineItemList;
    };

    return (
        <div>
            {/* Toggle Bar */}
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
                    { isUpdate ? (
                        <>
                            <Button
                                style={{
                                    marginLeft: 'auto',
                                    color: '#03507D',
                                    backgroundColor: '#ffffff',
                                    cursor: 'pointer',
                                }}
                                onClick={openModal}
                            >
                                과거이력조회
                            </Button>
                            <Modal isOpen={isModalOpen} onClose={closeModal} productType={productType} onSelect={handleSelect} />
                        </>
                    ) : (
                        ''
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

export default LineItemToggleBar;
