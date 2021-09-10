describe('Weight Transaction Update', () => {
  const date = new Date('2021-01-13T16:00:00Z');

  beforeEach(() => {
    cy.visit('weight/1');

    cy.contains(
      'a',
      date.toLocaleString('en-ZA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    ).click();

    cy.location('pathname').should('equal', '/weight/1/edit/1');
  });

  it.only('should have the required fields', () => {
    cy.get('app-animal-select')
      .find('app-animal-select-display')
      .find('span')
      .should('have.text', '1 - Brahman');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'exist'
    );
    cy.findFormField('Weight', 'input').should('have.value', '63');

    cy.contains('button', 'Back').should('exist').should('be.enabled');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
  });

  it.only('should save the weight transaction with the changed values', () => {
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
      .should('exist')
      .clear()
      .type('2021/03/15, 12:22');

    cy.findFormField('Weight', 'input')
      .should('exist')
      .clear()
      .type('63.5')
      .should('have.value', '63.5');

    cy.contains('button', 'Save').should('be.enabled').click();

    cy.location('pathname').should('equal', '/weight/1');
    cy.contains('span', 'Updated successfully.').should('be.visible');
    cy.contains('a', '15 March 2021, 12:22').click();

    // reset for other integration tests
    cy.location('pathname').should('equal', '/weight/1/edit/1');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
      .should('exist')
      .clear()
      .type('2021/01/13, 18:00');

    cy.findFormField('Weight', 'input')
      .should('exist')
      .clear()
      .type('63')
      .should('have.value', '63');

    cy.contains('button', 'Save').should('be.enabled').click();
  });
});
