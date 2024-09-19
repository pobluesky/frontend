import React from 'react';
import toggle_opened from '../../assets/css/icons/toggle_opened.svg';
import toggle_closed from '../../assets/css/icons/toggle_closed.svg';

function Toggle({ isChecked, setCheck }) {
    return (
        <>
            <img
                onClick={() => {
                    setCheck(!isChecked);
                }}
                src={isChecked ? toggle_opened : toggle_closed}
                alt="toggleButton"
            />
        </>
    );
}

export default Toggle;
