/// Interfaces
interface RatingWidgetProps {
    dataId: string;
    rating: number;
    onChange: (rating: number) => void;
    isDisabled?: boolean;
}

export default function RatingWidget({
    dataId,
    rating,
    onChange,
    isDisabled = false
}: RatingWidgetProps) {
    /// Render
    return (
        <div data-id={dataId} className="rating-widget">
            {[...Array(10)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <i className={`bi ${starRating <= rating ? 'bi-star-fill' : 'bi-star'}`}
                        key={starRating}
                        onClick={() => !isDisabled && onChange(starRating)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${starRating} star${starRating > 1 ? 's' : ''}`}
                        style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', marginRight: '0.2rem' }}
                    ></i>
                )
            })}
        </div>
    );
}