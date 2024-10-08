import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const popupRef = useRef(null);

    useEffect(() => {
        setFilteredOptions(
            options.filter(option =>
                option.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOption = (option) => {
        setSelectedOptions(prevSelected =>
            prevSelected.includes(option)
                ? prevSelected.filter(item => item !== option)
                : [...prevSelected, option]
        );
    };

    const removeOption = (option) => {
        setSelectedOptions(prevSelected => prevSelected.filter(item => item !== option));
    };

    const styles = {
        container: {
            width: '300px',
            fontFamily: 'Arial, sans-serif',
            position: 'relative'
        },
        select: {
            padding: '10px',
            border: '2px solid #3498db',
            borderRadius: '5px',
            backgroundColor: '#ecf0f1',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        popup: {
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            marginTop: '5px',
            backgroundColor: 'white',
            border: '2px solid #3498db',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
        },
        searchInput: {
            width: '100%',
            padding: '10px',
            border: 'none',
            borderBottom: '1px solid #3498db',
            outline: 'none',
        },
        optionsContainer: {
            maxHeight: '200px',
            overflowY: 'auto',
        },
        option: {
            padding: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        selectedOption: {
            backgroundColor: '#3498db',
            color: 'white',
        },
        selectedOptionsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginTop: '10px',
        },
        selectedOptionBadge: {
            backgroundColor: '#3498db',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
        },
        removeButton: {
            marginLeft: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.select} onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedOptions.length ? `${selectedOptions.length} selected` : 'Select options'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <div style={styles.popup} ref={popupRef}>
                    <input
                        type="text"
                        placeholder="Search..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div style={styles.optionsContainer}>
                        {filteredOptions.map(option => (
                            <div
                                key={option}
                                style={{
                                    ...styles.option,
                                    ...(selectedOptions.includes(option) ? styles.selectedOption : {})
                                }}
                                onClick={() => toggleOption(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div style={styles.selectedOptionsContainer}>
                {selectedOptions.map(option => (
                    <div key={option} style={styles.selectedOptionBadge}>
                        {option}
                        <span style={styles.removeButton} onClick={() => removeOption(option)}>×</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;