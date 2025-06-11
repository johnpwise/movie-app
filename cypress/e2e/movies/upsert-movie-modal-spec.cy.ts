describe('Upsert Movies Modal', () => {
    beforeEach(() => {
        // Clear local storage before each test to ensure a fresh state
        cy.clearLocalStorage();
        // Optionally, you can also clear cookies if needed
        cy.clearCookies();
        // Visit the base URL before each test
        cy.visit('/movies');
    });

    it('should open the upsert movie modal when "Add Movie" button is clicked', () => {
        // Click the "Add Movie" button
        cy.get('[data-id="ma-button-add-movie"]').click();

        // Assert that the modal is visible
        cy.get('.modal-content')
            .should('exist')
            .and('be.visible');
    });

    it('should close the modal when the close button is clicked', () => {
        // Open the modal first
        cy.get('[data-id="ma-button-add-movie"]').click();

        // Click the close button
        cy.get('.btn-close').click();

        // Assert that the modal is no longer visible
        cy.get('.modal-content')
            .should('not.exist');
    });

    it('should close the modal when the cancel button is clicked', () => {
        // Open the modal first
        cy.get('[data-id="ma-button-add-movie"]').click();

        // Click the cancel button
        cy.get('[data-id="ma-modal-upsert-movie-cancel"]').click();

        // Assert that the modal is no longer visible
        cy.get('.modal-content')
            .should('not.exist');
    });

    context('when adding a new movie', () => {
        it('should display the correct title in the modal', () => {
            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert that the modal title is "Add Movie"
            cy.get('.modal-title')
                .should('exist')
                .and('be.visible')
                .and('have.text', 'Add Movie');
        });

        it('should display a form control for the movie title', () => {
            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert that the form control for movie title exists
            cy.get('#formBasicTitle')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'type', 'text')
                .and('have.attr', 'placeholder', 'Enter movie title');
        });

        it('should display a form control for the year the movie was released', () => {
            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert that the form control for movie year exists
            cy.get('#formBasicYear')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'type', 'text')
                .and('have.attr', 'placeholder', 'Year');

            // Assert that the value is set to current year
            const currentYear = new Date().getFullYear();
            cy.get('#formBasicYear')
                .should('have.value', currentYear.toString());
        });

        it('should display a form control for the studio', () => {
            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert that the form control for studio exists
            cy.get('#formBasicStudio')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'type', 'text')
                .and('have.attr', 'placeholder', 'Studio');
        });

        it('should display a checkbox for watched status', () => {
            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert that the checkbox for watched status exists
            cy.get('[data-id="ma-checkbox-watched"]')
                .should('exist')
                .and('be.visible')
                .find('input[type="checkbox"]')
                .should('not.be.checked');
        });

        it('should display a widget to enter the movie rating', () => {
            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Assert that the rating widget exists
            cy.get('[data-id="ma-rating-widget"]')
                .should('exist')
                .and('be.visible');
        });

        it('should allow entering movie details and saving', () => {
            // Intercept the API call to add a movie
            cy.intercept('POST', '/api/movies', {
                statusCode: 201,
                body: {
                    id: 1,
                    title: 'New Movie',
                    year: '2023',
                    studio: 'Test Studio',
                    watched: true,
                    rating: 8
                }
            }).as('addMovie');

            // Open the modal first
            cy.get('[data-id="ma-button-add-movie"]').click();

            // Fill in movie details
            cy.get('#formBasicTitle').type('New Movie');
            cy.get('#formBasicYear').clear().type('2023');
            cy.get('#formBasicStudio').type('Test Studio');
            cy.get('[data-id="ma-checkbox-watched"] input[type="checkbox"]').check();
            cy.get('[aria-label="8 stars"]').click(); // Click on the 8th star for rating

            // setup intercept for the reload of data call
            cy.intercept('GET', '/api/movies', {
                statusCode: 200,
                body: [
                    {
                        id: '1',
                        title: 'New Movie',
                        year: '2023',
                        studio: 'Test Studio',
                        watched: true,
                        rating: 8
                    }
                ]
            }).as('reloadMovies');

            // Click the save button
            cy.get('[data-id="ma-modal-upsert-movie-save"').click();

            // Assert that the modal is closed and the movie is added
            cy.get('.modal-content').should('not.exist');

            // Wait for the API call to complete
            cy.wait('@addMovie').its('response.statusCode').should('eq', 201);
            cy.wait('@reloadMovies').its('response.statusCode').should('eq', 200);

            // Optionally, you can check if the movie was added to the list
            cy.get('.ma-movie-list-container tbody tr')
                .should('contain.text', 'New Movie')
                .and('contain.text', '2023')
                .and('contain.text', 'Test Studio')
                .and('contain.text', '8');
        });
    });
});