describe('Attempt to access Users page without logging in', () => {
    it('should redirect to login page if not authenticated', () => {
      cy.viewport(1920, 1080);

      cy.visit('http://localhost:3000/users'); 
      
      cy.url().should('include', '/'); 
  
      // Verificar que la página de login se muestra correctamente
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Password"]').should('be.visible');
    });
  });
  