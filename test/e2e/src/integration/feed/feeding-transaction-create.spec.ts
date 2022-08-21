describe('Feeding Transaction Creation', () => {
  beforeEach(() => cy.visit('feed/1/new'));

  const date = new Date('2021-11-01T14:22:00.000Z');

  it.only('should have the required fields', () => {
    cy.get('app-animal-select')
      .find('app-animal-select-display')
      .find('span')
      .should('have.text', '1 - Brahman');
    cy.findFormField('Feed Type', 'span.mat-select-min-line').should('exist');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'exist'
    );
    cy.findFormField('Quantity', 'input').should('exist');
    cy.findFormField('Unit', 'span.mat-select-min-line').should('exist');

    cy.contains('a', 'Back').should('exist');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
  });

  it.only('should clear the fields when cancelling', () => {
    cy.selectOption('Feed Type', 'Maize');
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
    cy.findFormField('Quantity', 'input')
      .type('32.5')
      .should('have.value', '32.5');
    cy.selectOption('Unit', 'kg');

    cy.contains('button', 'Cancel').should('be.enabled').click();

    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'be.empty'
    );
    cy.findFormField('Quantity', 'input').should('be.empty');
  });

  it.only('should save a transaction with the values', () => {
    cy.selectOption('Feed Type', 'Maize');
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
    cy.findFormField('Quantity', 'input')
      .type('32.5')
      .should('have.value', '32.5');
    cy.selectOption('Unit', 'kg');

    cy.contains('button', 'Save').should('be.enabled').click();

    cy.location('pathname').should('match', /feed\/\d+$/);

    cy.contains('td a', 'Maize');
    cy.contains(
      'td',
      date.toLocaleString('en-ZA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    );
    cy.contains('td', '32.5');
    cy.contains('td', 'kg');
  });

  it.only('should navigate back to the feeding transaction list when clicking back', () => {
    cy.get('app-animal-select')
      .find('app-animal-select-display')
      .find('span')
      .should('have.text', '1 - Brahman');
    cy.contains('a', 'Back')
      .click()
      .location('pathname')
      .should('match', /feed\/1$/);
  });
});
