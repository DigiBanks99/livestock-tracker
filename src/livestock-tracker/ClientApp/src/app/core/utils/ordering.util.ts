import { Sort } from '@angular/material/sort';

export function getDirection(sortEvent: Sort): 'Ascending' | 'Descending' {
  switch (sortEvent.direction) {
    case 'asc':
      return 'Ascending';
    case 'desc':
      return 'Descending';
    default:
      return 'Ascending';
  }
}
