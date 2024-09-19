import React from 'react';
import Toggle from '../atoms/Toggle';
import { _ToggleOpen, _ToggleClose } from '../../assets/css/Form.css';

const ToggleBar = ({ title, isChecked, setCheck }) => {
    const borderRadius = isChecked ? '20px 20px 0 0' : '20px 20px 20px 20px';

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
