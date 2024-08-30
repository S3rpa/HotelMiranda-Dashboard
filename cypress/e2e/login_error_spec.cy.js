describe('Loading Page with wrong parameters', () => {
    it('successfully loads but does not log in', () => {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:3000/');
      cy.get('input[placeholder="Email"]').type('email@gmail.com');
      cy.get('input[placeholder="Password"]').type('password');
        cy.url().should('equal', 'http://localhost:3000/');
    });
  });