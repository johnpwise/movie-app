/// Interfaces
import type { IMovie } from '../types';

// Components
import Form from 'react-bootstrap/Form';
import BaseCheckbox from '~/components/inputs/checks/baseCheckbox';
import RatingWidget from '~/components/inputs/ratingWidget/ratingWidget';

interface UpsertMovieFormProps {
    movie: IMovie;
    onChange: (movie: IMovie) => void;
}

function UpsertMovieForm({ movie, onChange }: UpsertMovieFormProps) {
    /// Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({
            ...movie,
            [name]: name === 'year' ? Number(value) : value,
        });
    };

    /// Render
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    type="text"
                    placeholder="Enter movie title"
                    value={movie.title}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                    name="year"
                    type="text"
                    placeholder="Year"
                    value={movie.year}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStudio">
                <Form.Label>Studio</Form.Label>
                <Form.Control
                    name="studio"
                    type="text"
                    placeholder="Studio"
                    value={movie.studio}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicWatched">
                <BaseCheckbox
                    dataId="ma-checkbox-watched"
                    label="Watched"
                    checked={movie.watched || false}
                    isSwitch={true}
                    onChange={(e) => onChange({ ...movie, watched: e.target.checked })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRating">
                <RatingWidget
                    dataId="ma-rating-widget"
                    rating={movie.rating || 0}
                    onChange={(rating) => onChange({ ...movie, rating })}
                    isDisabled={false}
                />
            </Form.Group>
        </Form>
    );
}

export default UpsertMovieForm;