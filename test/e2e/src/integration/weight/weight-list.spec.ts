describe('Weight Transaction List', () => {
  beforeEach(() => {
    cy.visit('weight/1');
  });

  it.only(`should list the animal's weight transactions`, () => {
    cy.get('.weight-transaction-list').should('be.visible');
    cy.contains('h1', 'Weight transactions').should('be.visible');
    cy.contains('button', 'add').should('be.visible');

    cy.contains('th', 'Date').should('be.visible');
    cy.contains('th', 'Weight').should('be.visible');
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

  it.only('should navigate to the weight transaction capture form when clicking the add button', () => {
    cy.contains('button', 'add').click();
    cy.location('pathname').should('equal', '/weight/1/new');
  });

  it.only('should navigate to the weight transaction detail view when clicking on an item link', () => {
    cy.contains('a', '13 January 2021, 18:00').click();
    cy.location('pathname').should('equal', '/weight/1/edit/2');
  });
});
