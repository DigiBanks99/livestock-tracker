Cypress.Commands.add(
  'pickDate',
  (label: string, date: Date): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy
      .contains('label', label)
      .parents('mat-form-field')
      .find('input.mat-datepicker-input')
      .type(
        date.toLocaleDateString('en-ZA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })
      )
);
