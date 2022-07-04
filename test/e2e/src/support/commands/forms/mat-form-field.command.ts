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

Cypress.Commands.add(
  'selectOption',
  (label: string, option: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .contains('label', label)
      .parents('mat-form-field')
      .click()
      .get('div.mat-select-panel-wrap')
      .find('div.mat-select-panel')
      .find('mat-option')
      .contains(option)
      .click();
  }
);
