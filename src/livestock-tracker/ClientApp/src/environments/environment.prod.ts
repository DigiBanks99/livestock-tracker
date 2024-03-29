export const environment = {
  production: true,
  pageSize: 10,
  defaultLastPage: 0,
  myFormats: {
    short: {
      parse: {
        dateInput: 'P',
        datetimeInput: 'yyyy/MM/dd, HH:mm',
        timeInput: 'H:mm',
        monthInput: 'MMM',
        yearInput: 'yyyy'
      },
      display: {
        dateInput: 'P',
        datetimeInput: 'Pp',
        timeInput: 'p',
        monthInput: 'MMM yyyy',
        yearInput: 'yyyy',
        dateA11yLabel: 'PP',
        monthLabel: 'MMM',
        monthDayLabel: 'MMM d',
        monthDayA11yLabel: 'MMMM d',
        monthYearLabel: 'MMM yyyy',
        monthYearA11yLabel: 'MMMM yyyy',
        timeLabel: 'p'
      }
    },
    medium: {
      parse: {
        dateInput: 'LL',
        datetimeInput: 'yyyy/MM/dd, HH:mm',
        timeInput: 'H:mm',
        monthInput: 'MMM',
        yearInput: 'yyyy'
      },
      display: {
        dateInput: 'dd MMMM yyyy',
        datetimeInput: 'dd MMMM yyyy, HH:mm',
        timeInput: 'p',
        monthInput: 'MMM yyyy',
        yearInput: 'yyyy',
        dateA11yLabel: 'PP',
        monthLabel: 'MMM',
        monthDayLabel: 'MMM d',
        monthDayA11yLabel: 'MMMM d',
        monthYearLabel: 'MMM yyyy',
        monthYearA11yLabel: 'MMMM yyyy',
        timeLabel: 'p'
      }
    }
  }
};
