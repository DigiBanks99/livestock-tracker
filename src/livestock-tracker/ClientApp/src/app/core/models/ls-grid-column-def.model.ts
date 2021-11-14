import { LsGridColumnType } from '@shared/components/ls-grid/ls-grid-column-type.enum';

export class LsGridColumnDef {
  field: string | null = null;
  description = '';
  pipe?: (...args: any) => string;
  sortable?: boolean;
  width?: number | null;
  type?: LsGridColumnType;
  delete?: (item: any, key?: any) => void;
  title?: string | null;

  private _widthUnits: 'px' | 'rem' | 'em' | '%' = 'px';

  public get widthUnits(): 'px' | 'rem' | 'em' | '%' {
    return this._widthUnits;
  }
  public set widthUnits(value: 'px' | 'rem' | 'em' | '%') {
    this._widthUnits = value;
  }

  constructor() {
    this.pipe = (v) => v;
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
