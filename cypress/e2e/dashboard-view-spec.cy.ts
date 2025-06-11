describe('Dashboard View', () => {
    beforeEach(() => {
        // Clear local storage before each test to ensure a fresh state
        cy.clearLocalStorage();
        // Optionally, you can also clear cookies if needed
        cy.clearCookies();
        // Visit the base URL before each test
        cy.visit('/');
    });

    it('should display the dashboard view', () => {
        // Assert
        cy.get('.ma-dashboard-container', { timeout: 10000 })
            .should('exist');
    });
});