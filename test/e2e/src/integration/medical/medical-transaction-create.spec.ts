describe('Medical Transaction Creation', () => {
  beforeEach(() => {
    cy.visit('medicine/1/new');

    cy.get('app-animal-select')
      .find('app-animal-select-display')
      .find('span')
      .should('have.text', '1 - Brahman');
  });

  const date = new Date('2021-11-01T14:22:00.000Z');

  it.only('should have the required fields', () => {
    cy.findFormField('Medicine Type', 'span.mat-select-min-line').should(
      'exist'
    );
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'exist'
    );
    cy.findFormField('Dosage', 'input').should('exist');
    cy.findFormField('Unit', 'span.mat-select-min-line').should('exist');

    cy.contains('a', 'Back').should('exist');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
  });

  it.only('should clear the fields when cancelling', () => {
    cy.selectOption('Medicine Type', 'Antibiotics');
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
    cy.findFormField('Dosage', 'input')
      .type('32.5')
      .should('have.value', '32.5');
    cy.selectOption('Unit', 'kg');

    cy.contains('button', 'Cancel').should('be.enabled').click();

    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'be.empty'
    );
    cy.findFormField('Dosage', 'input').should('be.empty');
  });

  it.only('should save a transaction with the values', () => {
    cy.selectOption('Medicine Type', 'Antibiotics');
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
    cy.findFormField('Dosage', 'input')
      .type('32.5')
      .should('have.value', '32.5');
    cy.selectOption('Unit', 'kg');

    cy.contains('button', 'Save').should('be.enabled').click();

    cy.location('pathname').should('equal', '/medicine/1');

    cy.contains('td a', 'Antibiotics');
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

  it.only('should navigate back to the medical transaction list when clicking back', () => {
    cy.contains('a', 'Back')
      .click()
      .location('pathname')
      .should('match', /medicine\/1$/);
  });
});
