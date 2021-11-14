describe('Animal Update', () => {
  const species = 'Cattle';
  const subspecies = 'Brahman';

  beforeEach(() => cy.visit('/animal/1/edit'));

  it.only('should have the necessary fields with their values set', () => {
    const birthDate = new Date();
    birthDate.setDate(birthDate.getDate() - 15);
    const purchaseDate = new Date();
    purchaseDate.setDate(purchaseDate.getDate() - 13);

    cy.findFormField('Animal Type', 'app-animal-type-select').contains(species);
    cy.findFormField('Subspecies', 'input').should('have.value', subspecies);
    cy.findFormField('Number', 'input').should('have.value', '1');
    cy.findFormField('Batch Number', 'input').should('have.value', '1');
    cy.findFormField('Birth Date', 'input').should(
      'have.value',
      birthDate.toLocaleDateString([
        ...(navigator.languages ?? [navigator.language])
      ])
    );
    cy.findFormField('Age', 'input')
      .should('be.disabled')
      .should('have.value', '15 days');
    cy.findFormField('Purchase Date', 'input').should(
      'have.value',
      purchaseDate.toLocaleDateString([
        ...(navigator.languages ?? [navigator.language])
      ])
    );
    cy.findFormField('Purchase Price', 'input').should('have.value', '200');
    cy.findFormField('Arrival Weight', 'input').should('have.value', '120');
    cy.contains('label', 'Sold').parent('mat-checkbox').should('exist');
    cy.findFormField('Sell Price', 'input').should('be.disabled');
    cy.findFormField('Sell Date', 'input').should('be.disabled');
    cy.contains('label', 'Deceased').parent('mat-checkbox').should('exist');
    cy.findFormField('Date of Death', 'input').should('be.disabled');
    cy.contains('button', 'Back').should('exist').should('be.enabled');
    cy.contains('button', 'Cancel').should('exist').should('be.disabled');
    cy.contains('button', 'Save').should('exist').should('be.disabled');
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

  it.only('should navigate back to the animal list when clicking Back', () => {
    cy.contains('button', 'Back').click();

    cy.location('pathname').should('equal', '/animal');
  });

  it.only('should save the animal with the changed values', () => {
    const birthDate = new Date();
    birthDate.setDate(birthDate.getDate() - 15);
    const purchaseDate = new Date();
    purchaseDate.setDate(purchaseDate.getDate() - 13);

    cy.findFormField('Number', 'input').clear().type('12');
    cy.findFormField('Batch Number', 'input').clear().type('12');
    cy.findFormField('Purchase Price', 'input').clear().type('300');
    cy.findFormField('Arrival Weight', 'input').clear().type('240');
    cy.contains('button', 'Save').click();

    cy.location('pathname').should('equal', '/animal');

    cy.contains('a', 'Brahman').click();

    cy.findFormField('Number', 'input').should('have.value', '12');
    cy.findFormField('Batch Number', 'input').should('have.value', '12');
    cy.findFormField('Purchase Price', 'input').should('have.value', '300');
    cy.findFormField('Arrival Weight', 'input').should('have.value', '240');

    // Reset for other integration tests
    cy.findFormField('Number', 'input').clear().type('1');
    cy.findFormField('Batch Number', 'input').clear().type('1');
    cy.findFormField('Purchase Price', 'input').clear().type('200');
    cy.findFormField('Arrival Weight', 'input').clear().type('120');
    cy.contains('button', 'Save').click();
  });
});
