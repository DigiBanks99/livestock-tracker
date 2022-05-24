describe('Medical Transaction List', () => {
  beforeEach(() => {
    cy.visit('medical/1');
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
  });

  it.only('should allow for pagination', () => {
    cy.get('mat-paginator')
      .scrollIntoView()
      .should('be.visible')
      .contains('mat-select', '10');
  });

  it.only('should navigate to the medical transaction capture form when clicking the add button', () => {
    cy.contains('button', 'add').click();
    cy.location('pathname').should('equal', '/medical/1/new');
  });

  it.only('should navigate to the medical transaction detail view when clicking on an item link', () => {
    cy.contains('a', 'Antibiotics').click();
    cy.location('pathname').should('match', /medical\/1\/edit\/[0-9]*/);
  });
});
