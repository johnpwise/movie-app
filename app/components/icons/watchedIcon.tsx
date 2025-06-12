interface WatchedIconProps {
    watched: boolean;
}

function WatchedIcon({ watched }: WatchedIconProps) {
    if (watched) {
        return <i className="bi bi-eye-fill text-secondary" style={{ fontSize: '1.5rem' }}></i>;
    } else {
        return <i className="bi bi-eye-slash-fill text-secondary" style={{ fontSize: '1.5rem' }}></i>;
    }
}

export default WatchedIcon;