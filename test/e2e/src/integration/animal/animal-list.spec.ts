beforeEach(() => cy.visit('/animal'));

describe('Animal List', () => {
  it('should list the animals', () => {
    cy.get('app-animal-list').should('be.visible');
    cy.contains('h1', 'Animals').should('be.visible');
    cy.contains('button', 'add').should('be.visible');
  });

  it('should allow for pagination', () => {
    cy.get('mat-paginator')
      .scrollIntoView()
      .should('be.visible')
      .contains('mat-select', '10');
  });

  it('should navigate to the animal form when clicking the add button', () => {
    cy.contains('button', 'add').click();
    cy.location('pathname').should('equal', '/animal/new');
  });

  it('should navigate to the edit view when clicking on an animal link', () => {
    cy.contains('a', 'Brahman').click();
    cy.location('pathname').should('equal', '/animal/1/edit');
  });
});
