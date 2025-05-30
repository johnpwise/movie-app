interface TileProps {
    title: string;
    value: number;
    total: number;
}

function Tile({ title, value, total }: TileProps) {
    return (
        <div className="ma-tile-container">
            <h4 className="ma-title">{title}</h4>
            <div className="ma-tile-content">{value} / {total}</div>
            <div className="ma-tile-actions">&nbsp;</div>
        </div>
    );
}

export default Tile;