import React from 'react';

function ToggleButton({ btnName, isActive, onClick, width }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: `${width}`,
                backgroundColor: isActive ? '#03507D' : '#ffffff',
                color: isActive ? '#ffffff' : '#03507D',
                marginLeft: '20px',
                padding: '5px',
                border: `1px solid ${isActive ? '#ffffff' : '#03507D'}`,
                borderRadius: '20px',
                fontWeight: '800',
                fontSize: '15px',
                cursor: 'pointer',
            }}
        >
            {btnName}
        </button>
    );
}

export default ToggleButton;
