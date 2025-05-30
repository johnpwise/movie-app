import Button from 'react-bootstrap/Button';

/// Interfaces
interface BaseButtonProps {
    dataId: string;
    text?: string;
    variant?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export default function BaseButton({
    dataId,
    text,
    variant = 'primary',
    icon,
    disabled = false,
    onClick
}: BaseButtonProps) {
    /// Render
    return (
        <Button
            data-id={dataId}
            variant={variant}
            disabled={disabled}
            onClick={onClick}
        >
            {icon && <i className={`bi ${icon}`} style={{ marginRight: '0.5rem' }}></i>}
            {text !== '' && text}
        </Button>
    );
}