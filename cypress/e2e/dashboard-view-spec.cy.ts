describe('Dashboard View', () => {
    beforeEach(() => {
        // Clear local storage before each test to ensure a fresh state
        cy.clearLocalStorage();
        // Optionally, you can also clear cookies if needed
        cy.clearCookies();

        cy.intercept('GET', '/api/movies', {
            statusCode: 200,
            body: []
        }).as('getMovies');

        // Visit the base URL before each test
        cy.visit('/');
    });

    it('should display the dashboard view', () => {
        // Arrange
        cy.wait('@getMovies');

        // Assert
        cy.get('.ma-dashboard-container', { timeout: 10000 })
            .should('exist');
    });
});