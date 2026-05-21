import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookup',
  standalone: true,
})
export class LookupPipe implements PipeTransform {
  transform(id: number | null | undefined, items: { id: number; description: string }[], field: string = 'description'): string {
    if (id == null || !items) return '';
    const item = items.find((i) => i.id === id);
    return item ? (item as any)[field] ?? '' : '';
  }
}
