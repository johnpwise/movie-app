/// Interfaces
interface BaseCheckboxProps {
    dataId: string;
    label: string;
    checked: boolean;
    isSwitch?: boolean; // Optional prop for switched checkbox
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BaseCheckbox({
    dataId,
    label,
    checked,
    isSwitch,
    onChange
}: BaseCheckboxProps) {
    /// Render
    return (
        <div data-id={dataId} className={`form-check ${isSwitch ? 'form-switch' : ''}`}>
            <input
                type="checkbox"
                className="form-check-input"
                id={dataId}
                checked={checked}
                onChange={onChange}
            />
            <label className="form-check-label" htmlFor={dataId}>
                {label}
            </label>
        </div>
    );
}