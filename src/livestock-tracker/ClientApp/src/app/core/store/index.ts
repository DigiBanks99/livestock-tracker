export * from './actions';
export * from './animal';
export * from './app-state.interface';
export * from './crud';
export * from './error-state.interface';
export * from './feed-type-state.interface';
export * from './feeding-transaction-state.interface';
export * from './medical-transaction-state.interface';
export * from './medicine-type-state.interface';
export * from './pagination/pagination-action.interface';
export * from './pagination/pagination-state.interface';
export * from './unit-state.interface';

import * as RouterSelectors from './router.selectors';

export const RouterStore = {
  selectors: { ...RouterSelectors }
};
