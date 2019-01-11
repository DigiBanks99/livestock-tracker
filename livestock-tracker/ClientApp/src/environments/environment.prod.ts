export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000/api/',
  pageSize: 10,
  defaultLastPage: 0,
  myFormats: {
    short: {
      parse: {
        dateInput: 'LL'
      },
      display: {
        dateInput: 'DD MMMM YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
      }
    },
    medium: {
      parse: {
        dateInput: 'LL'
      },
      display: {
        dateInput: 'DD MMMM YYYY HH:mm',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
      }
    }
  }
};
