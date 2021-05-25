import { LsGridColumnType } from '@shared/components/ls-grid/ls-grid-column-type.enum';

export class LsGridColumnDef {
  field: string;
  description: string;
  pipe?: (...args: any) => string;
  sortable?: boolean;
  width?: number;
  widthUnits?: string;
  type?: LsGridColumnType;
  delete?: (item: any, key?: any) => void;
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

  public handleDelete(event: Event, item: any) {
    if (typeof this.delete === 'function') {
      const deleteFunc = this.delete;
      if (deleteFunc.length === 1) {
        this.delete(item);
      } else {
        this.delete(item, event);
      }
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
