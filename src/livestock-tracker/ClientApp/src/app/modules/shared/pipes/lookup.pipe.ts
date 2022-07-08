import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookup'
})
export class LookupPipe implements PipeTransform {
  public transform(
    value: number,
    dictionary: any[],
    keyPropertyName: string = 'id',
    valuePropertyName: string = 'description'
  ): string {
    const lookupInstance = dictionary.find(
      (lookupItem) => lookupItem[keyPropertyName] === value
    );
    if (lookupInstance == null) {
      return 'Unknown';
    }

    return lookupInstance[valuePropertyName];
  }
}

@NgModule({
  declarations: [LookupPipe],
  exports: [LookupPipe]
})
export class LookupPipeModule {}
