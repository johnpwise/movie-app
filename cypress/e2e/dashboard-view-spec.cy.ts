describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })

  it('should display the dashboard view', () => {
    // Act
    cy.visit('/');
    
    // Assert
    cy.get('.ma-dashboard-container').should('exist');
  });
});