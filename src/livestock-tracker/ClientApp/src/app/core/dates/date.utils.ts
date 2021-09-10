export function getLocaleDateFormat(
  locale: string[],
  joinChar: string = '/',
  includeTime = false
): string {
  // expected style = year: 2010, month: 12, day: 31
  const options: Intl.DateTimeFormatOptions = includeTime
    ? {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    : {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };

  // formatToParts() returns array of object breaking down the locales dateformat
  // [
  //  {type: "month", value: "03"},
  //  {type: "literal", value: "/"},
  //  {type: "day", value: "30"},
  //  {type: "literal", value: "/"},
  //  {type: "year", value: "2021"},
  // ]
  const formatter = new Intl.DateTimeFormat(locale, options).formatToParts();

  return formatter
    .map((part: Intl.DateTimeFormatPart) => {
      switch (part.type) {
        case 'month':
          return 'MM';
        case 'day':
          return 'DD';
        case 'year':
          return 'YYYY';
        case 'hour':
          return 'HH';
        case 'minute':
          return 'mm';
        case 'second':
          return 'ss';
        default:
          return part.value;
      }
    })
    .filter((s) => s !== joinChar)
    .join(joinChar);
}

export function parseLocaleDate(
  dateString: string,
  joinChar: string = '/'
): Date {
  const formatString = getLocaleDateFormat([
    ...(navigator.languages ?? [navigator.language])
  ]);

  const formatParts = formatString.split(joinChar);
  const dateParts = dateString.split(joinChar);

  let day: number;
  let month: number;
  let year: number;
  let hours: number;
  let minutes: number;
  for (let index = 0; index < formatParts.length; index++) {
    const val = Number(dateParts[index]);
    switch (formatParts[index]) {
      case 'DD':
        day = val;
        break;
      case 'MM':
        month = val - 1;
        break;
      case 'YYYY':
        year = val;
        break;
      case 'HH':
        hours = val;
        break;
      case 'hh':
        hours = val % 2 === 0 ? val / 2 : val / 2 + 1;
        break;
      case 'mm':
        minutes = val;
        break;
    }
  }

  return new Date(year, month, day, hours ?? 0, minutes ?? 0);
}
