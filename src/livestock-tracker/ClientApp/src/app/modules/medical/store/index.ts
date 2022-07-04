import * as medicalTransactionActions from './medical-transaction.actions';
import * as medicalTransactionEffects from './medical-transaction.effects';
import * as medicalTransactionReducer from './medical-transaction.reducer';
import * as medicalTransactionStore from './medical-transaction.selectors';
import * as medicineTypeActions from './medicine-type.actions';
import * as medicineTypeEffects from './medicine-type.effects';
import * as medicineTypeReducer from './medicine-type.reducer';
import * as medicineTypeStore from './medicine-type.store';

export const MedicineStore = {
  Medicine: {
    actions: {
      ...medicineTypeActions.actions
    },
    effects: { ...medicineTypeEffects },
    reducers: { ...medicineTypeReducer },
    selectors: { ...medicineTypeStore }
  },
  Transactions: {
    actions: {
      ...medicalTransactionActions.actions
    },
    effects: { ...medicalTransactionEffects },
    reducers: { ...medicalTransactionReducer },
    selectors: { ...medicalTransactionStore }
  }
};
