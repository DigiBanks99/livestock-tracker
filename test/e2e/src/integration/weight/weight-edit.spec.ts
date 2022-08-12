describe('Weight Transaction Update', () => {
  beforeEach(() => {
    cy.visit('weight/1/edit/1');

    cy.location('pathname').should('match', /weight\/1\/edit\/1$/);
  });

  it.only('should have the required fields', () => {
    cy.contains('span', '1 - Brahman');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'exist'
    );
    cy.findFormField('Weight', 'input').should('have.value', '63');

    cy.contains('a', 'Back').should('exist');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
  });

  it.only('should save the weight transaction with the changed values', () => {
    cy.contains('span', '1 - Brahman');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
      .invoke('val')
      .then((transactionDate: string) => {
        const newDate = '2021/03/15, 12:22';
        cy.contains('span', '1 - Brahman');
        cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
          .should('exist')
          .clear()
          .type(newDate);

        cy.findFormField('Weight', 'input')
          .should('exist')
          .clear()
          .type('63.5')
          .should('have.value', '63.5');

        cy.contains('button', 'Save').should('be.enabled').click();
        cy.location('pathname').should('equal', '/weight/1');
        cy.contains('span', 'Updated successfully.').should('be.visible');
        cy.contains('a', '15 March 2021, 12:22').should('be.visible');

        cy.visit('/weight/1/edit/1');

        // reset for other integration tests
        cy.location('pathname').should('match', /weight\/1\/edit\/1$/);

        // Wait for the animal fetch
        cy.contains('span', '1 - Brahman');
        cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
          .should('have.value', newDate) // wait for transaction to be loaded
          .clear()
          .type(transactionDate);

        cy.findFormField('Weight', 'input')
          .should('exist')
          .clear()
          .type('63')
          .should('have.value', '63');

        cy.contains('button', 'Save').should('be.enabled').click();
      });
  });
});
