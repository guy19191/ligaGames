import React, { useState } from 'react';

const StyledCheckbox = ({ label, id, initialChecked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: 'center',
    };

    const labelStyle = {
        color: '#374151',
        fontWeight: '500',
        cursor: 'pointer',
    };

    const checkboxContainerStyle = {
        position: 'relative',
    };

    const hiddenInputStyle = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
    };

    const customCheckboxStyle = {
        width: '24px',
        height: '24px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isChecked ? '#3B82F6' : '#9CA3AF',
        borderRadius: '6px',
        backgroundColor: isChecked ? '#3B82F6' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const checkmarkStyle = {
        width: '16px',
        height: '16px',
        color: 'white',
    };

    return (
        <div style={containerStyle}>
            <label style={{
                marginLeft: '16px',
                fontSize: '18px',
                fontWeight: '500'
            }}>
                {label}
            </label>
            <div style={checkboxContainerStyle}>
                <input
                    id={id}
                    type="checkbox"
                    style={hiddenInputStyle}
                    checked={isChecked}
                    onChange={handleChange}
                />
                <div
                    style={customCheckboxStyle}
                    onClick={handleChange}
                >
                    {isChecked && (
                        <svg
                            style={checkmarkStyle}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StyledCheckbox;