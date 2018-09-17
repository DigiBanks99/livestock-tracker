import { LsGridColumnType } from './ls-grid-column-type.enum';
import { isFunction } from 'util';

export class LsGridColumnDef {
  field: string;
  description: string;
  pipe?: Function;
  sortable?: boolean;
  width?: number;
  widthUnits?: string;
  type?: LsGridColumnType;
  delete?: Function;
  title?: string;

  constructor() {
    this.pipe = null;
    this.sortable = true;
    this.width = null;
    this.widthUnits = 'px';
    this.type = LsGridColumnType.DisplayOnly;
    this.title = null;
  }

  public getWidth(): string {
    if (this.width == null) {
      return 'auto';
    }

    return this.width + this.widthUnits;
  }

  public defaultDelete(item: any) {
    if (isFunction(this.delete)) {
      this.delete(item);
    }
  }

  public getTitle(): string {
    switch (this.type) {
      case LsGridColumnType.Delete:
        return this.title ? this.title : 'Delete item';
      case LsGridColumnType.DisplayOnly:
        return '';
      default:
        return this.title ? this.title : '';
    }
  }
}
