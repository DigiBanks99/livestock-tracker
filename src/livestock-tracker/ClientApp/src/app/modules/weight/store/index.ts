import * as actions from './weight.actions';
import * as constants from './weight.constants';
import * as reducers from './weight.reducers';
import * as selectors from './weight.selectors';

export * from './weight.effects';

export const WeightStore = {
  actions: { ...actions.actions },
  constants: { ...constants.Constants },
  initialState: reducers.initialState,
  reducers: { ...reducers },
  selectors: { ...selectors }
};
