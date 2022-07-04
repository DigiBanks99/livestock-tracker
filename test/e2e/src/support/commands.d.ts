declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    /**
     * Finds a mat-form-field backing field.
     *
     * @param label The label for the mat-form-field
     * @param backingElement The backing element type
     */
    findFormField(
      label: string,
      backingElement: string
    ): Chainable<JQuery<HTMLElement>>;
    /**
     * Selects an options in a mat-select form field.
     *
     * @param label The label for the mat-form-field
     * @param option The option to be selected when the select opens
     */
    selectOption(label: string, option: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Picks a date on a form with the given label.
     *
     * @param label The label for the date picker.
     * @param date The value of the date to be selected.
     */
    pickDate(label: string, date: Date): Chainable<JQuery<HTMLElement>>;
  }
}
