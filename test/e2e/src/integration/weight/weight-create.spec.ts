describe('Weight Transaction Creation', () => {
  beforeEach(() => cy.visit('weight/1/new'));

  const date = new Date('2021-11-01T14:22:00.000Z');

  it.only('should have the required fields', () => {
    cy.get('app-animal-select')
      .find('app-animal-select-display')
      .find('span')
      .should('have.text', '1 - Brahman');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'exist'
    );
    cy.findFormField('Weight', 'input').should('exist');

    cy.contains('button', 'Back').should('exist').should('be.enabled');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
  });

  it.only('should clear the fields when cancelling', () => {
    cy.pickDate('Transaction Date', date);
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'have.value',
      date.toLocaleString('en-ZA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    );
    cy.findFormField('Weight', 'input')
      .type('32.5')
      .should('have.value', '32.5');

    cy.contains('button', 'Cancel').should('be.enabled').click();

    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'be.empty'
    );
    cy.findFormField('Weight', 'input').should('be.empty');
  });

  it.only('should save a transaction with the values', () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    cy.pickDate('Transaction Date', date);
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'have.value',
      date.toLocaleString('en-ZA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    );
    cy.findFormField('Weight', 'input')
      .type('32.5')
      .should('have.value', '32.5');

    cy.contains('button', 'Save').should('be.enabled').click();

    cy.location('pathname').should('equal', '/weight/1');

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
    );
  });
});
