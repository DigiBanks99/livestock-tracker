describe('Medical Transaction List', () => {
  beforeEach(() => {
    cy.visit('medicine/1');
  });

  it.only(`should list the animal's medical transactions`, () => {
    cy.get('.medical-transaction-list').should('be.visible');
    cy.contains('h1', 'Medical transactions').should('be.visible');
    cy.contains('button', 'add').should('be.visible');

    cy.contains('th', 'Date').should('be.visible');
    cy.contains('th', 'Dose').should('be.visible');
    cy.contains('th', 'Unit').should('be.visible');

    cy.contains('td', 'delete').should('be.visible');
    cy.contains('td mat-icon', 'delete').should('be.visible');
    cy.contains('td mat-icon', 'delete').should('be.visible');
    cy.contains('td mat-icon', 'delete').should('be.visible');

    cy.contains('span', '1 - Brahman');
  });

  it.only('should allow for pagination', () => {
    cy.get('mat-paginator')
      .scrollIntoView()
      .should('be.visible')
      .contains('mat-select', '10');
  });

  it.only('should navigate to the medical transaction capture form when clicking the add button', () => {
    cy.get('.medical-transaction-list').should('be.visible');

    cy.contains('span', '1 - Brahman');
    cy.contains('button', 'add')
      .click()
      .location('pathname')
      .should('match', /medicine\/1\/new/);
  });

  it.only('should navigate to the medical transaction detail view when clicking on an item link', () => {
    cy.get('.medical-transaction-list').should('be.visible');

    cy.contains('span', '1 - Brahman');
    cy.contains('a', 'Antibiotics').click();
    cy.location('pathname').should('match', /medicine\/1\/edit\/\d+/);
  });
});
