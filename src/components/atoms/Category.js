import React from 'react';

function Category({ categoryName }) {
    return (
        <div
            style={{
                width: '10vw',
                height: '28px',
                lineHeight: '28px',
                textAlign: 'left',
                padding: '0 16px 0 12px',
                backgroundColor: '#e3e3e3',
                color: '#7b7b7b',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'solid #c1c1c1 1px',
                borderRadius: '8px',
            }}
        >
            {categoryName}
        </div>
    );
}

export default Category;
