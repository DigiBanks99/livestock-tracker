export interface OrderOptions<TOptions> {
  direction: 'Ascending' | 'Descending';
  property: TOptions;
}
