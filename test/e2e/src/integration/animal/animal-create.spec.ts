describe('Animal Creation', () => {
  function createAnimal(
    species: string,
    subspecies: string,
    birthDateDay: number,
    purchaseDateDay: number,
    purchaseDateIsPreviousMonth = false
  ): void {
    cy.findFormField('Animal Type', 'app-animal-type-select').click();
    cy.contains('mat-option', species).click();
    cy.findFormField('Subspecies', 'input').type(subspecies);
    cy.findFormField('Number', 'input').type('1');
    cy.findFormField('Batch Number', 'input').type('1');
    cy.contains('label', 'Birth Date')
      .parents('mat-form-field')
      .find('mat-datepicker-toggle')
      .click();
    cy.get('.mat-calendar-previous-button').click();
    cy.contains(
      '.mat-calendar-body-cell-content',
      birthDateDay.toString()
    ).click();
    cy.contains('label', 'Purchase Date')
      .parents('mat-form-field')
      .find('mat-datepicker-toggle')
      .click();
    if (purchaseDateIsPreviousMonth) {
      cy.get('.mat-calendar-previous-button').click();
    }
    cy.contains(
      '.mat-calendar-body-cell-content',
      purchaseDateDay.toString()
    ).click();
    cy.findFormField('Purchase Price', 'input').type('35');
    cy.findFormField('Arrival Weight', 'input').type('12');
  }

  beforeEach(() => cy.visit('/animal/new'));

  it.only('should have the necessary fields', () => {
    cy.findFormField('Animal Type', 'app-animal-type-select').should('exist');
    cy.findFormField('Subspecies', 'input').should('exist');
    cy.findFormField('Number', 'input').should('exist');
    cy.findFormField('Batch Number', 'input').should('exist');
    cy.findFormField('Birth Date', 'input').should('exist');
    cy.findFormField('Age', 'input')
      .should('exist')
      .should('be.disabled')
      .should('have.value', '0 days');
    cy.findFormField('Purchase Date', 'input').should('exist');
    cy.findFormField('Purchase Price', 'input').should('exist');
    cy.findFormField('Arrival Weight', 'input').should('exist');
    cy.contains('label', 'Sold')
      .should('exist')
      .parent('mat-checkbox')
      .should('exist');
    cy.findFormField('Sell Price', 'input')
      .should('exist')
      .should('be.disabled');
    cy.findFormField('Sell Date', 'input')
      .should('exist')
      .should('be.disabled');
    cy.contains('label', 'Deceased')
      .should('exist')
      .parent('mat-checkbox')
      .should('exist');
    cy.findFormField('Date of Death', 'input')
      .should('exist')
      .should('be.disabled');
    cy.contains('button', 'Back').should('exist').should('be.enabled');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist');
  });

  it.only('should make sold fields available when marked sold', () => {
    cy.contains('label', 'Sold').parent('mat-checkbox').click();
    cy.findFormField('Sell Price', 'input').should('be.enabled');
    cy.findFormField('Sell Date', 'input').should('be.enabled');
  });

  it.only('should make death fields available when marked deceased', () => {
    cy.contains('label', 'Deceased').parent('mat-checkbox').click();
    cy.findFormField('Date of Death', 'input').should('be.enabled');
  });

  it.only('should clear the form when cancel is clicked', () => {
    const now = new Date();
    const date = now.getDate();
    const birthDateDay = date > 30 ? 30 : date;
    const purchaseDateDay = date > 15 ? date - 15 : date + 1;
    const purchaseDateIsPreviousMonth = date <= 15;

    createAnimal(
      'Pig',
      'Big one',
      birthDateDay,
      purchaseDateDay,
      purchaseDateIsPreviousMonth
    );
    cy.contains('button', 'Cancel').click();

    // Verify reset
    cy.findFormField('Animal Type', 'app-animal-type-select').contains(
      'Cattle'
    );
    cy.findFormField('Subspecies', 'input').should('be.empty');
    cy.findFormField('Number', 'input').should('be.empty');
    cy.findFormField('Batch Number', 'input').should('be.empty');
    cy.findFormField('Birth Date', 'input').should('be.empty');
    cy.findFormField('Age', 'input')
      .should('be.disabled')
      .should('have.value', '0 days');
    cy.findFormField('Purchase Date', 'input').should('be.empty');
    cy.findFormField('Purchase Price', 'input').should('be.empty');
    cy.findFormField('Arrival Weight', 'input').should('be.empty');
    cy.contains('label', 'Sold')
      .parent('mat-checkbox')
      .find('input')
      .should('not.be.checked');
    cy.findFormField('Sell Price', 'input')
      .should('be.empty')
      .should('be.disabled');
    cy.findFormField('Sell Date', 'input')
      .should('be.empty')
      .should('be.disabled');
    cy.contains('label', 'Deceased')
      .parent('mat-checkbox')
      .find('input')
      .should('not.be.checked');
    cy.findFormField('Date of Death', 'input')
      .should('be.empty')
      .should('be.disabled');
    cy.contains('button', 'Back').should('exist').should('be.enabled');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist');
  });

  it.only('should navigate back to the animal list when clicking Back', () => {
    cy.contains('button', 'Back').click();

    cy.location('pathname').should('equal', '/animal');
  });

  it.only('should create a new animal when saving', () => {
    const now = new Date();
    const date = now.getDate();
    const birthDateDay = date > 30 ? 30 : date;
    const purchaseDateDay = date > 15 ? date - 15 : date + 1;
    const purchaseDateIsPreviousMonth = date <= 15;
    const subspecies = 'Big one';

    createAnimal(
      'Pig',
      subspecies,
      birthDateDay,
      purchaseDateDay,
      purchaseDateIsPreviousMonth
    );
    cy.contains('button', 'Save').click();

    cy.location('pathname').should('equal', '/animal');
    cy.contains('a', subspecies).should('exist');
  });
});
