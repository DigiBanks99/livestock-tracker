import * as feedTypeActions from './feed-type.actions';
import * as feedTypeEffects from './feed-type.effects';
import * as feedTypeReducer from './feed-type.reducer';
import * as feedTypeStore from './feed-type.store';
import * as feedingTransactionActions from './feeding-transaction.actions';
import * as feedingTransactionEffects from './feeding-transaction.effect';
import * as feedingTransactionReducer from './feeding-transaction.reducer';
import * as feedingTransactionStore from './feeding-transaction.selectors';

export const FeedStore = {
  Feed: {
    actions: { ...feedTypeActions.actions },
    effects: { ...feedTypeEffects },
    reducers: { ...feedTypeReducer },
    selectors: { ...feedTypeStore }
  },
  Transactions: {
    actions: { ...feedingTransactionActions.actions },
    effects: { ...feedingTransactionEffects },
    reducers: { ...feedingTransactionReducer },
    selectors: { ...feedingTransactionStore }
  }
};
