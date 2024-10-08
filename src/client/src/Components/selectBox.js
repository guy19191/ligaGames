import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, onChange }) => {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgba(224, 224, 224, 0.1)',
            borderColor: state.isFocused ? '#ffd700' : 'rgba(224, 224, 224, 0.3)',
            borderRadius: '15px',
            padding: '5px',
            boxShadow: state.isFocused ? '0 0 0 1px #ffd700' : null,
            '&:hover': {
                borderColor: '#ffd700',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(40, 44, 52, 0.9)',
            borderRadius: '10px',
            padding: '5px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? 'rgba(255, 215, 0, 0.4)'
                : state.isFocused
                    ? 'rgba(255, 215, 0, 0.2)'
                    : 'transparent',
            color: state.isSelected ? '#fff' : '#e0e0e0',
            '&:active': {
                backgroundColor: 'rgba(255, 215, 0, 0.6)',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            borderRadius: '10px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#e0e0e0',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#e0e0e0',
            '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                color: '#fff',
            },
        }),
        input: (provided) => ({
            ...provided,
            color: '#e0e0e0',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#e0e0e0',
        }),
    };

    return (
        <div style={{ width: '100%', maxWidth: '300px' }}>
            <Select
                options={options}
                onChange={onChange}
                isMulti
                styles={customStyles}
                className="multi-select"
                classNamePrefix="select"
            />
        </div>
    );
};

export default MultiSelect;