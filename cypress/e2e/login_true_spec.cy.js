describe('Loading Page with correct parameters', () => {
  it('successfully logs in and redirects to the dashboard', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    
    cy.get('input[placeholder="Email"]').type('admin');
    cy.get('input[placeholder="Password"]').type('admin');
    
    cy.get('button[type="submit"]').click().then(() => {
      cy.url().should('include', '/index');
    });
  });
});
