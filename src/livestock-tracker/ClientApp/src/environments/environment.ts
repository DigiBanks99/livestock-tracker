// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
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
