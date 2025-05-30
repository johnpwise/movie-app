/// Interfaces
import type { Movie } from '../types';

// Components
import Form from 'react-bootstrap/Form';
import Dropdown from '~/components/inputs/dropdowns/dropdown';

interface UpsertMovieFormProps {
    movie: Movie;
    onChange: (movie: Movie) => void;
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
                <Form.Check
                    type="checkbox"
                    name="watched"
                    label="Watched"
                    checked={movie.watched || false}
                    onChange={(e) => onChange({ ...movie, watched: e.target.checked })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRating">
                <Dropdown
                    dropdownLabel="Select Rating"
                    options={[
                        { label: '1 Star', value: 1, selected: movie.rating === 1 },
                        { label: '2 Stars', value: 2, selected: movie.rating === 2 },
                        { label: '3 Stars', value: 3, selected: movie.rating === 3 },
                        { label: '4 Stars', value: 4, selected: movie.rating === 4 },
                        { label: '5 Stars', value: 5, selected: movie.rating === 5 },
                        { label: '6 Stars', value: 6, selected: movie.rating === 6 },
                        { label: '7 Stars', value: 7, selected: movie.rating === 7 },
                        { label: '8 Stars', value: 8, selected: movie.rating === 8 },
                        { label: '9 Stars', value: 9, selected: movie.rating === 9 },
                        { label: '10 Stars', value: 10, selected: movie.rating === 10 },
                    ]}
                    isDropdownOpen={false}
                    onOptionSelect={(option) => onChange({ ...movie, rating: option.value as number })}
                />
            </Form.Group>
        </Form>
    );
}

export default UpsertMovieForm;