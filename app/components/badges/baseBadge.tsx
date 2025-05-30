interface BaseBadgeProps {
    dataId: string;
    variant: string;
    text: string | number;
}

const BaseBadge = ({ dataId, variant, text }: BaseBadgeProps) => {
    return (
        <span className={`badge bg-${variant}`} data-id={dataId}>
            {text}
        </span>
    );
};

export default BaseBadge;