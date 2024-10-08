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
        justifyContent: 'flex-start',
        width: '100%',
        maxWidth: '300px',
        margin: '10px 0',
    };

    const labelStyle = {
        fontSize: '1.1em',
        fontWeight: '500',
        cursor: 'pointer',
        color: '#00cec9',
        flex: 1,
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
        borderColor: isChecked ? '#ffd700' : 'rgba(255, 255, 255, 0.5)',
        borderRadius: '6px',
        backgroundColor: isChecked ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const checkmarkStyle = {
        width: '16px',
        height: '16px',
        color: '#ffd700',
    };

    return (
        <div style={containerStyle}>
            <label style={labelStyle}>
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