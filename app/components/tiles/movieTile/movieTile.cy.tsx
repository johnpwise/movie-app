// Router 
import { MemoryRouter } from 'react-router';

// Component Under Test
import MovieTile from './movieTile';

// CSS
import './movieTile.css';

describe('<MovieTile />', () => {
    it('should render with the correct props', () => {
        cy.mount(
            <MemoryRouter>
                <MovieTile 
                    movie={{
                        id: '1',
                        title: 'Test Movie',
                        year: 2023,
                        studio: 'Test Studio',
                        rating: 4,
                        watched: false,
                    }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('.ma-movie-tile-container')
            .should('exist')
            .and('be.visible');

        cy.get('.ma-movie-title')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Test Movie');

        cy.get('.ma-movie-details')
            .should('exist')
            .and('be.visible')
            .find('.ma-movie-year')
            .should('contain.text', 'Year: 2023');

        cy.get('.ma-movie-details')
            .find('.ma-movie-studio')
            .should('contain.text', 'Studio: Test Studio');

        cy.get('.ma-movie-details')
            .find('.ma-movie-rating')
            .should('exist')
            .and('be.visible')
            .and('contain.text', 'Rating: 4');

        cy.get('.ma-movie-actions')
            .should('exist')
            .and('be.visible')
            .find('.bi.bi-eye-slash-fill.text-secondary');
    });

    it('should render the .bi-eye-fill icon when watched is true', () => {
        cy.mount(
            <MemoryRouter>
                <MovieTile 
                    movie={{
                        id: '2',
                        title: 'Watched Movie',
                        year: 2022,
                        studio: 'Watched Studio',
                        rating: 5,
                        watched: true,
                    }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('.ma-movie-actions')
            .find('.bi.bi-eye-fill.text-secondary')
            .should('exist')
            .and('be.visible');
    });
});