describe('Feed Transaction List', () => {
  beforeEach(() => cy.visit('/feed/1'));

  it.only(`should list the animal's feeding transactions`, () => {
    cy.get('.feeding-transaction-list').should('be.visible');
    cy.contains('h1', 'Feeding transactions').should('be.visible');
    cy.contains('button', 'add').should('be.visible');

    cy.contains('th', 'Date').should('be.visible');
    cy.contains('th', 'Feed type').should('be.visible');
    cy.contains('th', 'Unit').should('be.visible');

    cy.contains('td', 'delete').should('be.visible');
    cy.contains('td mat-icon', 'delete').should('be.visible');
    cy.contains('td mat-icon', 'delete').should('be.visible');
    cy.contains('td mat-icon', 'delete').should('be.visible');
  });

  it.only('should allow for pagination', () => {
    cy.get('mat-paginator')
      .scrollIntoView()
      .should('be.visible')
      .contains('mat-select', '10');
  });

  it.only('should navigate to the feeding transaction capture form when clicking the add button', () => {
    cy.contains('span', '1 - Brahman');
    cy.contains('button', 'add').click();

    cy.contains('span', '1 - Brahman');
    cy.location('pathname').should('match', /feed\/\d+\/new$/);
  });

  it.only('should navigate to the feeding transaction detail view when clicking on an item link', () => {
    cy.get('.feeding-transaction-list').should('be.visible');

    cy.contains('span', '1 - Brahman');
    cy.contains('a', 'Maize').click();

    cy.contains('span', '1 - Brahman');
    cy.location('pathname').should('match', /feed\/\d+\/edit\/\d+$/);
  });
});
