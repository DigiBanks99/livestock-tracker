import { isNullOrUndefined } from 'util';

export class LsGridColumnDef {
  field: string;
  description: string;
  pipe?: Function;
  sortable?: boolean;
  width?: number;
  widthUnits?: string;

  constructor() {
    this.pipe = null;
    this.sortable = true;
    this.width = null;
    this.widthUnits = 'px';
  }

  public getWidth(): string {
    if (this.width == null) {
      return 'auto';
    }

    return this.width + this.widthUnits;
  }
}
