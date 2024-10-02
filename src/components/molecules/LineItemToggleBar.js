import React, { useState } from 'react';
import Toggle from '../atoms/Toggle';
import { _ToggleOpen, _ToggleClose } from '../../assets/css/Form.css';
import { Button } from '@mui/material';
import FileUploadModal from './FileUploadModal';
import Modal from './Modal';

const LineItemToggleBar = ({
    title,
    isChecked,
    setCheck,
    productType,
    onLineItemsChange,
    handleLineItemsChangeByOCR,
    onSelect,
    isUpdate,
    setError,
}) => {
    const [lineItemsFromOCR, setLineItemsFromOCR] = useState([]);
    const borderRadius = isChecked ? '7px 7px 0 0' : '7px 7px 7px 7px';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(true);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelect = (selectedData) => {
        onLineItemsChange(selectedData);
        onSelect(selectedData[0]?.lineItemList);
        closeModal();
        return selectedData[0]?.lineItemList;
    };

    const handleLineItemsFromOCR = (newLineItems) => {
        setLineItemsFromOCR(newLineItems);

        if (handleLineItemsChangeByOCR) {
            handleLineItemsChangeByOCR(newLineItems);
        }
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
                            <Modal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                productType={productType}
                                onSelect={handleSelect}
                                setError={setError}
                            />
                            &nbsp;&nbsp;
                            {isFileModalOpen && (
                                <FileUploadModal
                                    productType={productType}
                                    onLineItemsUpdate={handleLineItemsFromOCR}
                                    setError={setError} />
                                )}
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
