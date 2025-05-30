import { useState } from 'react';

/// Interfaces
interface OptionProps {
    label: string;
    value: string | number;
    selected: boolean;
}

interface DropdownProps {
    dropdownLabel: string;
    options: OptionProps[];
    isDropdownOpen: boolean;
    onOptionSelect: (option: OptionProps) => void;
}

/// Component
const Dropdown = ({ dropdownLabel, options, isDropdownOpen, onOptionSelect }: DropdownProps) => {
    /// State
    const [selectedOption, setSelectedOption] = useState<OptionProps | null>(null);
    const [isOpen, setIsDropdownOpen] = useState(isDropdownOpen);

    /// Functions
    const onSelect = (option: OptionProps) => {
        if (option.selected) return;
        setSelectedOption(option);
        onOptionSelect(option);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDropdownOpen(!isOpen);
    };

    /// Render
    return (
        <div className="ma-dropdown">
            <button onClick={(e) => toggleDropdown(e)} className="ma-dropdown-button">
                <span className="ma-dropdown-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7m-7 0a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    {selectedOption?.label ?? dropdownLabel}
                </span>

                {isOpen &&
                    (<div>
                        <ul>
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className="ma-dropdown-option"
                                    onClick={() => onSelect(option)}
                                >
                                    {option.label || `Option ${index + 1}`}
                                </li>
                            ))}
                        </ul>
                    </div>)
                }
            </button>
        </div>
    );
};

export default Dropdown;