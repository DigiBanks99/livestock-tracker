Cypress.Commands.add(
  'findFormField',
  (
    label: string,
    backingElement: string
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .contains('label', label)
      .should('exist')
      .parents('mat-form-field')
      .should('exist')
      .find(backingElement);
  }
);
