// Router 
import { MemoryRouter } from 'react-router';

// Component Under Test
import MovieList from './movieList';

// CSS
import './movieList.css';

describe('<MovieList />', () => {
    beforeEach(() => {
        // Mock the API response or store data to return an empty list of movies
        cy.intercept('GET', '/api/movies', {
            statusCode: 200,
            body: []
        }).as('getMovies');

        // Mock the API response for removing a movie
        cy.intercept('DELETE', '/api/movies/*', {
            statusCode: 204
        }).as('removeMovie');
    });

    it('should render without crashing', () => {
        cy.mount(
            <MemoryRouter>
                <MovieList onSelect={() => { }} />
            </MemoryRouter>
        );
    });

    it('should display a loading state initially', () => {
        cy.mount(
            <MemoryRouter>
                <MovieList onSelect={() => { }} />
            </MemoryRouter>
        );

        // Assert loading state
        cy.get('.ma-movie-list').should('contain.text', 'Loading movies...');
    });

    describe('Movie List Rendering', () => {
        beforeEach(() => {
            // Mock the API response to return a list of movies
            cy.intercept('GET', '/api/movies', {
                statusCode: 200,
                body: [
                    { id: '1', title: 'Movie 1', year: 2021, studio: 'Studio A', watched: false, rating: 5 },
                    { id: '2', title: 'Movie 2', year: 2020, studio: 'Studio B', watched: true, rating: 4 },
                    { id: '3', title: 'Movie 3', year: 2019, studio: 'Studio C', watched: false, rating: 3 }
                ]
            }).as('getMovies');
        });

        it('should render the correct column headers', () => {
            cy.mount(
                <MemoryRouter>
                    <MovieList onSelect={() => { }} />
                </MemoryRouter>
            );

            // Wait for the movies to load
            cy.wait('@getMovies');

            // Assert column headers
            cy.get('.ma-movie-list-container thead tr th').should('have.length', 6)
                .and('contain.text', 'Title')
                .and('contain.text', 'Year')
                .and('contain.text', 'Studio')
                .and('contain.text', 'Watched')
                .and('contain.text', 'Rating')
                .and('not.contain.text', 'Actions');
        });

        it('should display the correct number of movies in the list', () => {
            cy.mount(
                <MemoryRouter>
                    <MovieList onSelect={() => { }} />
                </MemoryRouter>
            );

            // Wait for the movies to load
            cy.wait('@getMovies');

            // Assert the number of rows in the table
            cy.get('.ma-movie-list-container tbody tr').should('have.length', 3);
        });
    });
});
