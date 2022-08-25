describe('Feeding Transaction Update', () => {
  beforeEach(() => {
    cy.visit('feed/1/edit/1');

    cy.get('app-animal-select')
      .find('app-animal-select-display')
      .find('span')
      .should('have.text', '1 - Brahman');
  });

  it.only('should have the required fields', () => {
    cy.findFormField('Feed Type', 'span.mat-select-min-line')
      .should('exist')
      .should('have.text', 'Maize');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input').should(
      'exist'
    );
    cy.findFormField('Quantity', 'input')
      .should('exist')
      .should('have.value', '0.5');
    cy.findFormField('Unit', 'span.mat-select-min-line')
      .should('exist')
      .should('have.text', 'ℓ');

    cy.contains('a', 'Back').should('exist');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
  });

  it.only('should save the transaction with the changed values', () => {
    cy.selectOption('Feed Type', 'Wheat');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
      .invoke('val')
      .then((transactionDate: string) => {
        cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
          .clear()
          .type('2021/03/15, 12:22');
        cy.findFormField('Quantity', 'input').clear().type('22');
        cy.selectOption('Unit', 'kg');

        cy.contains('button', 'Save').should('be.enabled').click();
        cy.location('pathname').should('match', /feed\/1/);
        cy.contains('span', 'Updated successfully.').should('be.visible');
        cy.get('button.mat-paginator-navigation-next').click();
        cy.contains('td', '15 March 2021, 12:22')
          .scrollIntoView()
          .should('be.visible');

        cy.visit('feed/1/edit/1');

        cy.findFormField(
          'Transaction Date',
          'input.mat-datepicker-input'
        ).should('have.value', '2021/03/15, 12:22');

        // reset for other tests
        cy.selectOption('Feed Type', 'Maize');
        cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
          .clear()
          .type(transactionDate);
        cy.findFormField('Quantity', 'input').clear().type('0.5');
        cy.selectOption('Unit', 'ℓ');
        cy.contains('button', 'Save').should('be.enabled').click();
      });
  });

  it.only('should reset the form to the default values when resetting', () => {
    cy.findFormField('Feed Type', 'span.mat-select-min-line')
      .should('exist')
      .should('have.text', 'Maize');
    cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
      .invoke('val')
      .then((transactionDate) => {
        cy.findFormField('Quantity', 'input')
          .should('exist')
          .should('have.value', '0.5');
        cy.findFormField('Unit', 'span.mat-select-min-line')
          .should('exist')
          .should('have.text', 'ℓ');

        // change values
        cy.selectOption('Feed Type', 'Wheat');
        cy.findFormField('Transaction Date', 'input.mat-datepicker-input')
          .clear()
          .type('2021/03/15, 12:22');
        cy.findFormField('Quantity', 'input').clear().type('22');
        cy.selectOption('Unit', 'kg');

        // cancel
        cy.contains('button', 'Cancel').click();

        cy.get('app-animal-select')
          .find('app-animal-select-display')
          .find('span')
          .should('have.text', '1 - Brahman');
        cy.findFormField('Feed Type', 'span.mat-select-min-line')
          .should('exist')
          .should('have.text', 'Maize');
        cy.findFormField(
          'Transaction Date',
          'input.mat-datepicker-input'
        ).should('have.value', transactionDate);
        cy.findFormField('Quantity', 'input')
          .should('exist')
          .should('have.value', '0.5');
        cy.findFormField('Unit', 'span.mat-select-min-line')
          .should('exist')
          .should('have.text', 'ℓ');
      });
  });

  it.only('should navigate back to the feeding transaction list when clicking back', () => {
    cy.contains('a', 'Back')
      .click()
      .location('pathname')
      .should('match', /feed\/1$/);
  });
});
