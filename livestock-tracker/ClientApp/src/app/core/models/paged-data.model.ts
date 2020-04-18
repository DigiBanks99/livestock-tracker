export interface PagedData<TData> {
  data: TData[];
  pageSize: number;
  currentPage: number;
  totalRecordCount: number;
  pageCount: number;
}
