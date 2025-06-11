describe('Movies View', () => {
    beforeEach(() => {
        // Clear local storage before each test to ensure a fresh state
        cy.clearLocalStorage();
        // Optionally, you can also clear cookies if needed
        cy.clearCookies();
        // Visit the base URL before each test
        cy.visit('/movies');
    });
    
    it('should display the movies view', () => {
        // Assert
        cy.get('.ma-movies', { timeout: 10000 })
            .should('exist');
    });

    it('should display a heading and a description', () => {
        // Assert
        cy.get('[data-id="ma-movies-title"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Movies');

        cy.get('[data-id="ma-movies-description"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Manage your movie collection here.');
    });

    it('should display an "Add Movie" button', () => {
        // Assert
        cy.get('[data-id="ma-button-add-movie"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Add movie')
            .find('i.bi-plus-circle')
            .should('exist');
    });

    context('when no movie data is returned from the API or store', () => {
        it('should display a film icon and a message indicating no movies are available', () => {
            // Assert
            cy.get('.bi-film')
                .should('exist')
                .and('be.visible');

            cy.get('p.mb-0')
                .should('exist')
                .and('be.visible')
                .and('have.text', 'You haven\'t added any movies yet.');

            cy.get('small')
                .should('exist')
                .and('be.visible')
                .and('have.text', 'Use the "Add Movie" button to get started.');
        });
    });

    context('when movie data is returned from the API or store', () => {
        beforeEach(() => {
            // Mock the API response or store data to return a list of movies
            cy.intercept('GET', '/api/movies', {
                statusCode: 200,
                body: [
                    { id: '1', title: 'Inception', year: 2010, studio: 'Warner Bros.', watched: true, rating: 9 },
                    { id: '2', title: 'The Matrix', year: 1999, studio: 'Warner Bros.', watched: false, rating: 10 }
                ]
            }).as('getMovies');
            cy.visit('/movies');
        });

        it('should display a list of movies in a table format', () => {
            // Assert
            cy.get('.ma-movie-list-container')
                .should('exist')
                .and('be.visible');

            cy.get('table.table-striped tbody tr')
                .should('have.length', 2)
                .each(($row, index) => {
                    const expectedTitles = ['Inception', 'The Matrix'];
                    cy.wrap($row).find('td').eq(0).should('have.text', expectedTitles[index]);
                });
        });

        it('should allow selecting a movie to edit', () => {
            // Assert
            cy.get('.ma-movie-list-container tbody tr').first().click();
            cy.get('[data-id="ma-modal-upsert-movie"]')
                .should('exist')
                .and('be.visible');
        });
    });

    describe('Add Movie Modal', () => {
        beforeEach(() => {
            // Ensure the modal is not visible before each test
            cy.get('[data-id="ma-modal-upsert-movie"]').should('not.exist');

            // Mock the API response or store data to return an empty list of movies
            cy.intercept('GET', '/api/movies', {
                statusCode: 200,
                body: []
            }).as('getMovies');

            // Mock the API response for adding a movie
            cy.intercept('POST', '/api/movies', {
                statusCode: 201,
                body: { id: 'new-movie-id', title: 'New Movie', year: 2023, studio: 'Test Studio', watched: false, rating: 8 }
            }).as('addMovie');
        });

        it('should open the modal when "Add Movie" button is clicked', () => {
            // Click the "Add Movie" button
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert the modal is visible
            cy.get('[data-id="ma-modal-upsert-movie"]')
                .should('exist')
                .and('be.visible');
        });

        it('should allow entering movie details and saving', () => {
            // Open the modal
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Fill in movie details
            cy.get('input[name="title"]').type('New Movie');
            cy.get('input[name="year"]').type('2023');
            cy.get('input[name="studio"]').type('Test Studio');
            cy.get('input[name="rating"]').type('8');

            // Save the movie
            cy.get('[data-id="ma-modal-upsert-movie"] button[type="submit"]').click();

            // Assert the modal closes and the new movie appears in the list
            cy.get('[data-id="ma-modal-upsert-movie"]').should('not.exist');
            cy.get('.ma-movie-list-container tbody tr').should('contain.text', 'New Movie');
        });
    });
});